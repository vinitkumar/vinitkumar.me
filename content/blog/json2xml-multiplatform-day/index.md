---
title: "Building json2xml Across Three Languages in One Day"
date: "2026-01-14"
updated: "2026-01-15"
description: "A productive day porting json2xml to Go and Zig, adding CLI support to the Python version, and benchmarking all three implementations."
tags: ["python", "go", "zig", "json2xml", "open-source", "cli", "benchmarks"]
---

![json2xml across Python, Go, and Zig](../../assets/json2xml-hero.png)

Yesterday was one of those rare days where everything clicks. I spent the day working on my json2xml project across three different language implementations: Python, Go, and Zig. Here's what I accomplished and how I did it.

> **Update (Jan 15, 2026):** Added cross-linking documentation between all three repos, fuzz testing for the Go version, and educational Zig comments for newcomers. All three repos now feature the unified hero image in their READMEs.

## Day 2 Updates (Jan 15)

### json2xml-go Improvements

- **Fuzz testing**: Added fuzz tests for dicttoxml functions to catch edge cases and improve robustness
- **Cross-documentation**: README now links to Python and Zig versions with benchmark comparisons
- **Hero image**: Unified branding across all three repos

### json2xml-zig Improvements

- **Educational comments**: Added comprehensive comments throughout the codebase to help Zig newcomers understand idiomatic patterns
- **Better testing**: Improved test suite with `zig fmt` integration and invalid JSON handling
- **Cross-documentation**: Enhanced Related Projects section with comparison table linking to Python and Go versions

## The Python CLI (json2xml-py)

The original [json2xml](https://github.com/vinitkumar/json2xml) library has been around for years, but it always required importing as a Python module. I finally added a proper CLI interface.

### What I Built

- **cli.py**: A full-featured command-line tool with the same flags as the Go version
- **Console script entry point**: Install with pip and run `json2xml-py` directly
- **Comprehensive tests**: 19 CLI-specific tests bringing total coverage to 210 tests

The CLI supports all the conversion options:

```bash
# Convert a file
json2xml-py data.json

# Convert a JSON string
json2xml-py -s '{"name": "John", "age": 30}'

# Use XPath 3.1 format with pretty printing
json2xml-py -x -p data.json

# Read from stdin
cat data.json | json2xml-py -
```

Flags include `-w/--wrapper`, `-r/--root`, `-p/--pretty`, `-t/--type`, `-i/--item-wrap`, `-x/--xpath`, `-c/--cdata`, `-l/--list-headers`, `-u/--url`, `-s/--string`, and `-o/--output`.

PR [#266](https://github.com/vinitkumar/json2xml/pull/266) added 1,867 lines including benchmark scripts and ReadTheDocs documentation.

## The Go Port (json2xml-go)

I created [json2xml-go](https://github.com/vinitkumar/json2xml-go) as a high-performance alternative for when Python isn't fast enough.

### Features Ported

- Basic JSON to XML conversion
- Custom wrapper/root elements
- Type attributes (`type="str"`, `type="int"`, etc.)
- Item wrapping for lists
- CDATA sections and XML namespaces
- XPath 3.1 json-to-xml format
- Pretty printing
- Custom attributes (`@attrs`) and values (`@val`)
- Read from file, string, or URL

### Production-Ready Touches

I spent time making this production-ready:

1. **CI/CD**: GitHub Actions for build, test, lint across Go 1.22-1.24
2. **Linting**: Passed golangci-lint and staticcheck with zero issues
3. **Man page**: Comprehensive `man json2xml-go` documentation
4. **Makefile**: Easy `make install` and `make uninstall`
5. **Apache 2.0 License**: Matching the Python version

The code follows Go conventions properly, renaming `Json2xml` to `JSON2xml` per Go initialism rules.

## The Zig Implementation (json2xml-zig)

For maximum performance, I created [json2xml-zig](https://github.com/vinitkumar/json2xml-zig). Zig's compile-time evaluation and zero-cost abstractions make it blazingly fast.

### What It Includes

- Full CLI with all conversion options
- XPath 3.1 json-to-xml format support
- Comprehensive test suite (36 unit tests)
- Tests for edge cases: empty objects, numeric keys, unicode, large data handling
- Fixed a memory leak in the XPath format function during testing

## Benchmarks: The Fun Part

I ran comprehensive benchmarks comparing all implementations:

| Implementation     | Relative Speed |
| ------------------ | -------------- |
| CPython 3.14.2     | 1.00x (baseline) |
| CPython 3.15.0a4   | 1.16x faster |
| PyPy 3.10.16       | 1.22x faster |
| Go json2xml-go     | 7.34x faster |
| Zig json2xml-zig   | ~100x faster |

### Key Findings

- **Go is 7-20x faster** than Python implementations
- **CPython 3.15** shows 13-35% improvement over 3.14 (nice to see Python getting faster)
- **PyPy** excels at large inputs but has JIT overhead for small ones
- **Zig** is ridiculously fast, as expected

## AI-Assisted Development

I used Claude Opus 4.5 extensively throughout this work. Having an AI pair programmer helped me move fast across three different languages in a single day. It assisted with:

- Porting the Python logic to idiomatic Go and Zig
- Writing comprehensive test suites for each implementation
- Setting up CI/CD pipelines and linting configurations
- Creating man pages and documentation
- Running and analyzing benchmarks

The key was having clear ideas about what I wanted to build. The AI helped translate those ideas into working code across unfamiliar territories (I don't write Zig daily). It's a force multiplier when you know what you're building.

## Lessons Learned

1. **CLI parity matters**: Having the same flags across implementations makes switching seamless
2. **Testing is portable**: The test patterns I developed in Python translated directly to Go and Zig
3. **Benchmarking reveals truths**: The 7x speedup in Go justified the port for high-throughput use cases
4. **Documentation matters**: Man pages and ReadTheDocs integration make tools discoverable
5. **AI accelerates polyglot work**: Moving between Python, Go, and Zig in one day would have been much harder without AI assistance

## What's Next

- Explore free-threaded Python 3.14t for parallel processing (PR [#256](https://github.com/vinitkumar/json2xml/pull/256) is open with a 1.55x speedup)
- Add streaming support for very large JSON files
- Consider WASM builds for browser usage

It was a satisfying day of building tools that solve real problems across the performance spectrum. Whether you need the flexibility of Python, the balance of Go, or the raw speed of Zig, there's now a json2xml for you.

---

*Check out the repos: [json2xml](https://github.com/vinitkumar/json2xml) | [json2xml-go](https://github.com/vinitkumar/json2xml-go) | [json2xml-zig](https://github.com/vinitkumar/json2xml-zig)*
