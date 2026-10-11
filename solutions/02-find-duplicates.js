// ⚠️  SPOILERS — Attempt workspace/02-find-duplicates.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Find Duplicates
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Sort, then check adjacent elements. A duplicate = same as neighbour.
// Use Set for output to avoid reporting the same duplicate twice.
function findDuplicatesBrute(arr) {
  const sorted = [...arr].sort();
  const dupes = new Set();
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1]) dupes.add(sorted[i]);
  }
  return [...dupes];
}

// ── BETTER ───────────────────────────── O(n) time  O(n) space
// Frequency counter. Two passes: count, then collect those with count > 1.
function findDuplicatesBetter(arr) {
  const freq = arr.reduce((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;
    return acc;
  }, {});
  return [...new Set(arr.filter(x => freq[x] > 1))];
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Two Sets. Single pass. Avoids the frequency counter's second scan.
function findDuplicates(arr) {
  const seen = new Set();
  const dupes = new Set();
  for (const x of arr) {
    seen.has(x) ? dupes.add(x) : seen.add(x);
  }
  return [...dupes];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The two-Set approach answers "is this x a duplicate?" in O(1)
// while naturally accumulating unique duplicate values.
// The order of output matches first-duplicate-encounter order.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute:   sorting changes original order; O(n log n)
// Better:  frequency counter is intuitive but requires two passes
// Optimal: single pass, O(n) — best for streams or large data
