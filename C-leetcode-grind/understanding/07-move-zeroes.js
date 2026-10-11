// ╔════════════════════════════════════════════════════════════╗
//  07: Move Zeroes                                       [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Move all 0s in the array to the end while keeping the relative
// order of the non-zero elements — in-place, single pass if you can.
//
// Input:   moveZeroes([0, 1, 0, 3, 12])
// Output:  [1, 3, 12, 0, 0]

// THINK BEFORE CODING ───────────────────────────────────────
// • Two-pointer: one index tracks "where the next non-zero value
//   should be written." What do you do with every non-zero element
//   as you scan past it?
// • After you've placed all non-zero elements at the front, what
//   goes in the remaining positions?
// • Can you do this in a single pass with O(1) extra space, without
//   allocating a second array?

// YOUR SOLUTION ─────────────────────────────────────────────

function moveZeroes(nums) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
  { args: [[0]], expected: [0] },
  { args: [[1, 2, 3]], expected: [1, 2, 3] },
  { args: [[0, 0, 1]], expected: [1, 0, 0] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = moveZeroes(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { moveZeroes };
