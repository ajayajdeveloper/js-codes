// ╔══════════════════════════════════════════════════════════╗
//   Problem 39: Spiral Matrix         [Medium]  [Array/Matrix]
//   node coach.js problem 39  → guiding questions
//   node coach.js hint 39 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an m x n matrix, return all elements in clockwise
// spiral order, as a flat array.
//
// Input:   [[1,2,3],
//            [4,5,6],
//            [7,8,9]]
// Output:  [1,2,3,6,9,8,7,4,5]
//
// Input:   [[1,2,3,4],
//            [5,6,7,8],
//            [9,10,11,12]]
// Output:  [1,2,3,4,8,12,11,10,9,5,6,7]

// THINK BEFORE CODING ──────────────────────────────────────
// • Maintain four boundaries: top, bottom, left, right — the
//   "walls" of the region not yet visited.
// • Walk right along the top row, down the right column, left
//   along the bottom row, then up the left column — then shrink
//   all four boundaries inward by one and repeat.
// • What's the loop's termination condition? (top > bottom or
//   left > right means nothing left to visit.)
// • After walking a full row/column, immediately move that
//   boundary inward BEFORE starting the next side — otherwise
//   you'll revisit corner cells.
// • Careful with non-square (m x n) and single row/column inputs
//   — the "walk down"/"walk left" steps need their own bounds
//   checks so a single row doesn't get traversed twice.

// ── YOUR SOLUTION ──────────────────────────────────────────

function spiralOrder(matrix) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]],
    expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
  },
  {
    args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]],
    expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
  },
  {
    args: [[[1]]],
    expected: [1],
  },
  {
    args: [[[1, 2, 3, 4]]],
    expected: [1, 2, 3, 4],
  },
  {
    args: [[[1], [2], [3], [4]]],
    expected: [1, 2, 3, 4],
  },
  {
    args: [[[1, 2], [3, 4]]],
    expected: [1, 2, 4, 3],
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = spiralOrder(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { spiralOrder, TESTS };
