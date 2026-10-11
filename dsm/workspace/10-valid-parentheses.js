// ╔══════════════════════════════════════════════════════════╗
//   Problem 10: Valid Parentheses         [Easy]  [Stack]
//   node coach.js problem 10  → guiding questions
//   node coach.js hint 10 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string `s` containing only the characters '(', ')',
// '{', '}', '[', ']', determine if the input is valid: every
// opening bracket must be closed by the same TYPE of bracket, and
// in the correct order.
//
// Input:   "()[]{}"     → true
// Input:   "(]"         → false
// Input:   "([)]"       → false   (wrong order)
// Input:   "{[]}"       → true

// THINK BEFORE CODING ──────────────────────────────────────
// • What data structure naturally matches "most recently opened
//   bracket must be the next one closed"? (LIFO ordering)
// • Walk the string: when you see an OPENING bracket, what do you
//   do? When you see a CLOSING bracket, what must be true about
//   the top of your stack?
// • A map like { ')': '(', ']': '[', '}': '{' } lets you look up
//   which opener a closer expects. What if the stack is empty when
//   you encounter a closer?
// • After processing the whole string, what must be true of the
//   stack for the string to be valid overall?

// ── YOUR SOLUTION ──────────────────────────────────────────

function isValidParentheses(s) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ["()[]{}"], expected: true },
  { args: ["(]"], expected: false },
  { args: ["([)]"], expected: false },
  { args: ["{[]}"], expected: true },
  { args: [""], expected: true },
  { args: ["("], expected: false },
  { args: ["]"], expected: false },
  { args: ["((("], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isValidParentheses(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isValidParentheses, TESTS };
