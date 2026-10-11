// ╔════════════════════════════════════════════════════════════╗
//  05: Product of Array Except Self                    [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Return an array output where output[i] is the product of all
// elements of nums except nums[i]. No division allowed. Aim for
// O(n) time.
//
// Input:   productExceptSelf([1, 2, 3, 4])
// Output:  [24, 12, 8, 6]

// YOUR SOLUTION ─────────────────────────────────────────────

function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  // Pass 1: answer[i] ends up holding the product of everything to the LEFT of i.
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Pass 2: multiply in the product of everything to the RIGHT of i.
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return answer;
}

// TESTS ─────────────────────────────────────────────────────

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
