---
title: "Finding the Last Bottlenecks in json2xml with Flamegraphs"
date: "2026-07-16"
description: "How I used Python and native Rust flamegraphs, worst-case tests, and staged releases to make json2xml 31% faster and json2xml-rs another 6% faster."
tags:
  [
    "python",
    "rust",
    "json2xml",
    "open-source",
    "performance",
    "flamegraph",
    "ai-agents",
  ]
---

I released [json2xml-rs 0.4.2](https://github.com/vinitkumar/json2xml/releases/tag/rust-v0.4.2) and [json2xml 6.5.0](https://github.com/vinitkumar/json2xml/releases/tag/v6.5.0) after a focused profiling session across both implementations.

The final result:

- Pure Python conversion improved from **83.0 ms to 57.2 ms**, a **31.1% reduction**.
- The Rust accelerator improved from **6.007 ms to 5.632 ms**, a further **6.23% reduction**.
- Both implementations produced identical XML before and after the changes.
- The Python suite reached **100% statement coverage: 421 tests covering all 762 statements**.
- The Rust release shipped first, followed by the Python wrapper that requires it.

This post documents not only the code that survived, but also the prompts, rejected experiments, review feedback, release failures, and verification work that got it over the line.

## How the session started

My first prompt was intentionally outcome-focused:

> I want to push a bit more optimisation. Let's use flamegraph to find the bottleneck and implement fix. Do it from a new branch and use latest python 3.15 beta to do so. Use uv to manage python.

That established four useful constraints before touching code:

1. Profile first.
2. Work on an isolated branch.
3. Use the latest CPython 3.15 beta rather than an older local default.
4. Let uv manage the interpreter and environments so the benchmark setup is reproducible.

All Python measurements in this post used uv-managed CPython 3.15.0b3 and the same deterministic 5,000-record nested payload.

I then asked for the evidence to be part of the change:

> Make a PR after committing code for this and add the before -> after SVG showing the improvements.

That mattered. A benchmark number in a PR description is useful, but a committed flamegraph preserves the call tree that led to the change. Future maintainers can inspect what actually moved instead of trusting a single summary.

## The Python bottleneck: repeated abstract type checks

The Python flamegraph showed that recursive conversion spent a surprising amount of time rediscovering object types. Common JSON-native values repeatedly passed through broad `isinstance` checks and helper calls while the serializer walked thousands of dictionary and list entries.

The retained optimization is deliberately straightforward. The serializer captures `type(obj)` once and sends exact built-ins through specialized branches:

- `bool`
- `str`
- `int`, `float`, and `complex`
- `dict`
- `list` and `tuple`

Subclasses and less common numeric types still reach the broader compatibility fallbacks.

Here are the committed profiles:

| Before                                                                                                                | After                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [![Python before flamegraph](/json2xml-flamegraphs/python315-before.svg)](/json2xml-flamegraphs/python315-before.svg) | [![Python after flamegraph](/json2xml-flamegraphs/python315-after.svg)](/json2xml-flamegraphs/python315-after.svg) |

The measured effect was larger than I expected:

| Pure Python metric  |        Before |         After |      Change |
| ------------------- | ------------: | ------------: | ----------: |
| Conversion time     |       83.0 ms |       57.2 ms | 31.1% lower |
| 20-loop traced time |       8.311 s |       5.782 s | 30.4% lower |
| Function calls      | 48.17 million | 30.13 million | 37.4% fewer |
| `isinstance` calls  | 11.70 million |  2.80 million | 76.1% fewer |

The win did not come from a clever algorithm. It came from avoiding millions of repeated general-purpose decisions on values whose types were already known.

## The important review comment: what about numeric subclasses?

The optimization made dispatch faster, but it also made the order of exact-type and subclass checks more visible. I received this suggestion during review:

> Numeric handling in `_append_convert` is split between exact-type checks and `_is_number`, which complicates the control flow and subclass behavior.

The suggested simplification was to route all numerics through `_is_number`, or at least explain why exact built-ins and subclasses take different routes.

This is where optimization work can easily become an accidental compatibility break. Python's type relationships are wider than strict JSON:

- `bool` is a subclass of `int`.
- `Decimal` and `Fraction` implement numeric protocols without being exact built-in integers or floats.
- Projects can pass custom `Number` implementations.
- String, dictionary, list, and tuple subclasses may carry behavior that exact built-ins do not.

Routing every number through an abstract check would preserve generality but give back part of the measured win. Removing the fallback would be faster but incompatible.

The final design keeps the intentional split:

```text
exact JSON-native built-in -> specialized hot path
subclass or broader number -> compatibility fallback
```

I added explicit tests for `Decimal`, `Fraction`, complex values, a custom `Number`, and subclasses of strings, dictionaries, lists, and tuples. Those tests also uncovered and fixed a pre-existing string-subclass conversion bug.

The review comment did not make the optimization broader. It made the contract sharper.

## Then I asked for the same treatment in Rust

My next prompt was:

> Do the same optimisation with the rust code using flamegraph. Use your elite level rust skills to squeeze the last performance boost and optimisation out of it.

The language was enthusiastic, but the method remained the same: profile the native path independently and do not assume the Python flamegraph explains Rust time.

The symbolized native profile showed the scalar loop that searched output text for XML escape bytes as the largest avoidable cost. For every byte, it checked whether the value was one of:

```text
&  <  >  "  '
```

The replacement uses `memchr`'s word- and SIMD-optimized search to locate the next escape byte, then copies the clean UTF-8 span in bulk.

| Before                                                                                                    | After                                                                                                  |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [![Rust before flamegraph](/json2xml-flamegraphs/rust-before.svg)](/json2xml-flamegraphs/rust-before.svg) | [![Rust after flamegraph](/json2xml-flamegraphs/rust-after.svg)](/json2xml-flamegraphs/rust-after.svg) |

The escape writer's exclusive native sample share fell from **14.31% to 7.97%**, a 44.3% lower share.

## The first Rust fix had a worst-case problem

The first promising scanner looked excellent on normal application data, where escape characters are sparse. But a careful pre-merge review found that restarting several searches after every match could make dense strings quadratic.

That is the kind of bug a happy-path benchmark will not show. A document full of ampersands or quotes is unusual, but a serializer must not turn unusual input into an algorithmic denial of service.

A fully merged monotonic iterator fixed the complexity problem, but it erased much of the speedup on the representative payload. The final implementation is hybrid:

1. Use the low-overhead sparse search for the first four matches.
2. If matches continue, treat the string as dense.
3. Switch to monotonic scanners that never rescan old bytes.

Regression benchmarks at 8, 16, 32, and 64 KiB confirmed near-linear scaling for strings made entirely of ampersands and quotes.

This is the final paired release result, measured over 21 rounds of 50 conversions:

| Rust metric       |          Before |           After |      Change |
| ----------------- | --------------: | --------------: | ----------: |
| Median conversion |        6.007 ms |        5.632 ms | 6.23% lower |
| Mean conversion   |        6.013 ms |        5.643 ms | 6.14% lower |
| Output size       | 4,093,244 bytes | 4,093,244 bytes |   Identical |

I also tried tag-building and dispatch changes that looked plausible in isolation. They regressed the same workload by **6–38%**, so I rejected them. The shipped patch changes only XML escape detection and leaves substitution rules, UTF-8 boundaries, and the streaming writer intact.

The narrow patch was the right patch.

## Could changing the 16 KiB buffer help further?

After seeing the stable Rust result, I asked:

> Is 16KiB can be altered to improve it any further? What is the value that would work best?

The existing Rust serializer uses a bounded 16 KiB streaming buffer. Since the scanner changed the balance between scanning and writing, it was worth measuring that constant again instead of assuming it was still optimal.

I swept **4, 8, 16, 32, 64, and 128 KiB**. Performance plateaued from 16 through 64 KiB. An ABBA-interleaved confirmation, which reduces run-order drift, measured:

| Capacity |   Median |
| -------- | -------: |
| 16 KiB   | 5.974 ms |
| 32 KiB   | 6.024 ms |

The difference is only about 0.8%, but it favored the smaller existing buffer. Larger buffers reserve more memory per active writer without improving throughput.

So 16 KiB is not a universal magic number. It is simply the best measured value for this serializer and workload, and the broad plateau gives no reason to spend more memory.

## Making 100% coverage a release requirement

The final implementation request added a hard quality gate:

> Coverage needs to be 100%. Fix the missing coverage and push.

Optimization makes cold compatibility paths easier to overlook. Requiring full coverage turned those paths into executable specifications rather than comments about intent.

The final Python suite has:

```text
421 passed
762 / 762 statements
100% coverage
```

It covers the new exact-type paths, every subclass fallback discussed above, Rust selection and Python fallback, invalid XML names, `@attrs`/`@val` behavior, CLI cases, and the dense Rust escape-scanner regressions.

The complete PR matrix ran 48 checks across CPython 3.10 through 3.15.0b3, PyPy, free-threaded Python, Linux, macOS, Windows, and ARM, plus Ruff, ty, CodeQL, dependency security, documentation, and distribution validation.

## Rust had to be released first

The release prompt was explicit about dependency order:

> Generate releases of the rust code first and bump its version in python code so that the python code then be released. Before making release, in the release note, show the perf work done.

That ordering matters. `json2xml[fast]` cannot safely require `json2xml-rs>=0.4.2` until 0.4.2 actually exists on PyPI.

The first `rust-v0.4.2` release attempt proved why artifact installation gates are valuable. Linux and Windows artifacts were present, but the macOS build had produced CPython 3.11–3.14 wheels and omitted CPython 3.10, the oldest supported version.

The macOS 3.10 installation job failed with `No matching distribution found`. Publication stopped before PyPI, exactly as it should.

[PR #341](https://github.com/vinitkumar/json2xml/pull/341) fixed the workflow by provisioning Python 3.10 explicitly on macOS instead of relying on what happened to be installed on the runner. A non-publishing run rebuilt and installed the full artifact set before I moved the still-unpublished release tag to the corrected commit.

The successful Rust release published 34 non-yanked files, including macOS arm64 and x86_64 wheels for CPython 3.10.

Only then did [PR #342](https://github.com/vinitkumar/json2xml/pull/342) bump every Python version source to 6.5.0, require `json2xml-rs>=0.4.2` from the `fast` extra, refresh `uv.lock` from the published artifacts, and add the before/after measurements to the release notes.

## A TestPyPI detail worth documenting

The Python release branch exposed another useful distinction: PyPI and TestPyPI have separate credentials and trusted-publisher configuration.

This repository had a live PyPI token, but neither a TestPyPI token nor a matching TestPyPI trusted publisher. Rather than let every release-branch push fail for an external configuration that was not present, I made the validation path deterministic:

- Release-branch pushes always build the wheel and source distribution.
- Twine always checks both artifacts.
- Uploading to TestPyPI is an explicit manual action after its publisher is configured.
- Publishing a GitHub release still triggers the authenticated live PyPI workflow.

This preserves the important quality gate without pretending the two registries share configuration.

## Verifying the release outside CI

The job turning green was not the last step.

After the live PyPI workflow published `json2xml==6.5.0`, I queried the registry metadata directly and confirmed:

- The wheel and source distribution are present and not yanked.
- Package metadata reports version 6.5.0.
- The `fast` extra requires `json2xml-rs>=0.4.2`.

Then I created a clean uv-managed CPython 3.15.0b3 environment and installed:

```bash
uv pip install "json2xml[fast]==6.5.0"
```

The fresh environment resolved:

```text
json2xml==6.5.0
json2xml-rs==0.4.2
backend=rust
```

It reported the correct CLI version and produced correctly escaped XML. That final test proved what users would receive from the public registry, not what happened to exist in the development checkout.

## What I learned from this optimization session

The broad lessons are more useful than the specific branches:

1. **Profile each runtime independently.** Python and Rust had different bottlenecks.
2. **Commit profiling evidence.** Before/after SVGs make performance claims reviewable later.
3. **Optimize exact common cases without deleting compatibility.** Fast paths and fallback semantics can coexist.
4. **Benchmark adversarial density, not only representative data.** Sparse search strategies can hide quadratic behavior.
5. **Measure constants after changing nearby code.** The 16 KiB buffer survived because it won the new experiment, not because it was already there.
6. **Keep rejected experiments rejected.** A sophisticated-looking change that loses 6–38% is not an optimization.
7. **Release dependencies before wrappers.** Package metadata should never point at an artifact that does not exist yet.
8. **Install built artifacts in CI.** The missing macOS CPython 3.10 wheel was caught before users saw it.
9. **Verify from PyPI in a clean environment.** Registry metadata and backend selection are part of the release.
10. **Use coverage to protect the slow paths.** Hot-path specialization is safer when every fallback is exercised.

## Links

- [Optimization PR #340](https://github.com/vinitkumar/json2xml/pull/340)
- [macOS CPython 3.10 wheel fix PR #341](https://github.com/vinitkumar/json2xml/pull/341)
- [Python 6.5.0 release PR #342](https://github.com/vinitkumar/json2xml/pull/342)
- [json2xml-rs 0.4.2 release](https://github.com/vinitkumar/json2xml/releases/tag/rust-v0.4.2)
- [json2xml 6.5.0 release](https://github.com/vinitkumar/json2xml/releases/tag/v6.5.0)
- [json2xml-rs 0.4.2 on PyPI](https://pypi.org/project/json2xml-rs/0.4.2/)
- [json2xml 6.5.0 on PyPI](https://pypi.org/project/json2xml/6.5.0/)

This was exactly the kind of performance work I enjoy: profile the real system, make a narrow change, test the strange inputs, and leave the release machinery better than I found it.
