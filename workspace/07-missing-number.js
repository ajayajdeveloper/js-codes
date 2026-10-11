// ╔══════════════════════════════════════════════════════════╗
//   Problem 7: Missing Number           [Easy]  [Array/Math]
//   node coach.js problem 7   → guiding questions
//   node coach.js hint 7 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of n integers from 1 to n+1 with exactly
// one number missing, return the missing number.
//
// Input:   [1, 2, 3, 5]
// Output:  4
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What is the expected sum of 1..n+1 if nothing was missing?
// • If you subtract the actual sum, what do you get?
// • Can you solve this in O(1) extra space?

// ── YOUR SOLUTION ──────────────────────────────────────────

function missingNumber(arr) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 5]],         expected: 4 },
  { args: [[2, 3, 4, 5]],         expected: 1 },
  { args: [[1, 2, 3, 4]],         expected: 5 },
  { args: [[1]],                   expected: 2 },
  { args: [[2]],                   expected: 1 },
  { args: [[1, 3]],                expected: 2 },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = missingNumber(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { missingNumber, TESTS };

const sum = arr.reduce (a(acc, x) => acc + x, 0);
const expected = (arr.length + 1) * (arr.length + 2) / 2;
return expected - sum;
