// ╔══════════════════════════════════════════════════════════╗
//   Problem 15: Number Frequency Counter  [Easy]  [Array/Map]
//   node coach.js problem 15  → guiding questions
//   node coach.js hint 15 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers, return an object mapping each
// number to how many times it appears.
//
// Input:   [1, 2, 2, 3, 1, 1, 4]
// Output:  { 1: 3, 2: 2, 3: 1, 4: 1 }
//
// THINK BEFORE CODING ──────────────────────────────────────
// • How is this different from Problem 4 (Character Frequency)?
// • What does (acc[x] || 0) + 1 evaluate to when x isn't in acc yet?
// • After building the counter, how would you find the most frequent number?

// ── YOUR SOLUTION ──────────────────────────────────────────

function numberFrequency(arr) {

  let frequency = new Map();
  for (let num of arr) {
    frequency[num] = (frequency[num] || 0) + 1;
  }
  return frequency;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 2, 3, 1, 1, 4]], expected: { 1: 3, 2: 2, 3: 1, 4: 1 } },
  { args: [[1, 1, 1]],              expected: { 1: 3 } },
  { args: [[1, 2, 3]],              expected: { 1: 1, 2: 1, 3: 1 } },
  { args: [[]],                     expected: {} },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = numberFrequency(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { numberFrequency, TESTS };
