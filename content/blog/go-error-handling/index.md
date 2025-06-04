---
layout: post
title: "Future of Error Handling in Go Notes"
date: "2025-06-05"
description: "TLDR of error handling in Go"
category: articles
tags: life general
comments: false
featured: true
---

Today, a new [blog](https://go.dev/blog/error-syntax) was published about error handling in Go and their syntactic changes. Here is the quick TLDR:


Go's error handling—mainly the repetitive `if err != nil` pattern—has been a top complaint due to its verbosity. Over the years, the Go team explored several syntactic improvements:

1. **2018: `check/handle`** — Introduced as part of the Go 2 discussion, but considered too complex.
2. **2019: `try` built-in** — Simpler, auto-returning on error, but obscured control flow and was widely rejected.
3. **2024: `?` operator** — Inspired by Rust, cleaner and more intuitive, but still failed to achieve consensus.

Despite intense effort and hundreds of community proposals, none of these changes gained broad support. The Go team has now **decided to stop pursuing syntax changes** for error handling.

### Reasons include:
- Lack of community and internal consensus.
- Risk of splitting the community over idiomatic style.
- Current error handling, while verbose, is explicit and predictable.
- In idiomatic Go, well-structured error handling includes adding context or stack traces, making verbosity less of an issue.

> **Bottom line**: Go will keep its current approach to error handling for the foreseeable future.
