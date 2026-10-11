// ╔════════════════════════════════════════════════════════════╗
//  03: Maximum Subarray (Kadane)                       [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Find the contiguous subarray (containing at least one number) with
// the largest sum, and return that sum.
//
// Input:   maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
// Output:  6  (subarray [4, -1, 2, 1])

// THINK BEFORE CODING ───────────────────────────────────────
// • At each index you make a choice: extend the previous subarray,
//   or start fresh at this element. What comparison decides that?
// • Why is `Math.max(num, currentSum + num)` the core recurrence —
//   what does each branch mean in terms of "extend" vs "restart"?
// • Do you need to track the best-seen sum separately from the
//   running current-sum, or can one variable do both jobs?

// YOUR SOLUTION ─────────────────────────────────────────────

function maxSubArray(nums) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
  { args: [[1]], expected: 1 },
  { args: [[5, 4, -1, 7, 8]], expected: 23 },
  { args: [[-1]], expected: -1 },
  { args: [[-2, -1]], expected: -1 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = maxSubArray(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { maxSubArray };
