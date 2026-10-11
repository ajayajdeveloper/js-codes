// ⚠️  SPOILERS — Attempt workspace/16-search-rotated-sorted-array.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Search in Rotated Sorted Array
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n) time  O(1) space
// Just scan for the target. Correct, but ignores the fact the
// array is (partially) sorted, so it can't hit O(log n).
function searchRotatedSortedArrayBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) return i;
  }
  return -1;
}

// ── OPTIMAL ──────────────────────────── O(log n) time  O(1) space
// Modified binary search. At every step, one of the two halves
// around mid must be sorted (since only one rotation "break" point
// exists). Detect the sorted half, then check whether target lies
// within its range to decide which half to keep searching.
function searchRotatedSortedArray(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      // left half [left..mid] is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // right half [mid..right] is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Comparing nums[left] to nums[mid] tells you which half is the
// "normal" sorted half. Once you know that, a simple range check
// (nums[left] <= target < nums[mid], or the mirror for the right
// half) tells you which half to keep — same idea as vanilla binary
// search, just with an extra branch to locate the sorted side first.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Linear scan is trivial but O(n) — misses the point of the problem.
// The modified binary search keeps O(log n) by reasoning about which
// half is sorted instead of assuming the whole array is.
