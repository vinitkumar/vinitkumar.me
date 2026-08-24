#!/usr/bin/env bash
# Compile the LaTeX resume into static/ so Gatsby serves it at /resume.pdf
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/resume/vinit-kumar.tex"
OUT="$ROOT/static"

command -v tectonic >/dev/null || {
  echo "tectonic not found: brew install tectonic" >&2
  exit 1
}

tectonic -X compile "$SRC" --outdir "$OUT"
mv "$OUT/vinit-kumar.pdf" "$OUT/resume.pdf"
echo "built static/resume.pdf"
