// ╔══════════════════════════════════════════════════════════╗
//   09: Two-Sum — Hashmap (Unsorted) + Two-Pointer (Sorted)  [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Part A — twoSumUnsorted(nums, target): given an UNSORTED array,
// return the indices [i, j] (i < j) of two elements that sum to
// target, using a hashmap. Return null if no pair exists.
//
// Part B — twoSumSorted(sortedNums, target): same task, but the input
// is SORTED — solve it with the two-pointer technique instead.
//
// Input:   twoSumUnsorted([2, 7, 11, 15], 9)
// Output:  [0, 1]
//
// Input:   twoSumSorted([1, 2, 4, 7, 11], 9)
// Output:  [1, 3]

// ── YOUR SOLUTION ──────────────────────────────────────────

function twoSumUnsorted(nums, target) {
  // your code here
}

function twoSumSorted(sortedNums, target) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const UNSORTED_TESTS = [
  { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { args: [[3, 2, 4], 6], expected: [1, 2] },
  { args: [[3, 3], 6], expected: [0, 1] },
  { args: [[1, 2, 3], 100], expected: null },
];

const SORTED_TESTS = [
  { args: [[1, 2, 4, 7, 11], 9], expected: [1, 3] },
  { args: [[1, 2, 3, 4, 4, 9, 56, 90], 8], expected: [3, 4] },
  { args: [[1, 2, 3], 100], expected: null },
];

if (require.main === module) {
  let score = 0;
  let total = 0;

  UNSORTED_TESTS.forEach(({ args, expected }, i) => {
    total++;
    const result = twoSumUnsorted(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${total} (twoSumUnsorted ${i + 1}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });

  SORTED_TESTS.forEach(({ args, expected }, i) => {
    total++;
    const result = twoSumSorted(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${total} (twoSumSorted ${i + 1}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

module.exports = { twoSumUnsorted, twoSumSorted, UNSORTED_TESTS, SORTED_TESTS };
