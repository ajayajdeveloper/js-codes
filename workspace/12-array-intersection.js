// ╔══════════════════════════════════════════════════════════╗
//   Problem 12: Array Intersection   [Easy-Med]  [Array/Set]
//   node coach.js problem 12  → guiding questions
//   node coach.js hint 12 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given two arrays, return a new array containing only
// elements present in BOTH arrays (no duplicates in result).
//
// Input:   [1, 2, 3, 4]  and  [3, 4, 5, 6]
// Output:  [3, 4]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What is the naive O(n*m) approach?
// • How do you speed up element lookups from O(n) to O(1)?
// • What should happen when both arrays contain duplicates?

// ── YOUR SOLUTION ──────────────────────────────────────────

function arrayIntersection(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const result = [];
  for (const x of setB) {
    if (setA.has(x)) result.push(x);
  }
  return result;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 4], [3, 4, 5, 6]],   expected: [3, 4] },
  { args: [[1, 2], [3, 4]],                 expected: [] },
  { args: [[1, 2, 3], [1, 2, 3]],          expected: [1, 2, 3] },
  { args: [[], [1, 2]],                     expected: [] },
  { args: [[1, 1, 2], [1, 2, 2]],          expected: [1, 2] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = arrayIntersection(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { arrayIntersection, TESTS };
