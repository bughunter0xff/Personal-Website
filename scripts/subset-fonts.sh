#!/usr/bin/env bash
# Subsets the Geist fonts from node_modules to the Latin ranges this site uses,
# so each file is roughly half the size. Re-run after upgrading the `geist` package.
#
# Requirements: python3 with fonttools + brotli  (pip install fonttools brotli)
#
# Geist is licensed under the SIL OFL 1.1 with no Reserved Font Name, which
# permits subsetting and redistribution; the license is copied alongside.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=node_modules/geist/dist/fonts
OUT=app/fonts

# Basic Latin, Latin-1 Supplement, Latin Extended-A, general punctuation,
# currency, arrows and the handful of symbols used in the UI (⌘ ↵ · — “ ” ©).
UNICODES="U+0000-00FF,U+0100-017F,U+2000-206F,U+20A0-20CF,U+2190-21FF,U+2318,U+2212,U+2215,U+2022,U+2026"

subset() {
  local in=$1 out=$2
  pyftsubset "$in" \
    --output-file="$out" \
    --flavor=woff2 \
    --unicodes="$UNICODES" \
    --layout-features='*' \
    --no-hinting \
    --desubroutinize
  printf '%-40s %7s bytes\n' "$out" "$(stat -c%s "$out")"
}

subset "$SRC/geist-sans/Geist-Variable.woff2"     "$OUT/Geist-Variable-latin.woff2"
subset "$SRC/geist-mono/GeistMono-Regular.woff2"  "$OUT/GeistMono-Regular-latin.woff2"
cp node_modules/geist/LICENSE.txt "$OUT/LICENSE-Geist.txt"
