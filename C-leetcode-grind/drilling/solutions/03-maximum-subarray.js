// ⚠️  SPOILERS — Attempt C-leetcode-grind/drilling/03-maximum-subarray.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Maximum Subarray (Kadane)
// ══════════════════════════════════════════════════════════════

// O(n) time  O(1) space
function maxSubArray(nums) {
  let best = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

const TESTS = [
  { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
  { args: [[1]], expected: 1 },
  { args: [[5, 4, -1, 7, 8]], expected: 23 },
  { args: [[-1]], expected: -1 },
  { args: [[-2, -1]], expected: -1 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = maxSubArray(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { maxSubArray, TESTS };
