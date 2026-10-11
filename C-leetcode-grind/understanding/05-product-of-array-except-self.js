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

// THINK BEFORE CODING ───────────────────────────────────────
// • Without division: what if you built a "prefix product" (product
//   of everything to the left) and a "suffix product" (everything
//   to the right) separately, then multiplied them per index?
// • Can you fold the suffix pass into the SAME output array from the
//   prefix pass, using one running variable instead of a second
//   array, to get O(1) extra space (excluding the output array)?
// • What should the prefix product be for index 0, and the suffix
//   product be for the last index?

// YOUR SOLUTION ─────────────────────────────────────────────

function productExceptSelf(nums) {
  // your code here
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

module.exports = { productExceptSelf };
