// ╔══════════════════════════════════════════════════════════╗
//   Problem 27: Longest Increasing Subsequence         [Medium]  [DP/Binary Search]
//   node coach.js problem 27  → guiding questions
//   node coach.js hint 27 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of integers, return the length of the longest
// STRICTLY increasing subsequence (elements don't need to be
// contiguous, but must keep their relative order).
//
// Input:   [10, 9, 2, 5, 3, 7, 101, 18]
// Output:  4      (e.g. 2, 3, 7, 101 — or 2, 3, 7, 18)
//
// Input:   [7, 7, 7, 7]   → 1   (no strictly increasing pair)

// THINK BEFORE CODING ──────────────────────────────────────
// • O(n²) DP: dp[i] = length of the longest increasing subsequence
//   ENDING at index i. What's the recurrence in terms of dp[j]
//   for j < i where nums[j] < nums[i]?
// • The answer is the MAX over the whole dp array, not dp[n-1] —
//   why?
// • For the O(n log n) approach: maintain a "tails" array where
//   tails[k] = smallest possible tail value of an increasing
//   subsequence of length k+1. What do you do with a new number —
//   append it, or replace an entry via binary search?
// • Why does replacing an existing tail (rather than the array
//   growing) still keep the LENGTH answer correct even though the
//   tails array no longer represents one single real subsequence?

// ── YOUR SOLUTION ──────────────────────────────────────────

function lengthOfLIS(nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
  { args: [[]], expected: 0 },
  { args: [[7, 7, 7, 7]], expected: 1 },
  { args: [[1, 2, 3, 4, 5]], expected: 5 },
  { args: [[0, 1, 0, 3, 2, 3]], expected: 4 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = lengthOfLIS(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { lengthOfLIS, TESTS };
