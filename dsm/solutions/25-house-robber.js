// ⚠️  SPOILERS — Attempt workspace/25-house-robber.js first!
// ════════════════════════════════════════════════════════════
//  Solution: House Robber
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(2^n) time  O(n) space
// Recursive exploration of every rob/skip decision at each house.
// Exponential — only tractable for tiny inputs, but makes the
// recurrence explicit before optimizing.
function robBrute(nums) {
  function helper(i) {
    if (i >= nums.length) return 0;
    const skip = helper(i + 1);
    const take = nums[i] + helper(i + 2);
    return Math.max(skip, take);
  }
  return helper(0);
}

// ── BETTER ───────────────────────────── O(n) time  O(n) space
// Bottom-up DP with a full array: dp[i] = max money robbable from
// houses i..end. Removes the exponential re-computation of the
// brute-force recursion.
function robBetter(nums) {
  const n = nums.length;
  if (n === 0) return 0;
  const dp = new Array(n + 1).fill(0);
  dp[n - 1] = nums[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], nums[i] + (dp[i + 2] || 0));
  }
  return dp[0];
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Only the last two dp values are ever needed at once, so collapse
// the array into two rolling variables as we scan left to right.
function rob(nums) {
  let prev = 0;   // best up through i-2
  let curr = 0;   // best up through i-1
  for (const n of nums) {
    const next = Math.max(curr, prev + n);
    prev = curr;
    curr = next;
  }
  return curr;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// At every house you either skip it (carry forward the best so
// far) or rob it (best-so-far from two houses back, plus this
// house). Because the recurrence only ever looks back two steps,
// you never need more than two rolling variables.

// ── TRADE-OFFS ───────────────────────────────────────────────
// The recursive brute force is the clearest statement of the
// problem but recomputes overlapping subproblems exponentially.
// The full dp array fixes that in O(n) space; collapsing to two
// variables keeps the same O(n) time with O(1) space.
