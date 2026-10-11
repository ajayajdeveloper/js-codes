// ⚠️  SPOILERS — Attempt workspace/09-second-largest.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Second Largest Number
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Sort descending, deduplicate, return index 1.
function secondLargestBrute(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique[1] ?? null;
}

// ── BETTER ───────────────────────────── O(n) time  O(n) space
// Use Set to get unique values, then two-pass reduce.
function secondLargestBetter(arr) {
  const unique = [...new Set(arr)];
  if (unique.length < 2) return null;
  const first = Math.max(...unique);
  return Math.max(...unique.filter(x => x !== first));
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Single pass with two tracked variables.
// Two update rules:
//   1. If n > first  → second = first, first = n
//   2. Else if n > second AND n !== first → second = n
function secondLargest(arr) {
  let first  = -Infinity;
  let second = -Infinity;
  for (const n of arr) {
    if (n > first) {
      second = first;
      first  = n;
    } else if (n > second && n !== first) {
      second = n;
    }
  }
  return second === -Infinity ? null : second;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The n !== first guard handles duplicates of the maximum
// (e.g. [5, 5, 3] — 3 should be the second largest, not 5).
// Initialising both to -Infinity works for any numeric input
// including all-negative arrays.
