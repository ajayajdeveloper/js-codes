// ╔════════════════════════════════════════════════════════════╗
//  06: Insert Interval                                 [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Given a sorted, non-overlapping list of [start, end] intervals and
// a new interval, insert it and merge as needed, keeping the result
// sorted and non-overlapping.
//
// Input:   insertInterval([[1,3],[6,9]], [2,5])
// Output:  [[1,5],[6,9]]

// THINK BEFORE CODING ───────────────────────────────────────
// • Three phases as you scan: intervals entirely BEFORE the new one
//   (no overlap, end < newStart), intervals that OVERLAP it, and
//   intervals entirely AFTER it (start > newEnd). What condition
//   separates each phase?
// • While merging overlapping intervals into the new one, how do
//   you keep expanding its start/end? (Math.min / Math.max)
// • Where does the merged interval get inserted relative to the
//   "before" and "after" groups you already pushed?

// YOUR SOLUTION ─────────────────────────────────────────────

function insertInterval(intervals, newInterval) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: [[[1, 3], [6, 9]], [2, 5]], expected: [[1, 5], [6, 9]] },
  { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], expected: [[1, 2], [3, 10], [12, 16]] },
  { args: [[], [5, 7]], expected: [[5, 7]] },
  { args: [[[1, 5]], [2, 3]], expected: [[1, 5]] },
  { args: [[[1, 5]], [6, 8]], expected: [[1, 5], [6, 8]] },
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

module.exports = { insertInterval };
