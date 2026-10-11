// ╔══════════════════════════════════════════════════════════╗
//   Problem 40: Rotate Image         [Medium]  [Array/Matrix]
//   node coach.js problem 40  → guiding questions
//   node coach.js hint 40 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an n x n 2D matrix representing an image, rotate the
// image 90 degrees CLOCKWISE, IN PLACE — you must modify the
// input matrix directly and return nothing (void). You may
// NOT allocate another n x n matrix to do the rotation.
//
// Input:   [[1,2,3],
//            [4,5,6],
//            [7,8,9]]
// After rotate(matrix), matrix becomes:
//           [[7,4,1],
//            [8,5,2],
//            [9,6,3]]
//
// Input:   [[1,2],[3,4]]  → mutated to [[3,1],[4,2]]

// THINK BEFORE CODING ──────────────────────────────────────
// • A 90° clockwise rotation can be done in two simple in-place
//   passes: (1) TRANSPOSE the matrix (swap matrix[i][j] with
//   matrix[j][i] for i < j), then (2) REVERSE each row.
// • Why does transpose + row-reverse equal a clockwise rotation?
//   Try it on paper with a 3x3 grid and see where each element ends up.
// • Alternative: rotate "layer by layer" from the outside in,
//   doing a 4-way swap of each set of corresponding cells — more
//   fiddly to get right but avoids a full transpose pass.
// • Since this mutates in place, your function shouldn't return
//   the matrix — tests will check the matrix variable itself
//   after calling rotate(matrix).

// ── YOUR SOLUTION ──────────────────────────────────────────

function rotate(matrix) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    expected: [[7, 4, 1], [8, 5, 2], [9, 6, 3]],
  },
  {
    input: [[1, 2], [3, 4]],
    expected: [[3, 1], [4, 2]],
  },
  {
    input: [[1]],
    expected: [[1]],
  },
  {
    input: [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]],
    expected: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]],
  },
  {
    input: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]],
    expected: [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]],
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ input, expected }, i) => {
    const matrix = input.map(row => [...row]);
    rotate(matrix);
    const ok = JSON.stringify(matrix) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(matrix)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { rotate, TESTS };
