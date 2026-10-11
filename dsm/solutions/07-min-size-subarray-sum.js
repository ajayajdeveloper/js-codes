// ⚠️  SPOILERS — Attempt workspace/07-min-size-subarray-sum.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Minimum Size Subarray Sum
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(1) space
// Try every starting index, extend right until the sum qualifies.
function minSubArrayLenBrute(target, nums) {
  let best = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        best = Math.min(best, j - i + 1);
        break;
      }
    }
  }
  return best === Infinity ? 0 : best;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Variable-size sliding window: grow right to accumulate sum, then
// greedily shrink left while the window still meets the target.
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let best = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return best === Infinity ? 0 : best;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Because every number is positive, the window sum only grows as
// `right` advances and only shrinks as `left` advances — there's
// no case where shrinking could ever help AFTER the sum drops
// below target, so the greedy shrink-while-valid loop never misses
// a shorter answer.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: O(n²), clear but re-sums overlapping ranges.
// Sliding window: O(n) — each index enters and leaves the window
// at most once across the whole run.
