---
title: "json2xml v6.0.0: 29x Faster with Native Rust Extension"
date: "2026-01-16"
description: "How I supercharged json2xml with a native Rust extension using PyO3, achieving 29x faster performance while maintaining full backward compatibility."
---

I've been maintaining [json2xml](https://github.com/vinitkumar/json2xml) for years now. It's a simple library that converts JSON to XML, and it's been working fine. But "fine" wasn't good enough. I wanted it to be fast.

Today, I'm releasing version 6.0.0 with a native Rust extension that makes the library 29x faster.

## Why Rust?

Python is great for many things, but raw performance isn't one of them. When you're converting large JSON files to XML, every millisecond counts. Rust gives us near-C performance with memory safety guarantees, and PyO3 makes it surprisingly easy to bridge the two worlds.

The decision was straightforward: keep the Python API everyone knows, but replace the performance-critical path with Rust under the hood.

## The Implementation

The heavy lifting happens in a new Rust extension module called `json2xml_rs`. I used PyO3 to create Python bindings that expose a `dicttoxml` function matching the existing Python signature. The Python wrapper (`dicttoxml_fast.py`) handles the graceful fallback, if the Rust extension isn't available, it falls back to the pure Python implementation.

```python
try:
    from json2xml_rs import dicttoxml as _rust_dicttoxml
    HAS_RUST_EXTENSION = True
except ImportError:
    HAS_RUST_EXTENSION = False
```

This means existing users don't need to change anything. Install the new version, and you automatically get the performance boost.

## Handling Edge Cases

One tricky bit was handling very large integers. Rust's `i64` can't hold Python's arbitrary-precision integers. Instead of throwing `OverflowError` and breaking compatibility, the Rust implementation falls back to string representation for numbers outside the `i64` range. It's a sensible trade-off that keeps behavior aligned with the pure Python backend.

## CI/CD Setup

Getting the build pipeline right took some work. I set up two new GitHub Actions workflows:

- **build-rust-wheels.yml**: Builds manylinux, macOS, and Windows wheels via maturin, runs tests across Python versions, and publishes to PyPI using trusted publishing.
- **rust-ci.yml**: Runs rustfmt, clippy, builds the extension across multiple OS/Python combinations, and executes both Rust-specific and existing Python tests.

The benchmark job only runs on pushes to main or manual triggers now, not on every PR. No point slowing down the feedback loop for regular contributions.

## Results

After all this work, the numbers speak for themselves: 29x faster. For anyone processing large JSON files or doing batch conversions, this is a game-changer.

The best part? The library maintains 100% backward compatibility. If you're already using json2xml, just upgrade and enjoy the speed boost. If the Rust extension fails to build on your platform for some reason, you still have the pure Python fallback.

## What I Learned

PyO3 is genuinely impressive. Writing Rust extensions for Python used to be painful, but PyO3 makes it almost pleasant. The maturin build tool handles all the wheel building complexity, and the GitHub Actions integration with trusted publishing means no more manual PyPI uploads.

If you have a Python library with a performance-critical hot path, I'd highly recommend exploring this approach. The initial setup takes some effort, but the payoff is worth it.

Check out the [PR #267](https://github.com/vinitkumar/json2xml/pull/267) for all the details, or just grab the new version from PyPI.

Cheers! 🤘
