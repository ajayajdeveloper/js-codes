// ⚠️  SPOILERS — Attempt C-leetcode-grind/drilling/08-rotate-array.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Rotate Array
// ══════════════════════════════════════════════════════════════

// O(n) time  O(1) space
function rotate(nums, k) {
  const n = nums.length;
  k = k % n;
  const reverse = (arr, start, end) => {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  };
  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
  return nums;
}

const TESTS = [
  { args: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4] },
  { args: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100] },
  { args: [[1, 2], 3], expected: [2, 1] },
  { args: [[1], 5], expected: [1] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = rotate(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { rotate, TESTS };
