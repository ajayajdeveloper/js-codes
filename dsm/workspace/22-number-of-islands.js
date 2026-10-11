// ╔══════════════════════════════════════════════════════════╗
//   Problem 22: Number of Islands         [Medium]  [Graph/BFS-DFS]
//   node coach.js problem 22  → guiding questions
//   node coach.js hint 22 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a 2D grid of '1' (land) and '0' (water), return the
// number of islands. An island is formed by connecting adjacent
// land cells horizontally or vertically (4-directional) — not
// diagonally. The grid is surrounded by water on all edges.
//
// Input:
//   [["1","1","0","0","0"],
//    ["1","1","0","0","0"],
//    ["0","0","1","0","0"],
//    ["0","0","0","1","1"]]
// Output:  3
//
// Input:   [["0"]]   → 0

// THINK BEFORE CODING ──────────────────────────────────────
// • When you find a '1' you haven't visited, that's a NEW island
//   — how do you make sure you don't count its connected cells
//   again?
// • Flood-fill (DFS or BFS) from that cell, marking every
//   connected '1' as visited (e.g., overwrite it to '0').
// • What are the 4 directions you need to check from each cell?
// • What are your boundary conditions (out of grid, already
//   water)?

// ── YOUR SOLUTION ──────────────────────────────────────────

function numIslands(grid) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [[
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ]],
    expected: 3,
  },
  {
    args: [[
      ["0", "0", "0"],
      ["0", "0", "0"],
    ]],
    expected: 0,
  },
  {
    args: [[
      ["1", "1"],
      ["1", "1"],
    ]],
    expected: 1,
  },
  {
    args: [[["1"]]],
    expected: 1,
  },
  {
    args: [[
      ["1", "0"],
      ["0", "1"],
    ]],
    expected: 2,
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const gridCopy = args[0].map(row => [...row]);
    const result = numIslands(gridCopy);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { numIslands, TESTS };
