// ╔══════════════════════════════════════════════════════════╗
//   Problem 28: Decode Ways         [Medium]  [DP/String]
//   node coach.js problem 28  → guiding questions
//   node coach.js hint 28 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// A message of digits can be decoded via 'A'=1, 'B'=2, ..., 'Z'=26.
// Given an encoded string of digits, return the number of ways it
// can be decoded.
//
// Input:   "226"
// Output:  3     ("2,2,6" → "BBF", "22,6" → "VF", "2,26" → "BZ")
//
// Input:   "06"
// Output:  0     (no letter maps to "06" or to "0" alone)

// THINK BEFORE CODING ──────────────────────────────────────
// • At each position, you can decode ONE digit (if it's not '0')
//   or TWO digits (if that two-digit number is between 10 and 26).
//   What's the recurrence relating dp[i] to dp[i-1] and dp[i-2]?
// • Why is a lone '0' always invalid, but "10" and "20" are valid
//   two-digit codes?
// • What should dp[0] (empty prefix) be, conceptually? Why does
//   that make the recurrence work cleanly for the first character?
// • Can you collapse the DP array into two rolling variables, the
//   same way as House Robber?
// • What should happen if the string starts with '0' (e.g. "06")?

// ── YOUR SOLUTION ──────────────────────────────────────────

function numDecodings(s) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ["226"], expected: 3 },
  { args: ["06"], expected: 0 },
  { args: ["10"], expected: 1 },
  { args: ["12"], expected: 2 },
  { args: ["100"], expected: 0 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = numDecodings(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { numDecodings, TESTS };
