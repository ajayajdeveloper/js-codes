// ╔══════════════════════════════════════════════════════════╗
//   BONUS: Unique Once (no Set!)   [Easy-Med]  [Frequency]
//   node coach.js problem 16  → guiding questions
//   node coach.js hint 16 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// WITHOUT using Set, return only elements that appear
// EXACTLY ONCE in the array.
//
// Input:   [1, 2, 3, 2, 4, 1, 5]
// Output:  [3, 4, 5]
//
// Constraint: Do NOT use Set.
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What data structure replaces Set here for frequency tracking?
// • What is the two-step process: count, then ___?
// • Does arr.filter(x => freq[x] === 1) produce duplicates? Why not?

// ── YOUR SOLUTION ──────────────────────────────────────────

function uniqueOnce(arr) {
  // your code here — no Set allowed!
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 2, 4, 1, 5]],   expected: [3, 4, 5] },
  { args: [[1, 1, 2, 2, 3, 3]],      expected: [] },
  { args: [[1, 2, 3]],               expected: [1, 2, 3] },
  { args: [[1]],                      expected: [1] },
  { args: [[]],                       expected: [] },
  { args: [[5, 5, 3, 3, 1]],        expected: [1] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = uniqueOnce(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { uniqueOnce, TESTS };
