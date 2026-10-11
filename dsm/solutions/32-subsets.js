// ⚠️  SPOILERS — Attempt workspace/32-subsets.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Subsets
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(2^n · n) time  O(2^n · n) space
// Bitmask approach: every number from 0 to 2^n - 1 represents one
// subset, where bit i tells you whether nums[i] is included.
function subsetsBrute(nums) {
  const n = nums.length;
  const result = [];
  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(nums[i]);
    }
    result.push(subset);
  }
  return result;
}

// ── BETTER ───────────────────────────── O(2^n · n) time  O(2^n · n) space
// Iterative doubling: start with the empty subset, and for each
// new number, append it to a copy of every subset found so far.
function subsetsBetter(nums) {
  let result = [[]];
  for (const num of nums) {
    const withNum = result.map(subset => [...subset, num]);
    result = result.concat(withNum);
  }
  return result;
}

// ── OPTIMAL ──────────────────────────── O(2^n · n) time  O(n) extra space (excl. output)
// Backtracking: at each index, record the current path as a
// subset, then recurse forward including each remaining number
// exactly once (never looking backward — that's what prevents
// duplicates like [2,1] alongside [1,2]).
function subsets(nums) {
  const result = [];
  const path = [];

  const backtrack = (start) => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  };

  backtrack(0);
  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Unlike Permutations, every node in the recursion tree IS a
// valid answer — you record `path` on entry, not just at the
// leaves. Passing `start` forward (not 0) ensures each element
// is only ever added AFTER the ones before it, avoiding duplicate
// subsets in different orders.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Bitmask:   elegant one-pass, but only works cleanly up to ~20-30
//            elements (bit width limits) and is less intuitive to explain.
// Doubling:  easy to reason about, but creates many intermediate arrays.
// Backtrack: most natural extension of the "choose/explore/unchoose"
//            pattern used across all backtracking problems.
