// ╔════════════════════════════════════════════════════════════╗
//  11: Longest Common Prefix                             [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Return the longest common prefix string among an array of
// strings. Return "" if there is no common prefix.
//
// Input:   longestCommonPrefix(["flower", "flow", "flight"])
// Output:  "fl"

// YOUR SOLUTION ─────────────────────────────────────────────

function longestCommonPrefix(strs) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

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
