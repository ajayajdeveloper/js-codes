// ╔══════════════════════════════════════════════════════════╗
//   03: Reverse The Words In A Sentence            [Easy-Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a sentence, return a new string with the WORDS in reverse
// order (letters within each word stay in the same order). Collapse
// any extra whitespace to single spaces and trim the ends.
//
// Input:   reverseWords("the sky is blue")
// Output:  "blue is sky the"

// THINK BEFORE CODING ──────────────────────────────────────
// • Strings in JS are immutable, so true in-place mutation of a
//   STRING isn't possible — but you can still demonstrate the classic
//   in-place ALGORITHM (the one interviewers actually want to hear)
//   on a mutable character array: reverse the WHOLE array first, then
//   reverse each word's letters back within its own boundaries.
// • Walk through why "reverse everything, then re-reverse each word"
//   produces the correct word order without ever reversing letters
//   within a word incorrectly.
// • Simpler, non-in-place approach: split on whitespace, reverse the
//   array of words, join with a single space. What does
//   `"a  b".split(' ')` give you, and how does that trip you up with
//   multiple consecutive spaces? (empty-string entries in the
//   result — filter them out, or split on `/\s+/` after `.trim()`)
// • Which approach would you actually reach for first in a live
//   interview vs which one demonstrates you understand the in-place
//   trick they may be probing for?

// ── YOUR SOLUTION ──────────────────────────────────────────

function reverseWords(sentence) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['the sky is blue'], expected: 'blue is sky the' },
  { args: ['hello world'], expected: 'world hello' },
  { args: ['a'], expected: 'a' },
  { args: [''], expected: '' },
  { args: ['  hello   world  '], expected: 'world hello' },  // extra whitespace
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = reverseWords(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { reverseWords, TESTS };
