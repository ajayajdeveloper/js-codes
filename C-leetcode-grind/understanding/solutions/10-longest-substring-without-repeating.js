// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/10-longest-substring-without-repeating.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Longest Substring Without Repeating Characters
// ══════════════════════════════════════════════════════════════

// O(n) time  O(min(n, charset size)) space
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (lastSeen.has(c) && lastSeen.get(c) >= left) {
      left = lastSeen.get(c) + 1;
    }
    lastSeen.set(c, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

const TESTS = [
  { args: ['abcabcbb'], expected: 3 },
  { args: ['bbbbb'], expected: 1 },
  { args: ['pwwkew'], expected: 3 },
  { args: [''], expected: 0 },
  { args: ['abba'], expected: 2 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = lengthOfLongestSubstring(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { lengthOfLongestSubstring, TESTS };
