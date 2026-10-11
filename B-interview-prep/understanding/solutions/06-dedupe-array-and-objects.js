// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/06-dedupe-array-and-objects.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Remove Duplicates — Array, Then Array Of Objects
// ════════════════════════════════════════════════════════════

// ── PART A: dedupeArray — SET SPREAD ────────── O(n) time  O(n) space
// `Set` only stores unique values, and iterates in insertion order —
// spreading it back into an array gives you first-occurrence order
// for free.
function dedupeArray(arr) {
  return [...new Set(arr)];
}

// ── PART B: dedupeByKey — SEEN-KEYS SET ─────── O(n) time  O(n) space
// Objects aren't deduped by a plain Set the way primitives are — two
// distinct object references with the same `id` are still distinct
// to `Set`. So track the KEY VALUES you've seen instead, and only
// push an item the first time its key value shows up. Walking
// FORWARD and checking `seen` BEFORE adding is what makes the FIRST
// occurrence the one that survives.
function dedupeByKey(arr, key) {
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    if (!seen.has(item[key])) {
      seen.add(item[key]);
      result.push(item);
    }
  }
  return result;
}

// ── ALTERNATIVE: dedupeByKey KEEPING THE LAST OCCURRENCE ──────
// A Map keyed by `item[key]` naturally keeps whichever value was SET
// most recently for a given key — walking forward and always
// overwriting gives you "last occurrence wins" instead.
function dedupeByKeyKeepLast(arr, key) {
  const map = new Map();
  for (const item of arr) map.set(item[key], item);
  return [...map.values()];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// `Set`/`Map` dedupe by VALUE EQUALITY, which only matches what you
// want for primitives. For objects, you almost always want to dedupe
// by some IDENTIFYING FIELD, not by object reference — so the seen
// set has to track that field's values, not the objects themselves.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Seen-set, first-wins:  matches the common expectation ("first
//                        occurrence survives") and is the version
//                        interviewers usually mean by default.
// Map, last-wins:        just as fast, but changes which occurrence
//                        survives — worth explicitly confirming which
//                        one is wanted before choosing this.

module.exports = { dedupeArray, dedupeByKey, dedupeByKeyKeepLast };
