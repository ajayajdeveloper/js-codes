// ⚠️  SPOILERS — Attempt A-dsa/02-sort-objects.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Sort Objects By Numeric Field, Then String Field
// ════════════════════════════════════════════════════════════

// ── YOUR APPROACH: MANUAL SWAP-SORT ─────── O(n²) time  O(n) space
// Nested loop: walk the array, compare each object against every
// later object, and swap whenever the pair is out of order. Ties
// on age fall through to a name comparison.
//
// Note: comparing only charCodeAt(0) breaks on names that share a
// first letter ("Ann" vs "Amy") — you need to walk the string until
// characters differ, or just let JS's own < / > do that for you,
// since string comparison in JS already compares char-by-char by
// code point under the hood.
function sortPeopleYourApproach(people) {
  const arr = [...people];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const ageDiff = arr[i].age - arr[j].age;
      const outOfOrder =
        ageDiff > 0 || (ageDiff === 0 && arr[i].name > arr[j].name);
      if (outOfOrder) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

// ── OPTIMAL: NATIVE SORT ─────────────────── O(n log n) time  O(log n)-O(n) space
// Hand the comparison logic to the engine. Return the age
// difference first; only when ages are EQUAL (diff === 0, which is
// falsy) does the `||` fall through to the name comparison.
function sortPeople(people) {
  return [...people].sort((a, b) => {
    return a.age - b.age || a.name.localeCompare(b.name);
  });
}

// ── ALTERNATIVE: SCHWARTZIAN TRANSFORM ──── O(n log n) time  O(n) space
// "Decorate, sort, undecorate": precompute each element's sort key
// once, sort the decorated array, then map back to the original
// objects. Doesn't buy you much here since reading .age/.name is
// free, but the pattern matters when the key is EXPENSIVE to derive
// (a regex match, a DB lookup, a computed hash) — without it, the
// comparator recomputes that key O(n log n) times during the sort
// instead of just n times up front.
function sortPeopleSchwartzian(people) {
  return people
    .map((person) => ({ key: [person.age, person.name], person }))
    .sort((a, b) => a.key[0] - b.key[0] || a.key[1].localeCompare(b.key[1]))
    .map(({ person }) => person);
}

// ── ALTERNATIVE: Intl.Collator (locale-aware, production-grade) ── O(n log n) time
// a.name.localeCompare(b.name) builds a new Intl.Collator internally
// on EVERY call — fine for a few comparisons, wasteful across a
// large sort. Building the collator once and reusing it is faster,
// and it gives you explicit control over case/accent sensitivity
// instead of relying on localeCompare's default.
const nameCollator = new Intl.Collator('en', { sensitivity: 'base' });
function sortPeopleCollator(people) {
  return [...people].sort((a, b) => {
    return a.age - b.age || nameCollator.compare(a.name, b.name);
  });
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// All versions copy the input first ([...people]) so the caller's
// array is never mutated — that's separate from which sorting
// algorithm does the ordering.
// The swap-sort is O(n²) selection-sort-style comparisons; the rest
// are O(n log n) and differ only in HOW the "compare by age, then by
// name" chaining is done — inline comparator, precomputed keys, or a
// reusable collator.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Your approach: easy to trace by hand, good for understanding what
//                a compare function is actually deciding, but O(n²)
//                and easy to get subtly wrong (e.g. first-char-only
//                name comparison).
// Optimal:       one comparator, correct by construction, O(n log n)
//                — the right default for typical code.
// Schwartzian:   same complexity as Optimal, only worth it when the
//                sort key itself is expensive to compute.
// Collator:      best when sorting names/strings A LOT (large
//                arrays, repeated sorts, or you need locale/case
//                rules) — pay the collator setup cost once instead
//                of per comparison.

module.exports = {
  sortPeopleYourApproach,
  sortPeople,
  sortPeopleSchwartzian,
  sortPeopleCollator,
};
