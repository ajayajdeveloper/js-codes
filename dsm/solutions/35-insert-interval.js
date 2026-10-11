// ⚠️  SPOILERS — Attempt workspace/35-insert-interval.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Insert Interval
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Ignore the fact that the input is already sorted/non-overlapping:
// just append newInterval to the list and reuse a generic
// "merge all overlapping intervals" pass (sort + linear merge).
function insertIntervalBrute(intervals, newInterval) {
  const all = [...intervals, newInterval].sort((a, b) => a[0] - b[0]);
  if (all.length === 0) return [];

  const result = [[...all[0]]];
  for (let i = 1; i < all.length; i++) {
    const [start, end] = all[i];
    const last = result[result.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }
  return result;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Take advantage of the sorted, non-overlapping input with a
// single linear pass split into three phases: intervals fully
// before newInterval, the merged block of overlapping intervals,
// and intervals fully after.
function insertInterval(intervals, newInterval) {
  const result = [];
  let [start, end] = newInterval;
  let i = 0;
  const n = intervals.length;

  // Phase 1: intervals ending strictly before newInterval starts.
  while (i < n && intervals[i][1] < start) {
    result.push(intervals[i]);
    i++;
  }

  // Phase 2: intervals overlapping newInterval — absorb them by
  // expanding [start, end] to cover the union.
  while (i < n && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  result.push([start, end]);

  // Phase 3: whatever's left starts after newInterval ends.
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Because the input is guaranteed sorted and non-overlapping,
// you never need to look backward or re-sort — a single forward
// pass with three clearly bounded phases (before / overlapping /
// after) does the whole job in O(n).

// ── TRADE-OFFS ───────────────────────────────────────────────
// Sort-everything: reuses the Merge Intervals logic directly,
//   simple to write, but pays an unnecessary O(n log n) sort on
//   data that was already sorted.
// Three-phase pass: O(n), respects the problem's guarantees —
//   the intended solution and the one to lead with in an interview.
