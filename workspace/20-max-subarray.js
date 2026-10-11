// ╔══════════════════════════════════════════════════════════╗
//   Problem 20: Max Subarray Sum       [Medium]  [Sliding Window]
//   node coach.js problem 20  → guiding questions
//   node coach.js hint 20 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of integers, find the contiguous subarray
// with the largest sum and return that sum.
//
// Input:   [-2, 1, -3, 4, -1, 2, 1, -5, 4]
// Output:  6   (subarray [4, -1, 2, 1])
//
// Input:   [1]      → 1
// Input:   [-1, -2] → -1   (must pick at least one element)
//
// THINK BEFORE CODING ──────────────────────────────────────
// • Brute force is O(n²) — try every start/end pair.
//   Can you do it in O(n) with a single pass? (Kadane's Algorithm)
// • Key insight: at each position ask "is it better to extend the
//   current subarray, or start fresh from this element?"
//   → currentSum = Math.max(num, currentSum + num)
// • Track a separate maxSum — update it every step.
// • Why does this work even when all numbers are negative?

// ── YOUR SOLUTION ──────────────────────────────────────────

function maxSubarraySum(nums) {
  // your code here
  let maxSum = nums[0];
  let currentSum = nums[0];
  for(let i = 1; i < nums.length; i++){
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],  expected: 6  },
  { args: [[1]],                                expected: 1  },
  { args: [[-1, -2, -3]],                       expected: -1 },
  { args: [[5, 4, -1, 7, 8]],                   expected: 23 },
  { args: [[-2, -1]],                           expected: -1 },
  { args: [[1, 2, 3, 4, 5]],                    expected: 15 },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = maxSubarraySum(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { maxSubarraySum, TESTS };
