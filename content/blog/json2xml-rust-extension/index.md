---
title: "json2xml v6.0.1: 29x Faster with Native Rust Extension"
date: "2026-01-16"
description: "How I supercharged json2xml with a native Rust extension using PyO3, achieving 29x faster performance while maintaining full backward compatibility."
---

![json2xml](../../assets/json2xml-hero.png)

I've been maintaining [json2xml](https://github.com/vinitkumar/json2xml) for years now. It's a simple library that converts JSON to XML, and it's been working fine. But "fine" wasn't good enough. I wanted it to be fast.

Today, I'm releasing version 6.0.1 with a native Rust extension that makes the library 29x faster.

## Why Rust?

Python is great for many things, but raw performance isn't one of them. When you're converting large JSON files to XML, every millisecond counts. The pure Python implementation had several performance bottlenecks:

- **String escaping**: Multiple `.replace()` calls for XML special characters (`&`, `<`, `>`, `"`, `'`)
- **Type dispatch**: Chains of `isinstance()` checks to determine how to serialize each value
- **String building**: Repeated f-string concatenation creating intermediate string objects

Rust eliminates all of these. Single-pass string escaping, compiled match statements for type dispatch, and pre-allocated buffers for string building. Combined with memory safety guarantees, it was the obvious choice.

## The Rust Extension Architecture

The Rust code lives in `rust/src/lib.rs` and exposes these core functions via PyO3:

- `escape_xml()` - Single-pass XML character escaping
- `wrap_cdata()` - CDATA section wrapping
- `convert_dict()` - Recursive dictionary to XML conversion
- `convert_list()` - List to XML conversion with configurable item wrapping
- `dicttoxml()` - Main entry point exposed to Python

The Python signature is preserved exactly:

```python
def dicttoxml(
    obj: Any,
    root: bool = True,
    custom_root: str = "root",
    attr_type: bool = True,
    item_wrap: bool = True,
    cdata: bool = False,
    list_headers: bool = False,
) -> bytes
```

## Automatic Backend Selection

The magic happens in `dicttoxml_fast.py`, a new hybrid module that automatically selects the fastest available backend:

```python
try:
    from json2xml_rs import dicttoxml as _rust_dicttoxml
    _USE_RUST = True
    LOG.debug("Using Rust backend for dicttoxml")
except ImportError:
    LOG.debug("Rust backend not available, using pure Python")
    _USE_RUST = False
```

The module also detects features that require Python fallback:

```python
needs_python = (
    ids is not None
    or item_func is not None
    or xml_namespaces
    or xpath_format
)

if not needs_python and isinstance(obj, dict):
    needs_python = _has_special_keys(obj)  # @attrs, @val, @flat
```

This means if you're using advanced features like custom `item_func` callbacks, XML namespaces, or special dict keys for attribute injection, it transparently falls back to Python. For the common case, you get Rust speed automatically.

## Handling Edge Cases

One tricky bit was handling very large integers. Rust's `i64` can't hold Python's arbitrary-precision integers. Instead of throwing `OverflowError` and breaking compatibility, the Rust implementation falls back to string representation for numbers outside the `i64` range. It's a sensible trade-off that keeps behavior aligned with the pure Python backend.

I also added compatibility tests for edge cases like `item_wrap=False` and `list_headers=True` to ensure both backends produce semantically equivalent output.

## CI/CD Setup

Getting the build pipeline right took some work. I set up two new GitHub Actions workflows:

**build-rust-wheels.yml**:
- Builds manylinux, macOS (both Intel and ARM), and Windows wheels via maturin
- Tests across Python 3.9, 3.10, 3.11, 3.12, and 3.13
- Publishes to PyPI using trusted publishing (no API tokens needed)

**rust-ci.yml**:
- Runs `rustfmt` and `clippy` for code quality
- Builds the extension across multiple OS/Python combinations
- Executes both Rust-specific tests and the existing Python test suite

The benchmark job only runs on pushes to main or manual triggers now, not on every PR. No point slowing down the feedback loop for regular contributions.

## Benchmark Results

The benchmark script (`benchmark_rust.py`) tests various data shapes:

```
--- Simple Dict ---
 Python: 45.23µs avg
 Rust:   1.54µs avg
 Speedup: 29.37x

--- Nested Dict ---
 Python: 89.12µs avg
 Rust:   3.21µs avg
 Speedup: 27.76x

--- Large List ---
 Python: 234.56µs avg
 Rust:   8.92µs avg
 Speedup: 26.30x
```

For anyone processing large JSON files or doing batch conversions, this is a game-changer.

## Installation

The library maintains 100% backward compatibility. If you're already using json2xml:

```bash
pip install --upgrade json2xml
```

The Rust extension is bundled in the wheel. If it fails to build on your platform for some reason, you still have the pure Python fallback.

To check which backend you're using:

```python
from json2xml.dicttoxml_fast import get_backend, is_rust_available

print(f"Backend: {get_backend()}")  # 'rust' or 'python'
print(f"Rust available: {is_rust_available()}")
```

## What I Learned

PyO3 is genuinely impressive. Writing Rust extensions for Python used to be painful, but PyO3 makes it almost pleasant. The maturin build tool handles all the wheel building complexity, and the GitHub Actions integration with trusted publishing means no more manual PyPI uploads.

If you have a Python library with a performance-critical hot path, I'd highly recommend exploring this approach. The setup involves:

1. Adding a `rust/` directory with `Cargo.toml` and `pyproject.toml`
2. Writing your Rust code with `#[pyfunction]` and `#[pymodule]` attributes
3. Using maturin for building: `maturin develop --release` for local dev
4. Setting up GitHub Actions with the maturin-action for CI/CD

The initial setup takes some effort, but the payoff is worth it.

Check out [PR #267](https://github.com/vinitkumar/json2xml/pull/267) for all the implementation details, or just grab the new version from PyPI.

Cheers! 🤘
