// ╔════════════════════════════════════════════════════════════╗
//  10: Longest Substring Without Repeating Characters  [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Return the length of the longest substring of s that contains no
// repeating characters.
//
// Input:   lengthOfLongestSubstring("abcabcbb")
// Output:  3  ("abc")

// THINK BEFORE CODING ───────────────────────────────────────
// • Sliding window with two pointers — what should trigger shrinking
//   the window from the left?
// • What data structure lets you check "is this character already in
//   my current window" in O(1), and also tells you WHERE it was last
//   seen so you can jump the left pointer directly?
// • Instead of shrinking one step at a time, can you jump `left`
//   straight to `lastSeenIndex + 1` on a repeat — but only if that
//   index is still inside the current window?

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

module.exports = { lengthOfLongestSubstring };
