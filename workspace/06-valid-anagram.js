// ╔══════════════════════════════════════════════════════════╗
//   Problem 6: Valid Anagram      [Easy]  [String/Frequency]
//   node coach.js problem 6   → guiding questions
//   node coach.js hint 6 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given two strings, return true if they are anagrams of
// each other (same characters, same counts, different order).
//
// Input:   "listen", "silent"
// Output:  true
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What is the very first check to make (before any loops)?
// • Sort approach vs frequency counter — what are the trade-offs?
// • How does Problem 4 (char frequency) connect to this problem?

// ── YOUR SOLUTION ──────────────────────────────────────────

function isAnagram(s, t) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['listen', 'silent'],   expected: true },
  { args: ['hello', 'world'],     expected: false },
  { args: ['anagram', 'nagaram'], expected: true },
  { args: ['rat', 'car'],         expected: false },
  { args: ['a', 'a'],             expected: true },
  { args: ['ab', 'a'],            expected: false },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isAnagram(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isAnagram, TESTS };
