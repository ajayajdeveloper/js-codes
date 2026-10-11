// ╔══════════════════════════════════════════════════════════╗
//   Problem 32: Subsets         [Medium]  [Backtracking]
//   node coach.js problem 32  → guiding questions
//   node coach.js hint 32 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of unique integers, return all possible
// subsets (the power set). Order doesn't matter.
//
// Input:   [1,2,3]
// Output:  [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
//
// Input:   [0]   → [[],[0]]
// Input:   []    → [[]]

// THINK BEFORE CODING ──────────────────────────────────────
// • How many subsets does an array of length n have? (2^n)
//   That's your expected output size.
// • Backtracking view: for each element, you either INCLUDE it
//   in the current subset or SKIP it — that's a binary choice
//   per element, which is exactly where 2^n comes from.
// • Alternative: start with [[]] and for each num, double the
//   existing list by adding a copy of every subset with num
//   appended (iterative "doubling" approach).
// • Every intermediate path IS a valid subset — you don't wait
//   until some "complete" condition like in Permutations.

// ── YOUR SOLUTION ──────────────────────────────────────────

function subsets(nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortGroups = (groups) =>
  Array.isArray(groups)
    ? groups.map(g => [...g]).sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1)
    : groups;

const TESTS = [
  {
    args: [[1, 2, 3]],
    expected: [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]],
  },
  {
    args: [[0]],
    expected: [[], [0]],
  },
  {
    args: [[]],
    expected: [[]],
  },
  {
    args: [[1, 2]],
    expected: [[], [1], [2], [1, 2]],
  },
  {
    args: [[5, 6, 7, 8]],
    expected: (() => {
      const arr = [5, 6, 7, 8];
      const result = [];
      const backtrack = (start, path) => {
        result.push([...path]);
        for (let i = start; i < arr.length; i++) {
          path.push(arr[i]);
          backtrack(i + 1, path);
          path.pop();
        }
      };
      backtrack(0, []);
      return result;
    })(),
  },
];

if (require.main === module) {
  const pass = (a, b) =>
    JSON.stringify(sortGroups(a)) === JSON.stringify(sortGroups(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = subsets(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { subsets, TESTS };
