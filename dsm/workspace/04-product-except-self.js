// ╔══════════════════════════════════════════════════════════╗
//   Problem 4: Product of Array Except Self         [Medium]  [Array/Prefix-Suffix]
//   node coach.js problem 4  → guiding questions
//   node coach.js hint 4 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array `nums`, return a new array `result` where
// result[i] equals the product of all elements of nums EXCEPT
// nums[i]. You must do this WITHOUT using division, in O(n) time.
//
// Input:   [1, 2, 3, 4]
// Output:  [24, 12, 8, 6]
//   result[0] = 2*3*4 = 24
//   result[1] = 1*3*4 = 12
//   result[2] = 1*2*4 = 8
//   result[3] = 1*2*3 = 6

// THINK BEFORE CODING ──────────────────────────────────────
// • The obvious approach: compute the total product, then divide
//   by nums[i] for each i. Why is division disallowed here? (hint:
//   what happens if nums contains a 0?)
// • result[i] = (product of everything to the LEFT of i) times
//   (product of everything to the RIGHT of i). Can you compute a
//   prefix-products array and a suffix-products array separately?
// • Can you avoid allocating two extra arrays and do it with O(1)
//   extra space (besides the output array)? Try building prefixes
//   into the result array first, then multiplying in suffixes on a
//   second pass with a single running variable.

// ── YOUR SOLUTION ──────────────────────────────────────────

function productExceptSelf(nums) {
  let result = [];
  let prefix = 1;
  let suffix = 1;
   for (let i = 0; i < nums.length; i++){
    result[i] = prefix;
    prefix *= nums[i];
   }
   for (let i =nums.length - 1; i >= 0; i--){
    result[i] *= suffix;
    suffix *= nums[i];  
   }
   return result;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
  { args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
  { args: [[2, 3]], expected: [3, 2] },
  { args: [[5]], expected: [1] },
  { args: [[0, 0]], expected: [0, 0] },
  { args: [[1, 2, 3, 4, 5]], expected: [120, 60, 40, 30, 24] },
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
