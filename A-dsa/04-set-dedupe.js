// ╔══════════════════════════════════════════════════════════╗
//   04: Set — Dedupe An Array                        [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array with duplicate values, return a new array with
// only unique values, preserving first-occurrence order.
//
// Input:   [1, 2, 2, 3, 1, 4]
// Output:  [1, 2, 3, 4]

// THINK BEFORE CODING ──────────────────────────────────────
// • What does `new Set([1, 2, 2, 3])` give you?
// • Does Set preserve insertion order in JavaScript? (yes — unlike
//   some languages' hash sets)
// • What's the shortest way to turn a Set back into an array?
// • How would this work on an array of OBJECTS, where Set's
//   reference equality won't consider two different objects with
//   the same shape as "equal"?

// ── YOUR SOLUTION ──────────────────────────────────────────

function dedupe(arr) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 2, 3, 1, 4]], expected: [1, 2, 3, 4] },
  { args: [['a', 'b', 'a', 'c']], expected: ['a', 'b', 'c'] },
  { args: [[]], expected: [] },
  { args: [[5, 5, 5]], expected: [5] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = dedupe(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { dedupe, TESTS };
