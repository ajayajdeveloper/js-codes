// ⚠️  SPOILERS — Attempt workspace/06-max-sum-subarray-k.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Maximum Sum Subarray of Size K
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n·k) time  O(1) space
// Recompute the sum of each window of size k from scratch.
function maxSumSubarrayKBrute(nums, k) {
  if (k > nums.length) return null;
  let best = -Infinity;
  for (let i = 0; i <= nums.length - k; i++) {
    let sum = 0;
    for (let j = i; j < i + k; j++) sum += nums[j];
    best = Math.max(best, sum);
  }
  return best;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Fixed-size sliding window: maintain a running sum, add the
// entering element and subtract the leaving one as the window slides.
function maxSumSubarrayK(nums, k) {
  if (k > nums.length) return null;

  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];

  let best = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    best = Math.max(best, windowSum);
  }

  return best;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Consecutive windows of a fixed size overlap in k-1 elements —
// there's no need to re-sum the whole window each time. Just add
// the new element entering on the right and remove the one leaving
// on the left, turning O(n·k) into O(n).

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: simple nested loop, fine for small k, wasteful for large k.
// Sliding window: O(n) regardless of k — the standard fixed-window pattern.
