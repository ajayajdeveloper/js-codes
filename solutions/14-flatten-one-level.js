// ⚠️  SPOILERS — Attempt workspace/14-flatten-one-level.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Flatten One Level
// ════════════════════════════════════════════════════════════

// ── BUILT-IN ─────────────────────────── O(n) time  O(n) space
// arr.flat() defaults to depth 1. Most readable.
function flattenOneLevelBuiltIn(arr) {
  return arr.flat();
}

// ── REDUCE + CONCAT ──────────────────── O(n) time  O(n) space
// concat handles both arrays and non-arrays:
//   [].concat([2, 3])  → [2, 3]   (flattens one level)
//   [].concat(1)       → [1]      (non-array passes through)
function flattenOneLevelReduce(arr) {
  return arr.reduce((acc, x) => acc.concat(x), []);
}

// ── SPREAD ───────────────────────────── O(n) time  O(n) space
// [].concat(...arr) spreads arr's elements as concat arguments.
// Equivalent to [].concat(arr[0], arr[1], ...) — concat flattens one level per arg.
function flattenOneLevel(arr) {
  return [].concat(...arr);
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Array.concat() is the underlying mechanic — it flattens exactly
// one level of array nesting per argument.
// flat(1) vs flat(Infinity): always prefer specifying depth.
// flat() = flat(1) — flattens only the immediate children.

// ── RECURSIVE DEEP FLATTEN (bonus) ───────────────────────────
function flatDeep(arr) {
  return arr.reduce((acc, x) =>
    acc.concat(Array.isArray(x) ? flatDeep(x) : x), []);
}
