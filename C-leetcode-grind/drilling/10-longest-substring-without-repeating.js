// ╔════════════════════════════════════════════════════════════╗
//  10: Longest Substring Without Repeating Characters  [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Return the length of the longest substring of s that contains no
// repeating characters.
//
// Input:   lengthOfLongestSubstring("abcabcbb")
// Output:  3  ("abc")

// YOUR SOLUTION ─────────────────────────────────────────────

function lengthOfLongestSubstring(s) {
  
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

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
