// ╔══════════════════════════════════════════════════════════╗
//   Problem 16: Search in Rotated Sorted Array         [Medium]  [Binary Search]
//   node coach.js problem 16  → guiding questions
//   node coach.js hint 16 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// An ascending array with distinct values has been rotated at an
// unknown pivot (e.g. [0,1,2,4,5,6,7] → [4,5,6,7,0,1,2]). Given
// the rotated array and a target value, return its index, or -1
// if it isn't present. Must run in O(log n) time.
//
// Input:   nums = [4,5,6,7,0,1,2], target = 0
// Output:  4
//
// Input:   nums = [4,5,6,7,0,1,2], target = 3   → -1
// Input:   nums = [1], target = 0               → -1

// THINK BEFORE CODING ──────────────────────────────────────
// • Plain binary search assumes the whole array is sorted — this
//   one is only sorted in two contiguous halves. What still holds
//   true at every step?
// • At each mid, at least ONE of [left..mid] or [mid..right] IS
//   fully sorted. How do you tell which one?
// • Once you know which half is sorted, how do you decide whether
//   the target lies inside that sorted half (and can be discarded
//   or kept accordingly)?
// • What are your loop invariants — when do you move left, when
//   right, when do you stop?

// ── YOUR SOLUTION ──────────────────────────────────────────

function searchRotatedSortedArray(nums, target) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[4,5,6,7,0,1,2], 0], expected: 4 },
  { args: [[4,5,6,7,0,1,2], 3], expected: -1 },
  { args: [[1], 0], expected: -1 },
  { args: [[1], 1], expected: 0 },
  { args: [[], 5], expected: -1 },
  { args: [[5,1,3], 5], expected: 0 },
  { args: [[3,1], 1], expected: 1 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = searchRotatedSortedArray(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { searchRotatedSortedArray, TESTS };
