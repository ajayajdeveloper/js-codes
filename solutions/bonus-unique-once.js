// ⚠️  SPOILERS — Attempt workspace/bonus-unique-once.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Unique Once (Bonus — no Set)
// ════════════════════════════════════════════════════════════

// ── OPTIMAL (frequency object, no Set) ── O(n) time  O(n) space
// Step 1: build frequency map.
// Step 2: filter original array for elements with count === 1.
// No duplicates in output because if freq[x] === 1, x can only
// appear once in the original array — filter finds it once.
function uniqueOnce(arr) {
  const freq = {};
  for (const x of arr) freq[x] = (freq[x] || 0) + 1;
  return arr.filter(x => freq[x] === 1);
}

// ── WITH REDUCE ──────────────────────── O(n) time  O(n) space
function uniqueOnceReduce(arr) {
  const freq = arr.reduce((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;
    return acc;
  }, {});
  return arr.filter(x => freq[x] === 1);
}

// ── WITH SET (for comparison — the bonus forbids this) ────────
function uniqueOnceWithSet(arr) {
  const once  = new Set();
  const multi = new Set();
  for (const x of arr) {
    if (multi.has(x)) continue;
    if (once.has(x)) { once.delete(x); multi.add(x); }
    else once.add(x);
  }
  return arr.filter(x => once.has(x));
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The frequency object is a drop-in replacement for Set in most
// counting scenarios. The restriction "no Set" forces you to use
// the underlying mechanism Set is built upon: hash maps (objects).
// arr.filter(x => freq[x] === 1) naturally avoids duplicate output
// because the condition itself rejects any element appearing > once.
