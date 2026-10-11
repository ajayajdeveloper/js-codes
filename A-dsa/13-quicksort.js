// ╔══════════════════════════════════════════════════════════╗
//   13: Quicksort                                    [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement quickSort(nums) that returns a NEW array sorted
// ascending, using the quicksort algorithm. Do not mutate the input.
//
// Input:   [5, 1, 4, 2, 8]
// Output:  [1, 2, 4, 5, 8]

// THINK BEFORE CODING ──────────────────────────────────────
// • Quicksort is divide-and-conquer: pick a PIVOT element, then
//   partition the rest of the array into "less than pivot" and
//   "greater than or equal to pivot" groups.
// • Once partitioned, where does the pivot itself belong in the
//   final sorted order? (hint: it's already in its final position)
// • What do you do with the "less than" and "greater than" groups
//   after partitioning? (recurse on each, then combine)
// • What's the base case — when does recursion stop?
// • Simplest pivot choice: first element, last element, or middle —
//   does it matter for CORRECTNESS? Does it matter for PERFORMANCE?
//   (worst case O(n²) happens when the pivot is always the
//   smallest or largest remaining element — e.g. an already-sorted
//   array with a first/last-element pivot)
// • Average case is O(n log n) — why? What breaks it down to
//   O(n²) in the worst case?
// • This "filter into two arrays" approach uses O(n) extra space
//   per level of recursion — how would an in-place partition
//   (swapping within the original array) change that?

// ── YOUR SOLUTION ──────────────────────────────────────────

function quickSort(nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[5, 1, 4, 2, 8]], expected: [1, 2, 4, 5, 8] },
  { args: [[9, 3, 7, 1, 8, 2, 5]], expected: [1, 2, 3, 5, 7, 8, 9] },
  { args: [[1, 2, 3, 4, 5]], expected: [1, 2, 3, 4, 5] },  // already sorted
  { args: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5] },  // reverse sorted
  { args: [[3, 3, 1, 3, 2]], expected: [1, 2, 3, 3, 3] },  // duplicates
  { args: [[]], expected: [] },
  { args: [[7]], expected: [7] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const original = JSON.stringify(args[0]);
    const result = quickSort(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    const mutated = JSON.stringify(args[0]) !== original;
    score += ok && !mutated ? 1 : 0;
    console.log(
      `Test ${i + 1}: ${ok && !mutated ? '✅' : '❌'}  got ${JSON.stringify(result)}` +
      (mutated ? '  ⚠️  mutated the input array!' : '')
    );
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { quickSort, TESTS };
