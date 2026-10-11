// ╔══════════════════════════════════════════════════════════╗
//   Problem 29: Generate Parentheses         [Medium]  [Backtracking]
//   node coach.js problem 29  → guiding questions
//   node coach.js hint 29 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given n pairs of parentheses, return ALL combinations of
// well-formed (balanced, validly nested) parentheses strings.
// Order of the returned array doesn't matter.
//
// Input:   n = 3
// Output:  ["((()))","(()())","(())()","()(())","()()()"]
//
// Input:   n = 1   → ["()"]

// THINK BEFORE CODING ──────────────────────────────────────
// • Backtracking: build the string one character at a time,
//   choosing to add '(' or ')' at each step, and track how many
//   of each you've used so far.
// • What's the rule for when you're ALLOWED to add an opening
//   paren? (hint: compare the open count to n)
// • What's the rule for when you're ALLOWED to add a closing
//   paren? (hint: compare it to the open count, not to n)
// • What's your base case / when do you add the current string
//   to the results?

// ── YOUR SOLUTION ──────────────────────────────────────────

function generateParenthesis(n) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortStrings = (arr) => [...arr].sort();

const TESTS = [
  { args: [3], expected: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
  { args: [1], expected: ["()"] },
  { args: [2], expected: ["(())", "()()"] },
  { args: [0], expected: [""] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(sortStrings(a)) === JSON.stringify(sortStrings(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = generateParenthesis(...args) ?? [];
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { generateParenthesis, TESTS };
