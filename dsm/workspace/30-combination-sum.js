// ╔══════════════════════════════════════════════════════════╗
//   Problem 30: Combination Sum         [Medium]  [Backtracking]
//   node coach.js problem 30  → guiding questions
//   node coach.js hint 30 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of DISTINCT candidate numbers and a target,
// return all unique combinations where the chosen numbers sum to
// target. The SAME number may be reused an unlimited number of
// times within a combination. Order of combinations, and order
// within each combination, doesn't matter.
//
// Input:   candidates = [2, 3, 6, 7], target = 7
// Output:  [[2,2,3],[7]]
//
// Input:   candidates = [2], target = 1   → []

// THINK BEFORE CODING ──────────────────────────────────────
// • Backtracking: at each step, choose a candidate to add, then
//   recurse on the REMAINING target.
// • Since a number can be reused, when you recurse after picking
//   candidates[i], do you move to index i+1 or stay at index i?
// • How do you avoid generating [2,3,2] AND [2,2,3] as "different"
//   combinations? (hint: a start index that only ever moves
//   forward)
// • What are your two base cases — remaining target hits exactly
//   0, and remaining target goes negative?

// ── YOUR SOLUTION ──────────────────────────────────────────

function combinationSum(candidates, target) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortCombos = (combos) =>
  combos.map(c => [...c].sort((a, b) => a - b))
        .sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1);

const TESTS = [
  { args: [[2, 3, 6, 7], 7], expected: [[2, 2, 3], [7]] },
  { args: [[2, 3, 5], 8], expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
  { args: [[2], 1], expected: [] },
  { args: [[1], 1], expected: [[1]] },
  { args: [[1], 2], expected: [[1, 1]] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(sortCombos(a)) === JSON.stringify(sortCombos(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = combinationSum(...args) ?? [];
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { combinationSum, TESTS };
