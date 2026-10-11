// ╔══════════════════════════════════════════════════════════╗
//   05: Check If Two Strings Are Anagrams               [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given two strings, return true if one is an anagram of the other
// (same characters, same counts), ignoring case and spaces.
//
// Input:   isAnagram("listen", "silent")
// Output:  true

// THINK BEFORE CODING ──────────────────────────────────────
// • A fast length check up front lets you bail out early — why does
//   a length mismatch (after normalizing) instantly disqualify a pair?
// • Two common approaches: (1) sort both strings' characters and
//   compare the results, or (2) build a frequency map from one string
//   and decrement counts while scanning the other. What's the time
//   complexity of each? (sort: O(n log n); frequency map: O(n))
// • How do you normalize for case and whitespace before comparing?
// • With the frequency-map approach, what does it mean if you try to
//   decrement a character's count and it's already 0 (or missing)?

// ── YOUR SOLUTION ──────────────────────────────────────────

function isAnagram(a, b) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['listen', 'silent'], expected: true },
  { args: ['rat', 'car'], expected: false },
  { args: ['Dormitory', 'Dirty Room'], expected: true },  // case + space insensitive
  { args: ['', ''], expected: true },
  { args: ['a', 'ab'], expected: false },  // different lengths
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isAnagram(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isAnagram, TESTS };
