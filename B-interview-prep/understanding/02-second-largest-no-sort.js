// ╔══════════════════════════════════════════════════════════╗
//   02: Largest And Second-Largest, Without Sorting     [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers, find the largest value and the
// second-largest DISTINCT value, in a single pass, WITHOUT sorting.
//
// Input:   largestTwo([3, 1, 4, 1, 5, 9, 2, 6])
// Output:  { largest: 9, secondLargest: 6 }

// THINK BEFORE CODING ──────────────────────────────────────
// • Track `largest` and `secondLargest` as you scan once. When the
//   current number beats `largest`, what happens to the OLD largest?
// • When the current number is smaller than `largest` but bigger
//   than `secondLargest`, what do you update?
// • What happens when the current number EQUALS `largest`? (a
//   duplicate of the max is not a new "second largest" — it must be
//   skipped, not promoted)
// • How do you initialize `largest`/`secondLargest` so this works
//   correctly for an empty array, a single-element array, and an
//   array where every value is identical? (`null` sentinels, checked
//   explicitly, make "no second value found" distinguishable from
//   "found a very small number")
// • Why is this O(n) time, O(1) space — and how does that compare to
//   sorting first and reading off the last two elements?

// ── YOUR SOLUTION ──────────────────────────────────────────

function largestTwo(nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[3, 1, 4, 1, 5, 9, 2, 6]], expected: { largest: 9, secondLargest: 6 } },
  { args: [[5, 5, 3]], expected: { largest: 5, secondLargest: 3 } },      // duplicate max
  { args: [[5, 5, 5]], expected: { largest: 5, secondLargest: null } },   // no second distinct value
  { args: [[7]], expected: { largest: 7, secondLargest: null } },
  { args: [[]], expected: { largest: null, secondLargest: null } },
  { args: [[1, 2]], expected: { largest: 2, secondLargest: 1 } },
  { args: [[4, 2, 4, 2]], expected: { largest: 4, secondLargest: 2 } },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = largestTwo(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { largestTwo, TESTS };
