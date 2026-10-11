// ⚠️  SPOILERS — Attempt workspace/17-first-last-position-sorted-array.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Find First and Last Position of Element in Sorted Array
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n) time  O(1) space
// Linear scan tracking the first and last matching index seen.
function searchRangeBrute(nums, target) {
  let first = -1;
  let last = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      if (first === -1) first = i;
      last = i;
    }
  }
  return [first, last];
}

// ── OPTIMAL ──────────────────────────── O(log n) time  O(1) space
// Two binary searches sharing one helper: one biased to keep
// searching LEFT after a match (finds the leftmost bound), one
// biased to keep searching RIGHT after a match (finds the rightmost).
function findBound(nums, target, findFirst) {
  let left = 0;
  let right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      result = mid;
      if (findFirst) {
        right = mid - 1; // keep looking for an earlier match
      } else {
        left = mid + 1;  // keep looking for a later match
      }
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}

function searchRange(nums, target) {
  const first = findBound(nums, target, true);
  if (first === -1) return [-1, -1];
  const last = findBound(nums, target, false);
  return [first, last];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// On a match, don't stop — narrow the search window on the side
// you still need to explore (left of mid for the first occurrence,
// right of mid for the last), while recording the best match found
// so far. This keeps both searches at O(log n).

// ── TRADE-OFFS ───────────────────────────────────────────────
// Linear scan is simple and works, but is O(n) — defeats the purpose
// for large sorted arrays. Two biased binary searches keep O(log n)
// total and share nearly all their logic via one parameterized helper.
