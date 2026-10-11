// ╔══════════════════════════════════════════════════════════╗
//   Problem 17: Find First and Last Position of Element in Sorted Array   [Medium]  [Binary Search]
//   node coach.js problem 17  → guiding questions
//   node coach.js hint 17 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of integers sorted in ascending order, find the
// starting and ending index of a given target value. If the
// target is not found, return [-1, -1]. Must run in O(log n).
//
// Input:   nums = [5,7,7,8,8,10], target = 8
// Output:  [3, 4]
//
// Input:   nums = [5,7,7,8,8,10], target = 6   → [-1, -1]
// Input:   nums = [], target = 0               → [-1, -1]

// THINK BEFORE CODING ──────────────────────────────────────
// • A single binary search finds ANY matching index, but not
//   necessarily the first or last one. What do you do differently
//   once nums[mid] === target?
// • For the LEFTMOST bound: when you find a match, do you stop, or
//   keep searching the left half for an even earlier match?
// • For the RIGHTMOST bound: symmetric idea, but searching right.
// • Can you write one helper `findBound(nums, target, findFirst)`
//   and call it twice instead of writing two nearly-identical loops?

// ── YOUR SOLUTION ──────────────────────────────────────────

function searchRange(nums, target) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[5,7,7,8,8,10], 8], expected: [3,4] },
  { args: [[5,7,7,8,8,10], 6], expected: [-1,-1] },
  { args: [[], 0], expected: [-1,-1] },
  { args: [[1], 1], expected: [0,0] },
  { args: [[2,2,2,2,2], 2], expected: [0,4] },
  { args: [[1,2,3], 3], expected: [2,2] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = searchRange(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { searchRange, TESTS };
