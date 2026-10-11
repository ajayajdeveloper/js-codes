// ╔══════════════════════════════════════════════════════════╗
//   04: First Non-Repeating Character In A String       [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string, return the first character that does NOT repeat
// anywhere else in the string. Return null if every character repeats.
//
// Input:   firstNonRepeatingChar("swiss")
// Output:  "w"

// THINK BEFORE CODING ──────────────────────────────────────
// • Why can't a single pass work here? (you don't know a character's
//   TOTAL count until you've seen the whole string — so a first pass
//   must build the full frequency map before you can trust any count)
// • Two-pass approach: pass 1 builds a frequency map of every
//   character; pass 2 walks the string AGAIN, in its ORIGINAL order,
//   and returns the first character whose count is exactly 1.
// • Why must pass 2 walk the STRING again, rather than just iterating
//   the frequency map's keys? (plain objects don't guarantee the same
//   iteration order as first-appearance order the way you might
//   assume — walking the original string sidesteps that entirely)
// • What should the function return when no non-repeating character
//   exists?

// ── YOUR SOLUTION ──────────────────────────────────────────

function firstNonRepeatingChar(str) {
  // your code here
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
