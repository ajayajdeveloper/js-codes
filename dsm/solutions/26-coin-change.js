// ⚠️  SPOILERS — Attempt workspace/26-coin-change.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Coin Change
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(coins^amount) time  O(amount) space
// Recursively try every coin at every remaining amount. Massively
// overlapping subproblems (the same "remaining amount" gets
// recomputed via many different coin orderings) — exponential.
function coinChangeBrute(coins, amount) {
  function helper(remaining) {
    if (remaining === 0) return 0;
    if (remaining < 0) return Infinity;
    let best = Infinity;
    for (const coin of coins) {
      const sub = helper(remaining - coin);
      if (sub + 1 < best) best = sub + 1;
    }
    return best;
  }
  const result = helper(amount);
  return result === Infinity ? -1 : result;
}

// ── OPTIMAL ──────────────────────────── O(amount · coins) time  O(amount) space
// Bottom-up DP: dp[a] = fewest coins to make amount a. Build up
// from dp[0] = 0. For each amount, try every coin and take the
// best (1 + dp[a - coin]). Initializing with Infinity lets
// unreachable amounts fall out naturally via Math.min.
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a && dp[a - coin] + 1 < dp[a]) {
        dp[a] = dp[a - coin] + 1;
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The brute-force recursion recomputes helper(remaining) for the
// SAME remaining amount over and over via different coin paths.
// Bottom-up DP computes each amount exactly once, in increasing
// order, so every dp[a - coin] lookup is already finalized.

// ── TRADE-OFFS ───────────────────────────────────────────────
// The recursive version mirrors the problem statement directly
// but is exponential without memoization. Bottom-up DP trades a
// bit of readability for guaranteed O(amount · coins) time and
// O(amount) space — the standard interview-ready answer.
