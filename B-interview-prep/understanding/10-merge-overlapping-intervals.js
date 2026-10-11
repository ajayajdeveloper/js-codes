// ╔══════════════════════════════════════════════════════════╗
//   10: Merge Overlapping Intervals                    [Medium]
// ╚══════════════════════════════════════════════════════════╝

// NOTE ─────────────────────────────────────────────────────
// This is the problem worth re-doing from a blank file, under a
// timer, at least twice — the boundary condition below is the exact
// spot that's easy to misread under pressure.

// PROBLEM ──────────────────────────────────────────────────
// Given an array of [start, end] intervals (not necessarily sorted),
// merge all overlapping intervals and return the merged list, sorted
// by start. Touching intervals (one's end equals the next one's
// start) count as overlapping and should be merged.
//
// Input:   mergeIntervals([[1,3],[2,6],[8,10],[15,18]])
// Output:  [[1,6],[8,10],[15,18]]

// THINK BEFORE CODING ──────────────────────────────────────
// • Why must you sort the intervals by START time before anything
//   else? What could go wrong if you tried to merge in the original
//   order?
// • After sorting, compare each interval only to the LAST interval
//   already placed in your result — what condition means "these two
//   overlap (or touch) and should merge into one"?
//   (`current.start <= lastMerged.end`, using `<=` not `<`, so
//   touching intervals like [1,4] and [4,5] merge too)
// • When you merge two overlapping intervals, what's the new end?
//   (`Math.max(lastMerged.end, current.end)` — NOT just `current.end`,
//   because a later interval can be fully CONTAINED inside an earlier
//   one with a larger end, e.g. [1,10] then [2,3])
// • What's the misread risk here specifically — `<=` vs `<` at the
//   overlap check, and `Math.max` vs a bare assignment for the new
//   end? Both are easy to get subtly wrong under time pressure.

// ── YOUR SOLUTION ──────────────────────────────────────────

function mergeIntervals(intervals) {
  // your code here
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
