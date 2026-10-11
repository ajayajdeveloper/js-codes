// ╔══════════════════════════════════════════════════════════╗
//   14: Merge Sort                                   [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement mergeSort(nums) that returns a NEW array sorted
// ascending, using the merge sort algorithm. Do not mutate the input.
//
// Input:   [5, 1, 4, 2, 8]
// Output:  [1, 2, 4, 5, 8]

// THINK BEFORE CODING ──────────────────────────────────────
// • Merge sort is also divide-and-conquer, but the split is
//   unconditional: cut the array in half every time, regardless
//   of values (unlike quicksort's value-based partition).
// • What's the base case — an array of what size is already
//   "sorted" by definition?
// • After recursively sorting the LEFT half and the RIGHT half,
//   how do you combine two already-sorted arrays into one sorted
//   array? (this is the "merge" step — think of it like merging
//   two sorted piles of cards, always taking the smaller top card)
// • Walk through the merge step: you need two pointers, one per
//   input array. At each step, which pointer's value do you take?
// • What happens when one array runs out before the other?
// • Merge sort guarantees O(n log n) even in the WORST case —
//   why doesn't it have quicksort's O(n²) pitfall?
// • It needs O(n) extra space for the merged arrays at each level —
//   what's the trade-off against quicksort's average-case in-place
//   partitioning?
// • Merge sort is STABLE (equal elements keep their relative order)
//   — does your merge step preserve that? (hint: on a tie, which
//   array's element should you take first?)

// ── YOUR SOLUTION ──────────────────────────────────────────

function mergeSort(nums) {
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
    const result = mergeSort(...args);
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

module.exports = { mergeSort, TESTS };
