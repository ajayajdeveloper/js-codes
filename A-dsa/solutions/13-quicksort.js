// ⚠️  SPOILERS — Attempt A-dsa/13-quicksort.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Quicksort
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: FILTER-BASED PARTITION ────────────── O(n log n) avg, O(n²) worst  O(n) space/level
// Base case: an array of 0 or 1 elements is already sorted.
// Otherwise pick a pivot (middle element here — avoids the worst
// case on already-sorted input that a first/last-element pivot
// triggers), then partition the REST into three groups: less than
// pivot, equal to pivot, greater than pivot. The pivot is already in
// its final position relative to everything else, so the answer is
// just: sorted(less) + equal + sorted(greater).
// Pivot choice affects PERFORMANCE, not correctness — any consistent
// partition rule still produces a correctly sorted array; some
// choices just create worse split ratios on certain inputs.
function quickSort(nums) {
  if (nums.length <= 1) return nums;

  const pivotIndex = Math.floor(nums.length / 2);
  const pivot = nums[pivotIndex];

  const less = [];
  const equal = [];
  const greater = [];
  for (const num of nums) {
    if (num < pivot) less.push(num);
    else if (num > pivot) greater.push(num);
    else equal.push(num);
  }

  return [...quickSort(less), ...equal, ...quickSort(greater)];
}

// ── ALTERNATIVE: IN-PLACE (LOMUTO PARTITION) ───── O(n log n) avg, O(n²) worst  O(log n) space
// The classic in-place version: instead of building new less/equal/
// greater arrays, swap elements within the array itself so
// everything ≤ pivot ends up left of it and everything > pivot ends
// up right, then recurse on the two sides. Uses only O(log n) extra
// space (the recursion stack) instead of O(n) per level — but it
// mutates, so a full copy is taken up front to honor "don't mutate
// the input".
function quickSortInPlace(nums) {
  const arr = [...nums];

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  function sort(low, high) {
    if (low < high) {
      const pivotIndex = partition(low, high);
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    }
  }

  sort(0, arr.length - 1);
  return arr;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Quicksort's recursion always follows "partition around a pivot,
// then recurse on each side" — what changes between versions is HOW
// the partition happens: allocating new arrays (simple to read, O(n)
// space per level) vs. swapping in place (more code, O(log n) space).
// Both degrade to O(n²) the same way: when the pivot is repeatedly
// the smallest or largest remaining element, one side of the
// partition is empty and the other has everything, so the recursion
// depth becomes O(n) instead of O(log n).

// ── TRADE-OFFS ───────────────────────────────────────────────
// Filter-based:  easiest to read and reason about; also trivially
//                stable-ish for the equal bucket, but pays O(n)
//                extra space at every level of recursion.
// In-place:      the "real" quicksort — O(log n) extra space on
//                average — but noticeably more code, and needs an
//                explicit copy up front since the swaps are
//                destructive.

module.exports = {
  quickSort,
  quickSortInPlace,
};
