---
title: "My Week in Open Source: Python 3.15, Faster Django CMS, and a Stable Rust Release"
date: "2026-10-16"
description: "A week of Python 3.15 compatibility, django CMS and django-filer performance work, json2xml releases, security maintenance, and reviews."
tags: ["open-source", "python", "django-cms", "performance", "json2xml", "rust"]
---

*October 9–16, 2026*

This week, my open-source work ranged from interpreter compatibility across the django CMS ecosystem to performance improvements, security maintenance, and two major releases in the json2xml project.

There were some satisfying milestones: json2xml 8.0.0, the first stable major release of its Rust accelerator, performance work landing in django CMS, and substantial django-filer improvements moving through review. There was also the less visible work that makes those milestones useful: fixing a test that could silently miss a failure, checking package metadata, reducing repeated database queries, and reviewing other maintainers’ changes.

Here is what shipped, what moved forward, and what is still in progress.

## Python 3.15 across 24 repositories

On October 13, I opened [26 Python 3.15-related pull requests across 24 repositories in the django CMS organisation](https://github.com/search?q=org%3Adjango-cms+author%3Avinitkumar+is%3Apr+created%3A2026-10-13+%223.15%22&type=pullrequests). At the time of writing, 12 have merged and 14 remain open.

The work spans django CMS itself, foundational packages such as django-sekizai and django-classy-tags, and addons covering versioning, moderation, text, frontend components, and more. This is compatibility and CI work across the ecosystem, not a claim that every project has already published a Python 3.15-compatible release.

The most interesting part was what the new test runs uncovered.

In [django CMS #8918](https://github.com/django-cms/django-cms/pull/8918), Python 3.15 exposed a dependency on the removed `SourceFileLoader.load_module()` API. I replaced that loading path with the supported module-spec and execution APIs.

But there was a second problem: the existing template test could catch a loading exception and skip the assertions that were supposed to tell us something had broken. Fixing the loader was only half the job. The test also needed to fail properly.

I added regression coverage for empty paths, unsupported files, and module specifications without a loader. These are small cases, but they make the compatibility claim more meaningful than simply adding another interpreter to a workflow matrix.

I also followed through on packaging metadata, including the [Python 3.15 Trove classifier for django CMS](https://github.com/django-cms/django-cms/pull/8925). Building the source distribution and wheel, checking them, and inspecting their metadata helps ensure that what we advertise matches what we actually distribute.

## Performance work landed in django CMS

[My django CMS performance PR, #8913](https://github.com/django-cms/django-cms/pull/8913), merged on October 9. The implementation began before this reporting window, but landing it was one of this week’s milestones.

The work focused on repeated operations that become expensive as page trees and plugin collections grow: resolving permission restrictions, finding navigation extender roots, traversing trees, removing nodes from lists, and binding plugins.

One example makes the problem tangible. In an instrumented menu-filtering fixture with 800 nodes, the old path copied 320,400 elements. The replacement visited 800 nodes. The improvement came from avoiding repeated work, rather than making each repetition slightly cheaper.

The PR also records controlled, local full-response benchmarks. For a 1,602-page workload with shared-ancestor permission restrictions, response time fell from 2,016 ms to 45 ms, while SQL queries dropped from 1,617 to 18. A mixed-restriction workload went from 514 ms to 76 ms.

Those are measurements from a specific local setup, not a promise that every django CMS site will get the same speedup. The unrestricted-menu control was essentially unchanged. Across the benchmark comparison, complete HTML hashes matched, which matters: faster output is only useful when it remains the right output.

## django-filer: scaling file management without weakening permissions

A substantial part of the week went into [django-filer performance work, #1648](https://github.com/django-cms/django-filer/pull/1648). This is still an open PR, but it is worth discussing alongside the work that has already landed.

File management has several different scaling problems hiding behind an ordinary admin screen. Listing a page of files should not require constructing objects for the entire collection. Previewing a move should not issue thousands of queries. Walking a deep folder tree should not repeatedly resolve the same permission relationships.

The changes tackle those costs at their source: paginate before constructing file objects, batch independent folder and file counts, traverse selected folder trees in bounded batches, find duplicate SHA1 groups through an aggregate subquery, and stream subtree files instead of eagerly loading everything.

The PR records local measurements from a real django CMS project, using disk-backed SQLite, actual media files, and restricted-user checks:

- **10,000-file listing:** 191.50 ms to 37.11 ms, about **5.2× faster**, with SQL queries falling from 18 to 10.
- **400-file move preview:** 412.38 ms to 49.71 ms, about **8.3× faster**, with queries falling from 2,532 to 65.
- **Cold permission checks through 50 folder levels:** 625.81 ms to 56.09 ms, about **11.2× faster**, with queries falling from 4,060 to 89.

These are local HTTP-response measurements, not browser-paint timings or production guarantees. The baseline ran first, the measurements were single-user, and the 100-file listing was about 3.6% slower. The gains are most useful when understood alongside those limits.

The other half of this work is preserving behaviour. Permission precedence, file ordering, storage cleanup, and deletion logs all need to remain correct. Empty permission results are deliberately recomputed so that a newly granted permission becomes visible. Caching every answer would be simpler, but it would miss that requirement.

[Follow-up #1652](https://github.com/django-cms/django-filer/pull/1652) adds per-level loading for tree, search, and action paths, and fixes missing folder-deletion logs and empty thumbnail-picker labels. It merged into the performance feature branch, not master, so it remains part of the broader work under review.

There was progress on the Finder side too. [PR #1649](https://github.com/django-cms/django-filer/pull/1649) merged into the `finder` branch, bounding serialization to the requested page and batching child counts and permission-related work. In its local benchmark, reconciling 1,600 unchanged access-control entries dropped from 1,604 SQL queries to four. All 18 workload fingerprints matched, and each of two full-suite configurations reported 809 tests passing.

This work is about making larger collections manageable while retaining the rules that make a file manager trustworthy. The main performance PR is still open, and the branch merges are not a published django-filer release.

## json2xml 8.0.0 and json2xml-rs 1.0.0

On October 12, I published [json2xml 8.0.0](https://github.com/vinitkumar/json2xml/releases/tag/v8.0.0) and [json2xml-rs 1.0.0](https://github.com/vinitkumar/json2xml/releases/tag/rust-v1.0.0), the first stable major release of the optional Rust accelerator.

Both now require Python 3.11 or newer. The Python package’s optional `fast` extra uses json2xml-rs 1.0.0 or newer, and the compatibility work aligns CI, wheel builds, documentation, and package metadata around that support policy.

The release verification recorded 658 passing Python tests with the accelerator installed, 100% statement coverage, and 47 passing native Rust tests. These are the tested suites, not hundreds of new tests written this week.

The milestone is also deliberately conservative about behaviour: Python conversion APIs and output remain unchanged from 7.1.1, and the Rust serializer retains its behaviour from 0.6.0. A stable release does not need to invent a new output format to be worthwhile.

Some of the release work happened below the application layer. An ARM64 wheel build failed after a floating Rust toolchain changed and introduced a linker warning into a warnings-denied build. [Pinning the compiler inside the Linux wheel containers](https://github.com/vinitkumar/json2xml/commit/cfdaacced862fef54b61075e1d3c97f57fd90684) made that build input explicit again.

## Security maintenance after the release

The next piece was [raising json2xml’s urllib3 dependency floor to 2.8.0](https://github.com/vinitkumar/json2xml/pull/456), along with updating the root lockfile. This excludes versions affected by three upstream security advisories.

Updating documentation dependencies alone would not address what the runtime dependency declaration permits. The runtime requirement and locked development environment both needed attention.

I also merged [8.0.1 release preparation](https://github.com/vinitkumar/json2xml/pull/457), including package metadata, a security changelog, compatibility notes, and publication checks. A [final release-check fix and dated release notes](https://github.com/vinitkumar/json2xml/pull/464) have now merged too. At the time of writing, the security fix and release preparation are merged, but publication of 8.0.1 is still pending.

## Reviews, a small experiment, and writing

Not all the work was on changes I authored. I reviewed Fabian Braun’s fixes for [slot-restriction caching](https://github.com/django-cms/django-cms/pull/8915#pullrequestreview-5481828657), [source-site permissions when duplicating content](https://github.com/django-cms/django-cms/pull/8910#pullrequestreview-5504419611), and [language handling in plugin action URLs](https://github.com/django-cms/django-cms/pull/8927#pullrequestreview-5516190437). Those implementations are his; reviewing them was part of my contribution to the week.

Outside the CMS work, I added [remote-agent controls and a static deployment path to my LiveKit Meet fork](https://github.com/vinitkumar/meet/pull/1), with tests around input forwarding, clipboard ordering, and coordinate mapping.

I also wrote [Thirteen Years of json2xml](https://vinitkumar.me/13-years-of-json2xml/), stepping back from the release cycle to document the project’s history and where it has travelled.

## The week in perspective

The week’s visible milestones were releases and merged pull requests. Underneath them was a common thread: making existing software more dependable as its environment changes and its workloads grow.

That meant testing a newer interpreter, removing repeated work, preserving permission behaviour, tightening a dependency floor, and making sure a failing test actually fails.

Some of that work is shipped. Some is merged but not released. Some is still in review. Keeping those distinctions clear is part of maintaining open source too.
