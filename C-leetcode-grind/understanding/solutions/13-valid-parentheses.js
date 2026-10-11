// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/13-valid-parentheses.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Valid Parentheses
// ══════════════════════════════════════════════════════════════

// O(n) time  O(n) space
function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const c of s) {
    if (c === '(' || c === '[' || c === '{') {
      stack.push(c);
    } else if (stack.pop() !== pairs[c]) {
      return false;
    }
  }
  return stack.length === 0;
}

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

module.exports = { isValid, TESTS };
