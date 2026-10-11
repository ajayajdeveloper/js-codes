// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/16-search-rotated-sorted-array.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Search in Rotated Sorted Array
// ══════════════════════════════════════════════════════════════

// O(log n) time  O(1) space
function searchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

const TESTS = [
  { args: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
  { args: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
  { args: [[1], 0], expected: -1 },
  { args: [[5, 1, 3], 5], expected: 0 },
  { args: [[3, 1], 1], expected: 1 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = searchRotated(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { searchRotated, TESTS };
