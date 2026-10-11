// ╔══════════════════════════════════════════════════════════╗
//   Problem 34: Merge Intervals         [Medium]  [Array/Intervals]
//   node coach.js problem 34  → guiding questions
//   node coach.js hint 34 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of intervals [start, end], merge all
// overlapping intervals and return an array of the
// non-overlapping intervals that cover all the input ranges.
//
// Input:   [[1,3],[2,6],[8,10],[15,18]]
// Output:  [[1,6],[8,10],[15,18]]
//
// Input:   [[1,4],[4,5]]   → [[1,5]]     (touching counts as overlapping)
// Input:   [[1,4],[2,3]]   → [[1,4]]     (fully contained)

// THINK BEFORE CODING ──────────────────────────────────────
// • Intervals in arbitrary order are hard to merge — what
//   single sort step makes overlaps easy to detect?
// • After sorting by start time, when do two CONSECUTIVE
//   intervals overlap? (Hint: compare current start to the
//   previous merged interval's end.)
// • When they overlap, what do you do to the end of the
//   last interval in your result list?
// • Be careful: [1,4] and [4,5] touch at 4 — should that count
//   as overlapping? (Yes, per the example above.)
// • Don't mutate the original input array — build a new result.

// ── YOUR SOLUTION ──────────────────────────────────────────

function mergeIntervals(intervals) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [[[1, 3], [2, 6], [8, 10], [15, 18]]],
    expected: [[1, 6], [8, 10], [15, 18]],
  },
  {
    args: [[[1, 4], [4, 5]]],
    expected: [[1, 5]],
  },
  {
    args: [[[1, 4], [2, 3]]],
    expected: [[1, 4]],
  },
  {
    args: [[]],
    expected: [],
  },
  {
    args: [[[5, 10]]],
    expected: [[5, 10]],
  },
  {
    args: [[[6, 8], [1, 9], [2, 4], [4, 7]]],
    expected: [[1, 9]],
  },
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
