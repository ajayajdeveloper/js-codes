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

// ── YOUR SOLUTION ──────────────────────────────────────────

function reverseWords(sentence) {
  const words = sentence.split(" ");
  const out = [];

  for (let i = words.length - 1; i >= 0; i--) {
    if (words[i] !== "") {
      out.push(words[i]);
    }
  }

  return out.join(" ");
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
