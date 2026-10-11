// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/08-group-by-field.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Group An Array Of Objects By A Field
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: SINGLE-PASS REDUCE ─────────────── O(n) time  O(n) space
// The accumulator starts as an empty object. For each item, look up
// (or lazily create) the array for its key's value, then push the
// item in. One pass, no sorting, no pre-scanning for distinct keys.
function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const groupKey = item[key];
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
    return groups;
  }, {});
}

// ── ALTERNATIVE: Map INSTEAD OF PLAIN OBJECT ────────────────
// Functionally equivalent, but a Map avoids two plain-object quirks:
// key values get stringified as object property keys regardless
// (so numeric keys like `1` and `"1"` collide), and a Map has no
// inherited prototype keys to accidentally collide with (e.g. a
// group key literally named "constructor" or "toString").
function groupByMap(arr, key) {
  const groups = new Map();
  for (const item of arr) {
    const groupKey = item[key];
    if (!groups.has(groupKey)) groups.set(groupKey, []);
    groups.get(groupKey).push(item);
  }
  return groups;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// "Group by" is the same shape as almost every "bucket things by some
// derived value" problem (word frequency, anagram groups, histogram
// buckets) — lazily initialize a bucket the first time you see its
// key, then push into it. It's always a single pass.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Plain object:  simplest to read and to JSON-serialize; fine for
//                string keys with no special names.
// Map:           safer for arbitrary or numeric key values, and for
//                keys that might collide with Object.prototype
//                property names — at the cost of a slightly less
//                familiar API (`.get`/`.set` instead of bracket access).

module.exports = { groupBy, groupByMap };
