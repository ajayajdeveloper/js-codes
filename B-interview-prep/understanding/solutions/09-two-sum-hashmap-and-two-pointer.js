// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/09-two-sum-hashmap-and-two-pointer.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Two-Sum — Hashmap (Unsorted) + Two-Pointer (Sorted)
// ════════════════════════════════════════════════════════════

// ── UNSORTED: HASHMAP ────────────────────────── O(n) time  O(n) space
// Walk once. At each index, compute the complement needed to reach
// target. Check the map for it BEFORE inserting the current number —
// checking first prevents a single element from being paired with
// itself when target happens to equal 2 * nums[i].
function twoSumUnsorted(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return null;
}

// ── SORTED: TWO POINTERS ────────────────────── O(n) time  O(1) space
// One pointer starts at the front, one at the back. If the current
// sum is too small, the only way to increase it is to move `left`
// forward (since everything is sorted ascending); if too big, move
// `right` back. This only works BECAUSE the array is sorted — the
// monotonic order is what guarantees moving a pointer moves the sum
// in a predictable direction.
function twoSumSorted(sortedNums, target) {
  let left = 0;
  let right = sortedNums.length - 1;

  while (left < right) {
    const sum = sortedNums[left] + sortedNums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Both are O(n) time, but they trade O(n) hashmap space for a
// sortedness PRECONDITION. If the array isn't already sorted, sorting
// it first costs O(n log n) — at which point the hashmap version on
// the original unsorted array is strictly better. Two-pointer only
// wins when the input is ALREADY sorted (or sortedness is free/given).

// ── TRADE-OFFS ───────────────────────────────────────────────
// Hashmap:       works on any array, O(n) space; the default choice
//                when input order is unconstrained.
// Two-pointer:   O(1) extra space, but only valid to reach for when
//                the array is already sorted — don't sort just to use
//                this technique unless sorting was needed anyway.

module.exports = { twoSumUnsorted, twoSumSorted };
