// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/10-merge-overlapping-intervals.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Merge Overlapping Intervals
// ════════════════════════════════════════════════════════════

// O(n log n) time (sort)  O(n) space
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

module.exports = { mergeIntervals };
