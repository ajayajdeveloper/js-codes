// ╔══════════════════════════════════════════════════════════╗
//   Problem 19: Balanced Parentheses    [Medium]  [Stack]
//   node coach.js problem 19  → guiding questions
//   node coach.js hint 19 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string of brackets, return true if every opening
// bracket has a matching closing bracket in the correct order.
// Valid brackets: ( ) { } [ ]
//
// Input:   "({[]})"   → true
// Input:   "()[]{}"   → true
// Input:   "(]"       → false
// Input:   "([)]"     → false
// Input:   "{[]}"     → true
//
// THINK BEFORE CODING ──────────────────────────────────────
// • A Stack (LIFO) is the natural fit here. Why?
// • When you see an opening bracket, what do you do?
// • When you see a closing bracket, what do you check?
// • What should the stack look like at the end of a valid string?
// • What if the string starts with a closing bracket?

// ── YOUR SOLUTION ──────────────────────────────────────────

function isBalanced(s) {

  const stack =[];
  const opening = "({[";
  const closing = ")}]";

  for (const char of s) {
    if (opening.includes(char)) {
      stack.push(char);
    } else if (closing.includes(char)) {
      if (stack.length === 0) return false;
      const last = stack.pop();
      if (opening.indexOf(last) !== closing.indexOf(char)) return false;
    }
  }

  return stack.length === 0;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ["({[]})"],   expected: true  },
  { args: ["()[]{}"],   expected: true  },
  { args: ["(]"],        expected: false },
  { args: ["([)]"],      expected: false },
  { args: ["{[]}"],      expected: true  },
  { args: [""],          expected: true  },
  { args: ["{"],         expected: false },
  { args: [")"],         expected: false },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isBalanced(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isBalanced, TESTS };
