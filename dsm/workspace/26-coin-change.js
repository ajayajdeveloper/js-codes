// ╔══════════════════════════════════════════════════════════╗
//   Problem 26: Coin Change         [Medium]  [DP]
//   node coach.js problem 26  → guiding questions
//   node coach.js hint 26 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of coin denominations and a target amount,
// return the FEWEST number of coins needed to make that amount
// (unlimited supply of each coin). Return -1 if it's impossible.
//
// Input:   coins = [1, 2, 5], amount = 11
// Output:  3     (5 + 5 + 1)
//
// Input:   coins = [2], amount = 3
// Output:  -1    (odd amount, only even coin available)

// THINK BEFORE CODING ──────────────────────────────────────
// • This is NOT always solvable greedily (always taking the
//   biggest coin) — can you think of a coin set where greedy
//   fails?
// • Build a dp array where dp[a] = fewest coins to make amount a.
//   What is dp[0]? What's the recurrence for dp[a] in terms of
//   dp[a - coin] for each coin?
// • What "impossible" sentinel value should you initialize dp
//   with, so that Math.min naturally ignores unreachable amounts?
// • How do you convert that sentinel back into -1 at the end?

// ── YOUR SOLUTION ──────────────────────────────────────────

function coinChange(coins, amount) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 5], 11], expected: 3 },
  { args: [[2], 3], expected: -1 },
  { args: [[1], 0], expected: 0 },
  { args: [[1], 2], expected: 2 },
  { args: [[1, 2, 5], 100], expected: 20 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = coinChange(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { coinChange, TESTS };
