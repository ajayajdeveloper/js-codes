// ⚠️  SPOILERS — Attempt A-dsa/09-sort-entries-by-value.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Object Entries → Sort By Value → Back To Object
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: ENTRIES + SORT + FROMENTRIES ─────── O(n log n) time  O(n) space
// Object.entries turns { apples: 3, ... } into [['apples', 3], ...].
// Sort those pairs by the SECOND element (the value), descending —
// `b[1] - a[1]` puts bigger values first. Object.fromEntries then
// rebuilds an object from the pairs, and since JS objects preserve
// insertion order for string keys, the sorted order of the pairs
// becomes the key order of the result.
function sortObjectByValueDesc(obj) {
  const entries = Object.entries(obj);
  entries.sort((a, b) => b[1] - a[1]);
  return Object.fromEntries(entries);
}

// ── ALTERNATIVE: SORT + REDUCE ─────────────────── O(n log n) time  O(n) space
// Same sort, but build the result object by hand with reduce instead
// of Object.fromEntries — useful to know if you need to transform
// the value on the way in, not just reorder keys.
function sortObjectByValueDescReduce(obj) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Objects don't have a native "sort" — arrays do. The whole trick is
// a round trip: object → array of pairs (sortable) → sort → object
// again. Object.fromEntries and reduce are just two different ways
// to do that last conversion.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Object.fromEntries: shortest, clearest intent — the default choice
//                       when you're just reordering, not transforming.
// Reduce:               more verbose, but gives you a hook to change
//                       keys/values on the way back into object form.

module.exports = {
  sortObjectByValueDesc,
  sortObjectByValueDescReduce,
};
