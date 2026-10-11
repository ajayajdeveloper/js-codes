// ╔══════════════════════════════════════════════════════════╗
//   Problem 7: Minimum Size Subarray Sum         [Medium]  [Array/Sliding Window]
//   node coach.js problem 7  → guiding questions
//   node coach.js hint 7 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of POSITIVE integers `nums` and an integer
// `target`, return the length of the shortest contiguous subarray
// whose sum is >= target. Return 0 if no such subarray exists.
//
// Input:   target = 7, nums = [2, 3, 1, 2, 4, 3]
// Output:  2        ([4, 3] sums to 7)
//
// Input:   target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]  → 0
// Input:   target = 4, nums = [1, 4, 4]  → 1

// THINK BEFORE CODING ──────────────────────────────────────
// • Unlike Problem 6, the window size here is variable — you're
//   looking for the SHORTEST window, not a fixed-size one.
// • Grow the window (move right, add to running sum) until the
//   sum meets the target. Then what should you do to try to
//   shrink it while it STILL meets the target?
// • Track the minimum window length seen so far each time the sum
//   qualifies.
// • Because all numbers are positive, growing the window only
//   increases the sum, and shrinking only decreases it — why does
//   that guarantee correctness of the two-pointer approach?

// ── YOUR SOLUTION ──────────────────────────────────────────

function minSubArrayLen(target, nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [7, [2, 3, 1, 2, 4, 3]], expected: 2 },
  { args: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0 },
  { args: [4, [1, 4, 4]], expected: 1 },
  { args: [7, []], expected: 0 },
  { args: [15, [1, 2, 3, 4, 5]], expected: 5 },
  { args: [100, [1, 2, 3]], expected: 0 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = minSubArrayLen(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { minSubArrayLen, TESTS };
