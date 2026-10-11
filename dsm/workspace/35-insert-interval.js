// ╔══════════════════════════════════════════════════════════╗
//   Problem 35: Insert Interval         [Medium]  [Array/Intervals]
//   node coach.js problem 35  → guiding questions
//   node coach.js hint 35 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// You're given a list of non-overlapping intervals sorted by
// start time, and a new interval `newInterval`. Insert
// newInterval into the list, merging any overlaps, and return
// the resulting sorted, non-overlapping list.
//
// Input:   intervals = [[1,3],[6,9]], newInterval = [2,5]
// Output:  [[1,5],[6,9]]
//
// Input:   intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]],
//          newInterval = [4,8]
// Output:  [[1,2],[3,10],[12,16]]
//
// Input:   intervals = [], newInterval = [5,7]  → [[5,7]]

// THINK BEFORE CODING ──────────────────────────────────────
// • Since `intervals` is already sorted and non-overlapping,
//   you don't need to re-sort anything — a single linear pass
//   works, split into three phases:
//   1. Add all intervals that end BEFORE newInterval starts.
//   2. Merge all intervals that OVERLAP newInterval into one
//      (expanding newInterval's own start/end as you go).
//   3. Add all remaining intervals that start AFTER newInterval ends.
// • What's the overlap condition between an existing interval
//   and the (possibly still-growing) newInterval?
// • Where does the merged newInterval get inserted relative to
//   phases 1 and 3?

// ── YOUR SOLUTION ──────────────────────────────────────────

function insertInterval(intervals, newInterval) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [[[1, 3], [6, 9]], [2, 5]],
    expected: [[1, 5], [6, 9]],
  },
  {
    args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]],
    expected: [[1, 2], [3, 10], [12, 16]],
  },
  {
    args: [[], [5, 7]],
    expected: [[5, 7]],
  },
  {
    args: [[[1, 5]], [6, 8]],
    expected: [[1, 5], [6, 8]],
  },
  {
    args: [[[1, 5]], [0, 6]],
    expected: [[0, 6]],
  },
  {
    args: [[[3, 5], [12, 15]], [6, 6]],
    expected: [[3, 5], [6, 6], [12, 15]],
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = insertInterval(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { insertInterval, TESTS };
