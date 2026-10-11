// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/11-longest-common-prefix.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Longest Common Prefix
// ══════════════════════════════════════════════════════════════

// O(n * m) time (n strings, m = shortest string length)  O(1) extra space
function longestCommonPrefix(strs) {
  if (strs.length === 0) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}

const TESTS = [
  { args: [['flower', 'flow', 'flight']], expected: 'fl' },
  { args: [['dog', 'racecar', 'car']], expected: '' },
  { args: [['']], expected: '' },
  { args: [['a']], expected: 'a' },
  { args: [[]], expected: '' },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = longestCommonPrefix(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { longestCommonPrefix, TESTS };
