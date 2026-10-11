// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/06-insert-interval.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Insert Interval
// ══════════════════════════════════════════════════════════════

// O(n) time  O(n) space
function insertInterval(intervals, newInterval) {
  const result = [];
  const n = intervals.length;
  let i = 0;
  let [newStart, newEnd] = newInterval;

  while (i < n && intervals[i][1] < newStart) {
    result.push(intervals[i]);
    i++;
  }

  while (i < n && intervals[i][0] <= newEnd) {
    newStart = Math.min(newStart, intervals[i][0]);
    newEnd = Math.max(newEnd, intervals[i][1]);
    i++;
  }
  result.push([newStart, newEnd]);

  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

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

module.exports = { insertInterval, TESTS };
