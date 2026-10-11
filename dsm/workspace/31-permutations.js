// ╔══════════════════════════════════════════════════════════╗
//   Problem 31: Permutations         [Medium]  [Backtracking]
//   node coach.js problem 31  → guiding questions
//   node coach.js hint 31 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of distinct integers, return ALL possible
// permutations (in any order).
//
// Input:   [1,2,3]
// Output:  [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
//
// Input:   [0,1]   → [[0,1],[1,0]]
// Input:   [1]     → [[1]]

// THINK BEFORE CODING ──────────────────────────────────────
// • This is a backtracking problem: build a partial permutation,
//   and when it's "complete" (same length as nums), record it.
// • At each step, try every number that hasn't been used yet.
// • Track "used" with a boolean array, or swap elements in place
//   and swap back after recursing (both are valid).
// • How many total permutations are there for n distinct items?
//   (Hint: n!) That's your sanity check for output size.
// • Don't forget to push a COPY of the current path, not a
//   reference to the mutable array you're building.

// ── YOUR SOLUTION ──────────────────────────────────────────

function permute(nums) {
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
    expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],
  },
  {
    args: [[0, 1]],
    expected: [[0,1],[1,0]],
  },
  {
    args: [[1]],
    expected: [[1]],
  },
  {
    args: [[]],
    expected: [[]],
  },
  {
    args: [[1, 2, 3, 4]],
    expected: (() => {
      const perms = [];
      const arr = [1, 2, 3, 4];
      const backtrack = (path, used) => {
        if (path.length === arr.length) { perms.push([...path]); return; }
        for (let i = 0; i < arr.length; i++) {
          if (used[i]) continue;
          used[i] = true;
          path.push(arr[i]);
          backtrack(path, used);
          path.pop();
          used[i] = false;
        }
      };
      backtrack([], []);
      return perms;
    })(),
  },
];

if (require.main === module) {
  const pass = (a, b) =>
    JSON.stringify(sortGroups(a)) === JSON.stringify(sortGroups(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = permute(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { permute, TESTS };
