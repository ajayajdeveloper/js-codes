// ⚠️  SPOILERS — Attempt A-dsa/08-sliding-window.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Sliding Window Of Size K
// ════════════════════════════════════════════════════════════

// ── YOUR APPROACH: SLIDING WINDOW ─────────────── O(n) time  O(1) space
// The overall shape (build the first window, then slide) was right.
// Four bugs, once fixed:
//   - `nums[k]` → `nums[i]` — you always added the element at the
//     FIXED index k instead of the CURRENT index i, so every window
//     "gained" the same element instead of the next one in line.
//   - `windowSum` was never updated (`windowSum = currSum` was
//     missing) — every `currSum` was computed from the ORIGINAL
//     first-window sum instead of the PREVIOUS window's sum, so the
//     window never actually slid forward.
//   - `ans` was declared with `let` INSIDE the for-loop's block, so
//     it didn't exist outside the loop — `return ans` would throw a
//     ReferenceError. It needs to be declared before the loop.
//   - `Math.max(currSum, windowSum)` compared the current sum
//     against itself (once windowSum is updated to equal currSum,
//     those two are the same value) instead of comparing against the
//     best sum seen so far across ALL windows.
//   - Edge case: if k > nums.length there's no valid window of size
//     k at all — return null rather than summing past the end of
//     the array.
function maxSumSubarrayK(nums, k) {
  if (k > nums.length) return null;

  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += nums[i];
  }

  let ans = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum = windowSum - nums[i - k] + nums[i];
    ans = Math.max(ans, windowSum);
  }

  return ans;
}

// ── ALTERNATIVE: BRUTE FORCE ───────────────────── O(n·k) time  O(1) space
// Recompute the sum of every window from scratch — for each starting
// index, walk k elements forward and add them up. Correct, but redoes
// (k - 1) additions per step that sliding window reuses from the
// previous window.
function maxSumSubarrayKBruteForce(nums, k) {
  if (k > nums.length) return null;

  let best = -Infinity;
  for (let start = 0; start + k <= nums.length; start++) {
    let sum = 0;
    for (let j = start; j < start + k; j++) {
      sum += nums[j];
    }
    best = Math.max(best, sum);
  }
  return best;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Consecutive windows of fixed size k overlap in (k - 1) elements.
// Brute force throws that overlap away and resums it every time.
// Sliding window reuses it: subtract the element that just fell off
// the left edge, add the element that just entered on the right —
// turning O(k) work per step into O(1) work per step.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Your approach (fixed): O(n) time, O(1) space — this IS the
//                         optimal solution once the bugs are fixed;
//                         nothing to trade off against it here.
// Brute force:            O(n·k) time, O(1) space — simpler to
//                         reason about and fine for small k, but
//                         degrades badly as k grows toward n.

module.exports = {
  maxSumSubarrayK,
  maxSumSubarrayKBruteForce,
};
