// ⚠️  SPOILERS — Attempt workspace/27-longest-increasing-subsequence.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Longest Increasing Subsequence
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(2^n) time  O(n) space
// At each index, either include it in the subsequence (only if
// it's greater than the last included value) or skip it. Explore
// both choices recursively — exponential without memoization.
function lengthOfLISBrute(nums) {
  function helper(idx, prevVal) {
    if (idx === nums.length) return 0;
    const skip = helper(idx + 1, prevVal);
    let take = 0;
    if (prevVal === -Infinity || nums[idx] > prevVal) {
      take = 1 + helper(idx + 1, nums[idx]);
    }
    return Math.max(skip, take);
  }
  return helper(0, -Infinity);
}

// ── BETTER ───────────────────────────── O(n²) time  O(n) space
// Bottom-up DP: dp[i] = length of the longest increasing
// subsequence ENDING exactly at index i. For each i, look back at
// every j < i with nums[j] < nums[i] and extend that subsequence.
// The answer is the max across the whole dp array (the LIS can
// end anywhere).
function lengthOfLISBetter(nums) {
  if (!nums.length) return 0;
  const dp = new Array(nums.length).fill(1);
  let longest = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    longest = Math.max(longest, dp[i]);
  }
  return longest;
}

// ── OPTIMAL ──────────────────────────── O(n log n) time  O(n) space
// Patience-sorting approach: maintain `tails`, where tails[k] is
// the SMALLEST possible tail value for any increasing subsequence
// of length k+1 seen so far. For each new number, binary-search
// for the first tail >= num and overwrite it (this represents
// swapping in a smaller-tailed subsequence of the same length,
// which gives future numbers a better chance to extend it). If
// num is bigger than every tail, it extends the longest
// subsequence found so far, so append it. The final length of
// `tails` is the LIS length (the array itself is NOT a real
// subsequence, but its length always matches).
function lengthOfLIS(nums) {
  const tails = [];
  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }
  return tails.length;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A smaller tail value for a subsequence of the same length is
// STRICTLY better — it gives more future numbers a chance to
// extend it. Binary search finds exactly where a new number
// belongs among the current best tails in O(log n), turning the
// O(n²) DP into O(n log n).

// ── TRADE-OFFS ───────────────────────────────────────────────
// O(n²) DP is easier to explain and directly answers "what's the
// LIS ending at each index" (useful if you need to reconstruct the
// actual subsequence). The O(n log n) tails approach is faster for
// large inputs but the `tails` array is an abstraction — recovering
// the actual subsequence needs extra bookkeeping (parent pointers).
