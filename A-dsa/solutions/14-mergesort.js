// ⚠️  SPOILERS — Attempt A-dsa/14-mergesort.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Merge Sort
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: RECURSIVE SPLIT + MERGE ───────────── O(n log n) time  O(n) space
// Base case: an array of 0 or 1 elements is already sorted. Otherwise
// split down the middle UNCONDITIONALLY (no value comparison, unlike
// quicksort's pivot-based split), recursively sort each half, then
// merge the two already-sorted halves back together.
// The merge step walks both halves with one pointer each, always
// taking the smaller of the two current elements. When one half runs
// out, whatever's left in the other half is already sorted, so it
// can just be appended as-is.
// Using `<=` (not `<`) when the two pointers tie is what makes this
// STABLE: on equal values, the element from the LEFT half — which
// came first in the original array — is taken first, preserving its
// relative order against the equal element from the right half.
function mergeSort(nums) {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// ── ALTERNATIVE: BOTTOM-UP (ITERATIVE) ─────────── O(n log n) time  O(n) space
// Same merge step, but avoids recursion entirely: start by treating
// every single element as a sorted "run" of size 1, then repeatedly
// merge adjacent runs into runs of size 2, then 4, then 8... doubling
// the run size each pass until one pass covers the whole array. This
// sidesteps recursion-depth concerns on very large arrays, at the
// cost of being harder to read than the top-down version.
function mergeSortBottomUp(nums) {
  let runs = nums.map((n) => [n]);

  while (runs.length > 1) {
    const merged = [];
    for (let i = 0; i < runs.length; i += 2) {
      if (i + 1 < runs.length) {
        merged.push(merge(runs[i], runs[i + 1]));
      } else {
        merged.push(runs[i]);
      }
    }
    runs = merged;
  }

  return runs[0] || [];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Merge sort's worst case is always O(n log n) because the split is
// UNCONDITIONAL — it always halves the array regardless of the
// values in it, so the recursion depth is always exactly log n,
// unlike quicksort where a bad pivot can make one side empty and
// blow the depth up to O(n). The price for that guarantee is the
// O(n) extra space the merge step needs at every level.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Top-down (recursive):  reads closest to the "divide and conquer"
//                        definition; recursion depth is O(log n),
//                        rarely an issue in practice.
// Bottom-up (iterative): no recursion at all, so no call-stack depth
//                        concern regardless of input size; the
//                        run-doubling logic is less intuitive to
//                        follow than the recursive split.

module.exports = {
  mergeSort,
  mergeSortBottomUp,
};
