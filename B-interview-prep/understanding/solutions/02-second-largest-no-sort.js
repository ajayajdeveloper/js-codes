// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/02-second-largest-no-sort.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Largest And Second-Largest, Without Sorting
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: SINGLE-PASS TRACKING ───────────── O(n) time  O(1) space
// Keep two running values as you scan. If the current number beats
// `largest`, the old `largest` slides down into `secondLargest`
// before `largest` is replaced. Otherwise, if it beats `secondLargest`
// (and isn't just a duplicate of `largest`), it becomes the new
// `secondLargest`. The `n !== largest` guard is the trap most people
// miss: without it, [5, 5, 3] would report secondLargest as 5 instead
// of 3, because the second 5 "beats" a secondLargest that started at
// null.
function largestTwo(nums) {
  let largest = null;
  let secondLargest = null;

  for (const n of nums) {
    if (largest === null || n > largest) {
      secondLargest = largest;
      largest = n;
    } else if (n !== largest && (secondLargest === null || n > secondLargest)) {
      secondLargest = n;
    }
  }

  return { largest, secondLargest };
}

// ── ALTERNATIVE: SORT FIRST ─────────────────── O(n log n) time  O(n) space
// Sort descending, dedupe, read off the first two. Correct and much
// easier to write under pressure, but does more work than necessary —
// the problem only needs the top two values, not a full ordering.
function largestTwoBySorting(nums) {
  const distinctSorted = [...new Set(nums)].sort((a, b) => b - a);
  return {
    largest: distinctSorted[0] ?? null,
    secondLargest: distinctSorted[1] ?? null,
  };
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// "Second largest" almost always means second largest DISTINCT
// value in interview phrasing — [5, 5, 3] should answer 3, not 5.
// The single-pass approach only gets this right if duplicates of the
// current max are explicitly excluded from updating secondLargest.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Single-pass:  O(n) time, O(1) space — the answer that demonstrates
//               you understand WHY sorting is unnecessary here.
// Sort-first:   O(n log n) time, extra space for the Set/sorted copy
//               — fine as a fallback if the tracking logic doesn't
//               come to mind fast enough under interview pressure.

module.exports = { largestTwo, largestTwoBySorting };
