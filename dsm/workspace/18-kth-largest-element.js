// ╔══════════════════════════════════════════════════════════╗
//   Problem 18: Kth Largest Element in an Array         [Medium]  [Heap/QuickSelect]
//   node coach.js problem 18  → guiding questions
//   node coach.js hint 18 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an unsorted array of numbers and an integer k, return
// the kth largest element (kth largest in SORTED order, not the
// kth distinct value).
//
// Input:   nums = [3,2,1,5,6,4], k = 2
// Output:  5
//
// Input:   nums = [3,2,3,1,2,4,5,5,6], k = 4   → 4
// Input:   nums = [1], k = 1                    → 1

// THINK BEFORE CODING ──────────────────────────────────────
// • Sorting descending and indexing k-1 works, but costs
//   O(n log n) — can we avoid a full sort?
// • Quickselect: partition around a pivot like quicksort, but
//   only recurse into the ONE side that contains the answer's
//   position — what index (from the left, 0-based) corresponds
//   to "kth largest"?
// • After partitioning, the pivot lands at its final sorted
//   index. How do you decide whether to recurse left, recurse
//   right, or stop because the pivot IS the answer?
// • What's the average-case time complexity of quickselect
//   versus the worst case? Why does a random pivot help?

// ── YOUR SOLUTION ──────────────────────────────────────────

function findKthLargest(nums, k) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[3,2,1,5,6,4], 2], expected: 5 },
  { args: [[3,2,3,1,2,4,5,5,6], 4], expected: 4 },
  { args: [[1], 1], expected: 1 },
  { args: [[2,1], 2], expected: 1 },
  { args: [[7,7,7,7], 2], expected: 7 },
  { args: [[9,3,2,4,8], 1], expected: 9 },
  { args: [[9,3,2,4,8], 5], expected: 2 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = findKthLargest(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { findKthLargest, TESTS };
