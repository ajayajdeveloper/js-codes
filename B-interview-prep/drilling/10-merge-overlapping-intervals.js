// ╔══════════════════════════════════════════════════════════╗
//   10: Merge Overlapping Intervals                    [Medium]
// ╚══════════════════════════════════════════════════════════╝

// NOTE ─────────────────────────────────────────────────────
// Do this one at least TWICE from a blank file, under a timer, with
// no notes. Getting the boundary condition right on the second
// attempt without hesitating is worth more than solving a new problem.

// PROBLEM ──────────────────────────────────────────────────
// Given an array of [start, end] intervals (not necessarily sorted),
// merge all overlapping intervals and return the merged list, sorted
// by start. Touching intervals (one's end equals the next one's
// start) count as overlapping and should be merged.
//
// Input:   mergeIntervals([[1,3],[2,6],[8,10],[15,18]])
// Output:  [[1,6],[8,10],[15,18]]

// ── YOUR SOLUTION ──────────────────────────────────────────
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  console.log('SORTED', sorted);
  const merged = [sorted[0]];
  console.log('MERGED', merged);

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    console.log('start', start);
    console.log('end', end);
    const last = merged[merged.length - 1];
    console.log('LAST', last);
    console.log('LAST-OF-ONE', last[1]);

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }

  return merged;
}
// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
  { args: [[[1, 4], [4, 5]]], expected: [[1, 5]] },        // touching intervals merge
  { args: [[[1, 4], [2, 3]]], expected: [[1, 4]] },        // fully contained interval
  { args: [[]], expected: [] },
  { args: [[[5, 10]]], expected: [[5, 10]] },
  { args: [[[3, 5], [1, 2]]], expected: [[1, 2], [3, 5]] },  // unsorted, no overlap
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = mergeIntervals(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { mergeIntervals, TESTS };
