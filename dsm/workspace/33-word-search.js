// ╔══════════════════════════════════════════════════════════╗
//   Problem 33: Word Search         [Medium]  [Backtracking/Grid]
//   node coach.js problem 33  → guiding questions
//   node coach.js hint 33 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a 2D grid of characters `board` and a string `word`,
// return true if `word` can be constructed by a path of
// horizontally/vertically ADJACENT cells, where the same cell
// cannot be used more than once in the path.
//
// Input:  board = [["A","B","C","E"],
//                   ["S","F","C","S"],
//                   ["A","D","E","E"]]
//         word = "ABCCED"
// Output: true   (A→B→C→C→E→D path exists)
//
// Input:  word = "SEE"   → true
// Input:  word = "ABCB"  → false  (would need to reuse the 'C' cell)

// THINK BEFORE CODING ──────────────────────────────────────
// • This is DFS + backtracking on a grid: try starting the
//   search from every cell that matches word[0].
// • At each step, check the 4 neighbors (up/down/left/right)
//   for the NEXT character in the word.
// • You need a way to mark a cell as "in use" during the
//   current path, and un-mark it when backtracking out —
//   a common trick is to temporarily overwrite board[r][c]
//   with a sentinel (like '#'), then restore it afterward.
// • Base case: if you've matched the full word length, return true.
// • Bounds check + character mismatch + already-visited are all
//   reasons to bail out of a branch early.

// ── YOUR SOLUTION ──────────────────────────────────────────

function exist(board, word) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const cloneBoard = (board) => board.map(row => [...row]);

const TESTS = [
  {
    args: [cloneBoard([
      ["A","B","C","E"],
      ["S","F","C","S"],
      ["A","D","E","E"],
    ]), "ABCCED"],
    expected: true,
  },
  {
    args: [cloneBoard([
      ["A","B","C","E"],
      ["S","F","C","S"],
      ["A","D","E","E"],
    ]), "SEE"],
    expected: true,
  },
  {
    args: [cloneBoard([
      ["A","B","C","E"],
      ["S","F","C","S"],
      ["A","D","E","E"],
    ]), "ABCB"],
    expected: false,
  },
  {
    args: [cloneBoard([["A"]]), "A"],
    expected: true,
  },
  {
    args: [cloneBoard([["A"]]), "B"],
    expected: false,
  },
  {
    args: [cloneBoard([
      ["A","A"],
      ["A","A"],
    ]), "AAAA"],
    expected: true,
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const boardCopy = cloneBoard(args[0]);
    const result = exist(boardCopy, args[1]);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { exist, TESTS };
