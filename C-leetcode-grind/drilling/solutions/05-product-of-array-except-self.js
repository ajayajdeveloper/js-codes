// ⚠️  SPOILERS — Attempt C-leetcode-grind/drilling/05-product-of-array-except-self.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Product of Array Except Self
// ══════════════════════════════════════════════════════════════

// O(n) time  O(1) extra space (output array not counted)
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}

const TESTS = [
  { args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
  { args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
  { args: [[2, 3]], expected: [3, 2] },
  { args: [[5]], expected: [1] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = productExceptSelf(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { productExceptSelf, TESTS };
