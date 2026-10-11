// ╔══════════════════════════════════════════════════════════╗
//   Problem 1: Two Sum (Unsorted Array)         [Easy]  [Array/HashMap]
//   node coach.js problem 1  → guiding questions
//   node coach.js hint 1 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of integers `nums` and an integer `target`,
// return the indices [i, j] (with i < j) of the two numbers
// that add up to target. Assume exactly one solution exists,
// and you may not use the same element twice.
//
// Input:   nums = [2, 7, 11, 15], target = 9
// Output:  [0, 1]        (2 + 7 === 9)
//
// Input:   nums = [3, 2, 4], target = 6  → [1, 2]  (2 + 4)

// THINK BEFORE CODING ──────────────────────────────────────
// • The brute force checks every pair — what's its time complexity?
// • For each number, you need its "complement" (target - num). How
//   would a hash map let you look up "have I seen the complement
//   already?" in O(1)?
// • Should you check for the complement BEFORE or AFTER inserting
//   the current number into the map? Why does order matter?
// • What should happen with duplicate values, e.g. nums = [3, 3],
//   target = 6?

// ── YOUR SOLUTION ──────────────────────────────────────────

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++){
    if(map.has(target - nums[i])){
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
  return null;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { args: [[3, 2, 4], 6], expected: [1, 2] },
  { args: [[3, 3], 6], expected: [0, 1] },
  { args: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
  { args: [[0, 4, 3, 0], 0], expected: [0, 3] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = twoSum(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { twoSum, TESTS };
