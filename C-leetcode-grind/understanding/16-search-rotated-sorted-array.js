// ╔════════════════════════════════════════════════════════════╗
//  16: Search in Rotated Sorted Array                  [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// A sorted array of distinct values was rotated at an unknown pivot.
// Given the rotated array and a target, return its index, or -1.
// Must run in O(log n).
//
// Input:   searchRotated([4, 5, 6, 7, 0, 1, 2], 0)
// Output:  4

// THINK BEFORE CODING ───────────────────────────────────────
// • Even after rotation, at least ONE half of [left, mid] or
//   [mid, right] is always properly sorted. How do you tell which
//   half that is? (compare nums[left] to nums[mid])
// • Once you know which half is sorted, how do you check whether the
//   target lies within THAT half's value range, to decide which
//   side to keep searching?
// • What happens when nums[left] === nums[mid]? Make sure your
//   sorted-half check still routes correctly in that case.

// YOUR SOLUTION ─────────────────────────────────────────────

function searchRotated(nums, target) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
  { args: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
  { args: [[1], 0], expected: -1 },
  { args: [[5, 1, 3], 5], expected: 0 },
  { args: [[3, 1], 1], expected: 1 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = searchRotated(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { searchRotated };
