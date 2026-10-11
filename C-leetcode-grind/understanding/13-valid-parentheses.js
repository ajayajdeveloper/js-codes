// ╔════════════════════════════════════════════════════════════╗
//  13: Valid Parentheses                                 [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Given a string containing just '()[]{}', return true if every
// bracket is closed by the correct type, in the correct order.
//
// Input:   isValid("()[]{}")
// Output:  true

// THINK BEFORE CODING ───────────────────────────────────────
// • A stack is the natural fit here — what gets pushed, and when do
//   you pop?
// • When you see a closing bracket, what two things must be true
//   about the top of the stack for the string to still be valid?
// • What condition, checked at the very end after scanning the
//   whole string, catches unmatched OPENING brackets?

// YOUR SOLUTION ─────────────────────────────────────────────

function isValid(s) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: ['()'], expected: true },
  { args: ['()[]{}'], expected: true },
  { args: ['(]'], expected: false },
  { args: ['([)]'], expected: false },
  { args: ['{[]}'], expected: true },
  { args: [''], expected: true },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isValid(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isValid };
