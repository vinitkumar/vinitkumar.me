---
title: "Why I Rewrote json2xml in C—After Making It Fast with Rust"
date: "2026-07-27"
description: "Why I built a dependency-free C23 JSON-to-XML converter, how it compares with json2xml's Rust-accelerated Python pipeline, and the engineering work behind it."
tags: ["c", "rust", "json2xml", "open-source", "performance", "testing"]
---

![json2xml](../../assets/json2xml-hero.png)

The obvious question is: why write json2xml again in C when the Rust version was already fast?

The [Rust extension](/json2xml-rust-extension/) was—and still is—a successful part of the Python `json2xml` package. It made the common conversion path dramatically faster without changing the Python API. For Python users, that is exactly the right design: install the package, keep the familiar interface, and get native performance where it matters.

But I wanted to explore a different product: a small, dependency-free converter that does not require Python at all. Something that can be installed as a single command-line executable, embedded as a C library, or shipped in environments where adding a language runtime is unnecessary overhead.

That distinction matters. `json2xml-c` is not an attempt to prove that C is “better” than Rust. It is an experiment in reducing the whole stack: parse JSON, build the value tree, generate XML, and expose the result through a compact C23 API and a standalone CLI. Once that goal was clear, the rewrite made sense.

## What the benchmark actually compares

The benchmark compares the complete C conversion path with the Rust-accelerated path used by the Python package. That wording is important.

For C, the timed operation takes JSON bytes already in memory, parses them, and serializes the resulting value tree to XML. For the Python/Rust path, it runs `json.loads` and then passes the Python object to the Rust-backed serializer. A third measurement times only that serializer with an already parsed Python object.

Before recording any timings, the harness verifies that both implementations produce byte-for-byte identical XML for each fixture. Each result is the median of 21 samples, with enough repetitions to keep every sample running for at least 50 milliseconds. Fixture generation, file reads, and process startup are outside the timed section.

Here are the results from the recorded Apple Silicon run:

| Input | JSON size | C: parse + serialize | Python/Rust: parse + serialize | Rust-backed serialize only | C speedup over full pipeline |
|---|---:|---:|---:|---:|---:|
| Small | 42 B | 511 ns | 2.76 µs | 1.83 µs | 5.39x |
| Medium | 2,929 B | 29.44 µs | 46.79 µs | 35.32 µs | 1.59x |
| Large | 29,420 B | 295.02 µs | 449.00 µs | 341.51 µs | 1.52x |
| Very large | 295,134 B | 2.94 ms | 4.45 ms | 3.38 ms | 1.51x |

Across these inputs, the complete C pipeline was 1.51x to 5.39x faster than `json.loads` followed by the Rust-backed serializer. It was also 1.15x to 3.58x faster than the serializer-only call through Python, despite the C measurement including JSON parsing.

These are encouraging numbers, but they are not evidence that C is universally faster than Rust. This is not a standalone C-versus-Rust benchmark: the Rust implementation is a PyO3 extension designed to consume Python objects, so crossing the Python boundary is part of the product being measured. The benchmark was also run on one machine, with compact output and four generated fixtures. The right conclusion is narrower: for this workload, the smaller end-to-end C stack is faster than the Rust-backed Python path.

The full environment, harness, and reproduction commands are documented in the [`json2xml-c` benchmark report](https://github.com/vinitkumar/json2xml-c/blob/main/BENCHMARKS.md).

## A native tool, not another Python backend

Removing Python changed more than the implementation language. The C version owns the complete conversion pipeline and deliberately keeps the architecture small:

1. Parse length-bounded JSON bytes into an owned value tree.
2. Render that tree as compact XML.
3. Optionally run a pretty-printing pass over the generated XML.

The parser and renderer handle every JSON value type, UTF-8 and Unicode escapes, XML 1.0 validation, CDATA, configurable wrappers, type attributes, the special `@attrs`/`@val`/`@flat` keys, and W3C XPath 3.1 output. The public library interface is still only a small options structure, a conversion function, an explicit free function, and an error contract.

There is no embedded Python and no third-party JSON parser. The implementation uses standard C, builds with strict warnings enabled, and exposes both a library and the `json2xml-c` command:

```sh
json2xml-c --no-pretty -s '{"name":"Ada","active":true}'
json2xml-c data.json -o data.xml
cat data.json | json2xml-c -
json2xml-c --xpath data.json
```

The dependency-free boundary also creates useful constraints. For example, the C command intentionally does not fetch URLs: HTTPS would add a TLS dependency, and applications already have better ways to retrieve remote data before passing its bytes to the converter.

The first release ships ready-to-run CLI archives for Linux, macOS, and Windows on both x86-64 and ARM64. Linux executables are statically linked, and every archive is published with a SHA-256 checksum. The practical result is simple: download one file, put the executable on `PATH`, and run it without installing Python, Rust, or a package environment.

## Performance is only useful if the code is trustworthy

C gives the implementation very little protection by default, so testing memory ownership and error paths was part of the design rather than a final cleanup task.

The compatibility suite uses literal expected output derived from the Python project's functional tests. It covers the normal conversion modes as well as malformed JSON, invalid XML characters, Unicode edge cases, CDATA splitting, nesting limits, command-line I/O, and option combinations.

Every allocation in the converter also passes through a deterministic failure hook during tests. The suite fails each successive `malloc`, `calloc`, or `realloc` call and verifies that conversion returns the correct out-of-memory status without leaking a partial output. AddressSanitizer and UndefinedBehaviorSanitizer run in CI alongside the normal tests.

At the first release, coverage across the production C sources is:

| Metric | Coverage |
|---|---:|
| Functions | 100% — 67/67 |
| Lines | 100% — 1,320/1,320 |
| Branches | 82.10% — 922/1,123 |

The build fails if production line or function coverage drops below 100%. Branch coverage is reported separately rather than hidden behind the headline number.

The original Python/Rust project has a strong quality story too. The Python package is gated at 100% coverage across a much broader interpreter and operating-system matrix, while the Rust extension runs formatting, Clippy with warnings denied, unit tests, and cross-platform extension builds. That project has years of Python compatibility and packaging work behind it.

So I would not claim that one codebase is simply “higher quality” than the other. Their strengths match their jobs:

| `json2xml-c` | Python + `json2xml-rs` |
|---|---|
| Small native API and complete parser-to-serializer ownership | Stable Python API and automatic native acceleration |
| Deterministic allocation-failure testing | Broad Python version and implementation coverage |
| ASan, UBSan, strict compiler warnings | Rust safety, Clippy, and Python package checks |
| 100% production line and function coverage | 100% Python package coverage |
| Six standalone CLI release targets | Native wheels integrated into the Python ecosystem |

For the C version, the confidence comes from keeping the surface area compact and exercising the failure modes that matter most in a manually managed language. For the Python/Rust version, it comes from compatibility across a much larger runtime and packaging ecosystem.

## The useful lesson

The interesting result is not that one language defeated another. The Rust extension remains the right answer for Python users who want a familiar API with native acceleration. The C implementation is the better fit when the requirement is a standalone executable, a small embeddable library, or a conversion pipeline without a language runtime.

What made `json2xml-c` fast was not a clever micro-optimization. It was choosing a narrower product boundary and owning the complete path from input bytes to output bytes. What makes me comfortable releasing it is the less glamorous work around that path: compatibility tests, explicit ownership, allocation-failure testing, sanitizers, coverage gates, native builds, and reproducible benchmarks.

`json2xml-c` v0.1.0 is available now:

- [Source code and documentation](https://github.com/vinitkumar/json2xml-c)
- [Benchmark methodology and results](https://github.com/vinitkumar/json2xml-c/blob/main/BENCHMARKS.md)
- [Linux, macOS, and Windows downloads](https://github.com/vinitkumar/json2xml-c/releases/tag/v0.1.0)

If you already use Python, keep using the Rust-accelerated `json2xml` package. If you want the same kind of conversion as a native CLI or C library, try `json2xml-c` and let me know where it fits—or where it still falls short.
