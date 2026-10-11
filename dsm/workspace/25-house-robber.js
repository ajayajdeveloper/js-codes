// ╔══════════════════════════════════════════════════════════╗
//   Problem 25: House Robber         [Medium]  [DP]
//   node coach.js problem 25  → guiding questions
//   node coach.js hint 25 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// You are a robber planning to rob houses along a street, each
// with some amount of money. Adjacent houses have connected
// security systems — if you rob two adjacent houses on the same
// night, the alarm goes off. Return the maximum amount of money
// you can rob without robbing two adjacent houses.
//
// Input:   [1, 2, 3, 1]
// Output:  4     (rob house 0 and house 2: 1 + 3 = 4)
//
// Input:   [2, 7, 9, 3, 1]
// Output:  12    (rob houses 0, 2, 4: 2 + 9 + 1 = 12)

// THINK BEFORE CODING ──────────────────────────────────────
// • At each house, you make a binary choice: skip it, or rob it
//   (and then you MUST skip the previous one). What's the
//   recurrence relating dp[i] to dp[i-1] and dp[i-2]?
// • dp[i] = max(dp[i-1], dp[i-2] + nums[i]) — can you explain in
//   words why each term makes sense?
// • Do you need to store the WHOLE dp array, or just the last
//   two values as you scan left to right?
// • What should the answer be for an empty array? A single house?

// ── YOUR SOLUTION ──────────────────────────────────────────

function rob(nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 1]], expected: 4 },
  { args: [[2, 7, 9, 3, 1]], expected: 12 },
  { args: [[]], expected: 0 },
  { args: [[5]], expected: 5 },
  { args: [[2, 1, 1, 2]], expected: 4 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = rob(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { rob, TESTS };
