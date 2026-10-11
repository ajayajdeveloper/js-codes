// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/12-string-compression.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: String Compression (Run-Length Encode)
// ══════════════════════════════════════════════════════════════

// O(n) time  O(n) space
function compress(s) {
  if (s.length === 0) return '';
  let result = '';
  let count = 1;
  for (let i = 1; i <= s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      result += s[i - 1] + count;
      count = 1;
    }
  }
  return result;
}

const TESTS = [
  { args: ['aaabbc'], expected: 'a3b2c1' },
  { args: ['abcd'], expected: 'a1b1c1d1' },
  { args: [''], expected: '' },
  { args: ['aaaa'], expected: 'a4' },
  { args: ['a'], expected: 'a1' },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = compress(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { compress, TESTS };
