// ⚠️  SPOILERS — Attempt workspace/34-merge-intervals.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Merge Intervals
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(n) space
// Repeatedly scan the list looking for any pair that overlaps
// and merge them, restarting the scan each time something merges.
// Correct, but wastefully re-scans from the top after every merge.
function mergeIntervalsBrute(intervals) {
  if (intervals.length === 0) return [];
  let merged = intervals.map(iv => [...iv]);
  let changed = true;

  while (changed) {
    changed = false;
    outer:
    for (let i = 0; i < merged.length; i++) {
      for (let j = i + 1; j < merged.length; j++) {
        const [aStart, aEnd] = merged[i];
        const [bStart, bEnd] = merged[j];
        if (aStart <= bEnd && bStart <= aEnd) {
          const newInterval = [Math.min(aStart, bStart), Math.max(aEnd, bEnd)];
          merged.splice(j, 1);
          merged.splice(i, 1, newInterval);
          changed = true;
          break outer;
        }
      }
    }
  }

  return merged.sort((a, b) => a[0] - b[0]);
}

// ── OPTIMAL ──────────────────────────── O(n log n) time  O(n) space
// Sort by start time, then do a single linear pass: if the current
// interval overlaps the last one added to `result`, extend its end;
// otherwise push it as a new interval.
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const result = [[...sorted[0]]];

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    const last = result[result.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Sorting by start time turns "any pair might overlap" into
// "only ADJACENT intervals in sorted order can overlap" — that's
// what collapses an O(n²) pairwise comparison into one linear pass.
// Use <= (not <) when comparing start to the previous end, since
// touching intervals like [1,4] and [4,5] should merge.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Repeated pairwise scan: no sort needed, but O(n²) worst case
//   and awkward to reason about (restart-on-merge loop).
// Sort + single pass: O(n log n), the standard and cleanest
//   approach — sorting cost dominates, but the merge itself is O(n).
