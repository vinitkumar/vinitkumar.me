---
title: "Thirteen Years of json2xml"
date: "2026-10-14"
description: "From a small Python converter to millions of downloads and code in Google Cloud, AWS, and NASA projects: thirteen years of maintaining json2xml."
featured: true
tags: ["json2xml", "python", "rust", "open-source", "performance", "testing"]
---

On July 6, 2013, I published [json2xml 0.1 on PyPI](https://pypi.org/project/json2xml/0.1/). Its job was straightforward: take JSON and turn it into XML.

Thirteen years later, that is still its job. The interesting part is what has accumulated around it: compatibility decisions, regression tests, profiling sessions, a native Rust extension, millions of downloads, and code that appears in public projects maintained by Google Cloud, AWS, and NASA.

A small library can travel a long way through an import statement.

![The json2xml project's artwork](https://raw.githubusercontent.com/vinitkumar/vinitkumar.me/b2c90770298f5ad82feb016e75dc8da62336f4a6/content/assets/json2xml-hero.png)

With [version 8.0.0 released on October 12](https://pypi.org/project/json2xml/8.0.0/), this feels like a useful moment to look at the whole project: where it began, how the engineering changed, and what the public evidence says about who uses it.

## Millions of downloads, one small job

A historical [Pepy snapshot](https://pepy.tech/projects/json2xml) records **7,493,413 cumulative PyPI downloads**. That snapshot predates this article, so it establishes that the project had already passed 7.49 million downloads; it is not an exact lifetime count as of October 14, 2026.

For a fresh view of activity, the [PyPI Stats API](https://pypistats.org/api/packages/json2xml/recent), retrieved on October 14, 2026, reported:

| Reporting window | Downloads |
| --- | ---: |
| Last day | 6,268 |
| Last 7 days | 37,973 |
| Last 30 days | 186,448 |

These are rolling windows from a service that updates daily. The recent counts exclude known mirrors, as described in the [PyPI Stats documentation](https://pypistats.org/api/).

Downloads are not unique users. CI jobs, fresh environments, repeated installations, and dependency resolution all contribute to the count. They also cannot tell us which companies use the library. For that, the more useful evidence is published code.

Still, seeing a narrowly focused utility downloaded millions of times gives the maintenance work a different scale. A small improvement can be useful far beyond the repository where it was made.

## A small job with a long tail

The first release listed support for Python 2.6 and 2.7, as well as Python 3.1 and 3.2. That alone gives some perspective on how much the surrounding ecosystem has changed.

The basic problem has held up. An application produces JSON; another system expects XML. Somewhere between them, someone needs to decide what to do with arrays, empty values, attributes, type information, invalid element names, and characters that have a special meaning in XML.

Each of those decisions becomes part of the library's behaviour. Someone's integration eventually depends on it.

The [release history](https://github.com/vinitkumar/json2xml/blob/e401fd6ebf5c08ea54f061a86bdfa502aed1d0c8/HISTORY.rst) shows the work changing over time. The 2019 releases reorganized the package and expanded its tests. In 2020, the project removed its Python 2 compatibility dependency. In 2021, the conversion dependency was forked and brought into the project. By 2022, the work included type annotations, a move to pytest, and explicit coverage for increasingly specific XML behaviours.

Those changes made the implementation easier to maintain. They also made it possible to improve the converter without rediscovering its contract every time.

Looking back, the development trend is clear: the project grew from providing a conversion into taking responsibility for the details of that conversion.

## 2026: more ways to run it, fewer reasons to wait

This year opened up a different set of questions. How much time was spent in Python? How much was process startup? How much memory did the output require? Could the same conversion be useful as a standalone executable?

In January, I added the Python CLI and explored [Go and Zig implementations](https://vinitkumar.me/json2xml-multiplatform-day/). The [Rust extension followed](https://vinitkumar.me/json2xml-rust-extension/), using PyO3 to operate on Python objects inside the existing process. In July, I wrote about a separate [C implementation](https://vinitkumar.me/json2xml-c/) for a small library and executable that could run without Python.

These implementations have different purposes. The Rust extension serves Python callers. The standalone tools explore deployment, startup time, and owning more of the conversion pipeline.

For Python users, the accelerated installation remains simple:

```bash
pip install "json2xml[fast]"
```

The package uses Rust when the input and options fit its supported behaviour, and selects the Python serializer when they do not. The fallback is part of the design: installing an accelerator should preserve the meaning of the conversion.

### The Python baseline kept getting faster

One of the more satisfying results of this work is easy to miss if you only look at speedup headlines.

Earlier benchmark snapshots showed very large Rust-to-Python ratios. The [May 27 benchmark](https://github.com/vinitkumar/json2xml/blob/e401fd6ebf5c08ea54f061a86bdfa502aed1d0c8/BENCHMARKS.md#performance-summary) reports a narrower range, approximately **3.7–14.4 times faster**, because the pure Python implementation had improved substantially.

For the 323 KB fixture in that recorded Apple Silicon run, Python took **21.20 ms** and Rust took **1.48 ms**. These are measurements of particular implementations, inputs, and an environment. They are useful precisely because the report records those conditions.

A smaller relative speedup can be good news: the baseline got better.

The later work became more focused. In July, [flamegraphs led to a 31.1% reduction in Python conversion time](https://vinitkumar.me/json2xml-flamegraph-optimization/) on the deterministic 5,000-record benchmark, from 83.0 ms to 57.2 ms. The Rust escape scanner improved separately, from 6.007 ms to 5.632 ms on its paired benchmark.

In August, moving indentation into the serializer removed a second pass over generated XML. The [recorded 1,000-record pretty-printing benchmark](https://github.com/vinitkumar/json2xml/blob/e401fd6ebf5c08ea54f061a86bdfa502aed1d0c8/BENCHMARKS.md#generation-time-pretty-printing-benchmark) fell from **49.40 ms to 23.18 ms**, a 53.1% reduction. The benchmark fixtures produced the same output hashes before and after; the report also documents the empty-element formatting exception outside those fixtures.

The useful question became: what work can the implementation stop doing?

### Memory deserved its own release

Speed was only one part of the problem. A serializer can finish quickly while briefly holding two large copies of its output.

In [json2xml 6.2.0](https://vinitkumar.me/json2xml-62-memory-savings/), the Rust implementation began writing directly into Python's bytes writer. On the recorded 100,000-record workload, the measured peak serializer RSS delta dropped from **157.70 MiB to 80.26 MiB**, about 49.1% lower.

That release also documented a throughput tradeoff: the measured conversion took longer. Keeping both numbers in the report matters. Memory and latency are separate dimensions, and improving one does not automatically improve the other.

## What 100% coverage means here

The Python suite requires **100% statement coverage**. That threshold is enforced through [`--cov-fail-under=100`](https://github.com/vinitkumar/json2xml/blob/e401fd6ebf5c08ea54f061a86bdfa502aed1d0c8/pyproject.toml), so missing coverage fails the test run.

For the 8.0.0 release commit, the [October 12 Linux / Python 3.11 CI job](https://github.com/vinitkumar/json2xml/actions/runs/38211467694/job/114686369205) reported:

| Measure | Recorded result |
| --- | ---: |
| Python statements measured | 1,035 |
| Statements missed | 0 |
| Statement coverage | 100% |
| Tests passed in this job | 509 |
| Tests skipped in this job | 149 |

That is a specific measurement of the Python package in one CI configuration. It does not claim complete branch coverage, complete native Rust coverage, or an absence of bugs. The separate [Rust workflow](https://github.com/vinitkumar/json2xml/blob/e401fd6ebf5c08ea54f061a86bdfa502aed1d0c8/.github/workflows/rust-ci.yml) builds and installs the extension, runs Rust unit tests, and exercises the Python-facing implementation with the native backend available.

The value of the coverage requirement is practical. When a fast path is added, the less common path still needs a test. Numeric subclasses, unusual XML names, empty containers, CLI errors, and backend selection all need to remain deliberate behaviour.

The July optimization work provided a good example. A promising escape scanner performed well on ordinary strings, but review exposed a possible quadratic case when escape characters were dense. The final implementation added a different strategy for that case and regression measurements for adversarial inputs. A representative benchmark alone would not have found it.

Quality also needs more than a coverage percentage. The [Python CI matrix](https://github.com/vinitkumar/json2xml/blob/e401fd6ebf5c08ea54f061a86bdfa502aed1d0c8/.github/workflows/pythonpackage.yml) spans CPython 3.11 through 3.15, PyPy, free-threaded Python, and Linux, Windows, macOS, and ARM runners. Ruff and ty check the Python code; Rust uses formatting checks, Clippy with warnings treated as errors, and native tests. CodeQL adds another layer of analysis.

At the 8.0.0 release commit, the [Python workflow](https://github.com/vinitkumar/json2xml/actions/runs/38211467694), [lint/type-check workflow](https://github.com/vinitkumar/json2xml/actions/runs/38211467619), and [CodeQL run](https://github.com/vinitkumar/json2xml/actions/runs/38211467713) all completed successfully.

These checks make changes easier to assess. They also leave evidence that someone else can inspect.

## The recent releases are about predictable behaviour

The latest releases have put a lot of effort into the boundaries around serialization.

**Version 6.5.1, in August, hardened URL reading.** Connections are pinned to validated DNS addresses, and compressed responses have bounds on both encoded and decoded size. The serializers also reject characters forbidden by XML 1.0. These are concrete protections for a library that can fetch and process external input.

**Version 7.0.0 made the output contract explicit.** Compact UTF-8 bytes became the default; callers wanting pretty text opt in with `pretty=True`. It also tightened byte-for-byte agreement between the Python and Rust implementations for the payloads accepted by the native backend. Inputs the accelerator could not reproduce exactly stayed with Python.

**Version 7.1.1 improved everyday diagnostics.** Invalid JSON errors include the decoder's line and column, and the readers accept a leading UTF-8 byte order mark. These changes are small until you are the person debugging an exported file.

**Version 8.0.0 moves the minimum Python version to 3.11** and requires `json2xml-rs>=1.0.0` for the optional `fast` extra. Python 3.10 users should stay on the 7.x series. The workflows now also test stable Python 3.15.

All of these changes are recorded in the [release notes](https://github.com/vinitkumar/json2xml/blob/e401fd6ebf5c08ea54f061a86bdfa502aed1d0c8/HISTORY.rst). They show where the project is heading: clearer contracts, bounded resource use, better error messages, and performance improvements that preserve the output people depend on.

## Where the library turns up

The most concrete adoption evidence is an import followed by a call in an organisation's own repository. Here are three examples, with links pinned to the revisions inspected for this post.

### Google Cloud: BigQuery results into XML

Google Cloud's Professional Services repository contains a **BigQuery-to-XML tool**. Its [requirements file pins `json2xml==3.14.0`](https://github.com/GoogleCloudPlatform/professional-services/blob/d86f53e2dccb7bef1f4755e43bd92d8fd5d2d060/tools/bigquery-to-xml/requirements.txt#L2).

The [Python implementation](https://github.com/GoogleCloudPlatform/professional-services/blob/d86f53e2dccb7bef1f4755e43bd92d8fd5d2d060/tools/bigquery-to-xml/bigquery_to_xml/bigquery_to_xml.py#L32-L66) imports the package and calls `Json2xml(...).to_xml()` on records from a BigQuery query. The tool supports custom root and row names for the resulting reports.

This is a good example of the original use case surviving intact: structured data comes out of one system, and an integration needs it in another representation.

### AWS: translation workflows and graph retrieval

AWS published [“Translating JSON documents using Amazon Translate”](https://aws.amazon.com/blogs/machine-learning/translating-json-documents-using-amazon-translate/) in February 2021. Its solution converts JSON to XML, translates the text content, and converts the result back to JSON.

The accompanying [AWS sample's Lambda handler](https://github.com/aws-samples/amazon-translate-json-document-translation/blob/34c1087d14a7e6f0aac59794440f83a5f1639fe7/translate_json/s3_event_handler.py#L54) contains the conversion directly:

```python
outputXML = json2xml.Json2xml(jsonDocument, attr_type=False).to_xml()
```

The official article says the approach had been used by a large higher-education customer. It does not name that customer, so there is no name to add to the list.

There is also a newer, separate example. **AWS Labs' GraphRAG Toolkit** [imports json2xml and uses it in its lexical graph query engine](https://github.com/awslabs/graphrag-toolkit/blob/f7e2ff9f87b944a260b4eb209d3d006e8b196ecb/lexical-graph/src/graphrag_toolkit/lexical_graph/lexical_graph_query_engine.py#L440) to serialize JSON results into XML. AWS's **Context Ontology Accelerator** also [lists json2xml 5.2.0 in its third-party software notice](https://github.com/aws/context-ontology-accelerator/blob/052b5a2840ba9ceb47c43e4a933f79d0a9b29308/NOTICE).

The conversion problem has found a place in both document workflows and newer retrieval tooling.

### NASA: XML accountability reports

NASA's public **OPERA SDS BACH API** repository uses json2xml in its data-accountability reporting code.

The module [imports the library and its string reader](https://github.com/nasa/opera-sds-bach-api/blob/5ff5fdd1e553377cd37435ca82df0cdbfd50ddab/accountability_api/api_utils/reporting/data_accountability_report.py#L4-L5), then [calls the converter in its XML report method](https://github.com/nasa/opera-sds-bach-api/blob/5ff5fdd1e553377cd37435ca82df0cdbfd50ddab/accountability_api/api_utils/reporting/data_accountability_report.py#L113-L123).

NASA is a government agency, of course. The evidence establishes use in this published project; it does not establish use across every NASA system or mission. The same scope applies to Google and AWS: these are identifiable public implementations, not claims about their entire internal infrastructure.

That scope is enough. The code is there, and the use is specific.

## The value of staying with a project

Maintaining a library for thirteen years means working on the same small promise while the world around it changes. Python versions come and go. Packaging tools change. New runtimes make different optimizations possible. Users find inputs the original tests never imagined.

The development history of json2xml reflects that: first make the conversion useful, then make its behaviour easier to understand and test, then improve its speed and memory use while keeping those decisions intact.

The public adoption examples give that maintenance a concrete context. A change to an array wrapper or an escaping rule can affect somebody else's report, translation pipeline, or retrieval tool. That is a good reason to keep the contracts clear and the evidence close to the code.

If you need the library, start with the [documentation](https://json2xml.readthedocs.io/) or the [repository](https://github.com/vinitkumar/json2xml). If you find an awkward input, a surprising output, or a missing example, a small reproducible issue is a useful contribution.

There is still plenty to improve. Thirteen years in, the job remains wonderfully specific: take the data someone has, and produce the XML they need.

---

*Sources and repository snapshots checked on October 14, 2026. Benchmark figures come from the dated reports linked in each section; they were not rerun for this retrospective. Coverage figures come from the linked 8.0.0 CI job and measure Python statement coverage. Rolling download figures were retrieved from the PyPI Stats API on October 14, 2026. The cumulative download figure comes from an older Pepy snapshot and is not presented as today's exact total.*