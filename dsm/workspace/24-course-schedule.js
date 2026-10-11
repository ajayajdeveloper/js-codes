// ╔══════════════════════════════════════════════════════════╗
//   Problem 24: Course Schedule         [Medium]  [Graph/Topological Sort]
//   node coach.js problem 24  → guiding questions
//   node coach.js hint 24 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// There are `numCourses` courses labeled 0..numCourses-1. You're
// given prerequisite pairs [a, b] meaning "to take course a, you
// must first take course b". Return true if it's possible to
// finish ALL courses, false if there's a cycle (an impossible
// dependency loop).
//
// Input:   numCourses = 2, prerequisites = [[1, 0]]
// Output:  true    (take 0, then 1)
//
// Input:   numCourses = 2, prerequisites = [[1, 0], [0, 1]]
// Output:  false   (0 needs 1, 1 needs 0 — a cycle)

// THINK BEFORE CODING ──────────────────────────────────────
// • Model this as a directed graph: an edge from b → a means
//   "b must come before a". Finishing all courses is possible
//   exactly when this graph has NO CYCLE.
// • Kahn's algorithm: track each course's IN-DEGREE (number of
//   unmet prerequisites). Start a queue with all in-degree-0
//   courses (no prerequisites). Process the queue, "removing"
//   edges by decrementing neighbors' in-degrees.
// • If you can process ALL courses this way, there's no cycle.
//   If some courses are left with in-degree > 0 that never drops
//   to 0, they're stuck in a cycle.
// • Alternative: DFS with a 3-state marking (unvisited / visiting
//   / done) — revisiting a "visiting" node means a cycle.

// ── YOUR SOLUTION ──────────────────────────────────────────

function canFinish(numCourses, prerequisites) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [2, [[1, 0]]], expected: true },
  { args: [2, [[1, 0], [0, 1]]], expected: false },
  { args: [1, []], expected: true },
  { args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], expected: true },
  { args: [3, [[0, 1], [1, 2], [2, 0]]], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = canFinish(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { canFinish, TESTS };
