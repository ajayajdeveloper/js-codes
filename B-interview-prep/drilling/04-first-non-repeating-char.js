// ╔══════════════════════════════════════════════════════════╗
//   04: First Non-Repeating Character In A String       [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string, return the first character that does NOT repeat
// anywhere else in the string. Return null if every character repeats.
//
// Input:   firstNonRepeatingChar("swiss")
// Output:  "w"

// ── YOUR SOLUTION ──────────────────────────────────────────

  function firstNonRepeatingChar(str) {
    const counts = {};
    for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;
    for (const ch of str) if (counts[ch] === 1) return ch;
    return null;
  }

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['swiss'], expected: 'w' },
  { args: ['aabb'], expected: null },
  { args: ['abcabc'], expected: null },
  { args: ['aabbc'], expected: 'c' },
  { args: [''], expected: null },
  { args: ['x'], expected: 'x' },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = firstNonRepeatingChar(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { firstNonRepeatingChar, TESTS };
