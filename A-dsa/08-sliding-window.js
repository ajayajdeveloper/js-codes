// ╔══════════════════════════════════════════════════════════╗
//   08: Sliding Window Of Size K                     [Easy-Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers and an integer k, find the maximum
// sum of any contiguous subarray of exactly size k.
//
// Input:   maxSumSubarrayK([2, 1, 5, 1, 3, 2], 3)
// Output:  9        (5 + 1 + 3)

// THINK BEFORE CODING ──────────────────────────────────────
// • Brute force recomputes the sum of every window of size k from
//   scratch — what work is being repeated between consecutive windows?
// • Fixed-size sliding window: build the sum of the FIRST window,
//   then slide one step at a time. Each slide, exactly one element
//   leaves (the one falling off the left) and one enters (the new
//   one on the right).
// • windowSum = windowSum - nums[i - k] + nums[i] — walk through
//   why this formula is correct.
// • What should happen if k > nums.length?

// ── YOUR SOLUTION ──────────────────────────────────────────

function maxSumSubarrayK(nums, k) {

  let windowSum = 0;

  for(let i = 0; i < k; i++){
    windowSum = windowSum + nums[i]
  } 
    let ans = windowSum;   
    for(let i = k; i < nums.length; i++){
      windowSum = windowSum - nums[i - k] + nums[i];
       ans = Math.max(ans,windowSum)
  }  
  return ans
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[2, 1, 5, 1, 3, 2], 3], expected: 9 },
  { args: [[2, 3, 4, 1, 5], 2], expected: 7 },
  { args: [[1, 1, 1, 1], 1], expected: 1 },
  { args: [[1, 2], 3], expected: null },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = maxSumSubarrayK(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { maxSumSubarrayK, TESTS };
