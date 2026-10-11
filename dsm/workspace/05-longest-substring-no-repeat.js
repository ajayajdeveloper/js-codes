// ╔══════════════════════════════════════════════════════════╗
//   Problem 5: Longest Substring Without Repeating Characters         [Medium]  [String/Sliding Window]
//   node coach.js problem 5  → guiding questions
//   node coach.js hint 5 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string `s`, return the length of the longest substring
// without repeating characters.
//
// Input:   "abcabcbb"
// Output:  3        ("abc")
//
// Input:   "bbbbb"   → 1   ("b")
// Input:   "pwwkew"  → 3   ("wke")

// THINK BEFORE CODING ──────────────────────────────────────
// • A brute force checks every substring for uniqueness — what's
//   its time complexity?
// • A "sliding window" keeps a left and right pointer marking the
//   current substring. As right expands, when do you need to move
//   left forward?
// • A Map from character → last seen index lets you JUMP left
//   directly past the duplicate, instead of moving it one step at
//   a time. When you find a repeat, what should the new left be?
//   (careful: don't move left BACKWARD if the duplicate's last
//   index is already outside the current window)
// • Track the max window size as you go.

// ── YOUR SOLUTION ──────────────────────────────────────────

function lengthOfLongestSubstring(s) {

  let map = new Map();

  for (let i = 0; i < s.length; i++){
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ["abcabcbb"], expected: 3 },
  { args: ["bbbbb"], expected: 1 },
  { args: ["pwwkew"], expected: 3 },
  { args: [""], expected: 0 },
  { args: ["a"], expected: 1 },
  { args: ["abba"], expected: 2 },
  { args: ["dvdf"], expected: 3 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = lengthOfLongestSubstring(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { lengthOfLongestSubstring, TESTS };
