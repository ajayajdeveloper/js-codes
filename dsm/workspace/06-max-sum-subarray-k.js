// ╔══════════════════════════════════════════════════════════╗
//   Problem 6: Maximum Sum Subarray of Size K         [Easy]  [Array/Sliding Window]
//   node coach.js problem 6  → guiding questions
//   node coach.js hint 6 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of integers `nums` and an integer `k`, find the
// maximum sum of any contiguous subarray of exactly size k.
//
// Input:   nums = [2, 1, 5, 1, 3, 2], k = 3
// Output:  9        (5 + 1 + 3)
//
// Input:   nums = [2, 3, 4, 1, 5], k = 2  → 7  (3 + 4)

// THINK BEFORE CODING ──────────────────────────────────────
// • The brute force recomputes the sum of each window of size k
//   from scratch — what's the wasted work between consecutive
//   windows?
// • A "fixed-size sliding window" keeps a running sum. When the
//   window slides one step right, which single element leaves and
//   which single element enters?
// • windowSum = windowSum - nums[i - k] + nums[i] — when does this
//   update start applying (i.e. once the first window of size k is
//   built)?
// • What should happen if k is larger than nums.length?

// ── YOUR SOLUTION ──────────────────────────────────────────

function maxSumSubarrayK(nums, k) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[2, 1, 5, 1, 3, 2], 3], expected: 9 },
  { args: [[2, 3, 4, 1, 5], 2], expected: 7 },
  { args: [[1, 1, 1, 1], 1], expected: 1 },
  { args: [[5], 1], expected: 5 },
  { args: [[-1, -2, -3, -4], 2], expected: -3 },
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
