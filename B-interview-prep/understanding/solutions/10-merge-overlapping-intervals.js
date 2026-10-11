// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/10-merge-overlapping-intervals.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Merge Overlapping Intervals
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: SORT BY START, THEN LINEAR SCAN ──── O(n log n) time  O(n) space
// Sorting by start time first is what makes a single linear pass
// enough — once sorted, an interval can only possibly overlap the
// MOST RECENTLY merged one, never an earlier one it already skipped
// past. For each interval, compare its start against the last merged
// interval's end:
//   • `start <= last.end`  → they overlap (or touch) → merge: extend
//     `last.end` to `Math.max(last.end, end)` — NOT a bare
//     assignment, because the current interval could be fully
//     contained inside the previous one and have a SMALLER end
//     (e.g. [1,10] then [2,3] — the merged end must stay 10).
//   • otherwise               → no overlap → push as a new interval.
// Using `<=` (not `<`) is what makes touching intervals like
// [1,4] and [4,5] merge into [1,5], per this problem's convention.
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = merged[merged.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Two bugs account for almost every wrong answer on this problem:
// (1) comparing `start < last.end` instead of `<=`, which misses
// touching intervals; (2) assigning `last.end = end` instead of
// `Math.max(last.end, end)`, which silently SHRINKS the merged
// interval when a later interval is nested inside an earlier, wider
// one. Both are exactly the kind of mistake a first read-through
// misses and a timed re-attempt catches.

// ── TRADE-OFFS ───────────────────────────────────────────────
// This is really the only reasonable approach — the O(n log n) sort
// is unavoidable unless the input is guaranteed pre-sorted by start,
// in which case the merge step alone is O(n).

module.exports = { mergeIntervals };
