// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/15-binary-search.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Binary Search
// ══════════════════════════════════════════════════════════════

// O(log n) time  O(1) space
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const TESTS = [
  { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
  { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
  { args: [[5], 5], expected: 0 },
  { args: [[], 5], expected: -1 },
  { args: [[1, 2, 3, 4, 5], 1], expected: 0 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = search(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { search, TESTS };
