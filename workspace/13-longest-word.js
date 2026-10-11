// ╔══════════════════════════════════════════════════════════╗
//   Problem 13: Longest Word          [Easy]  [String/Reduce]
//   node coach.js problem 13  → guiding questions
//   node coach.js hint 13 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a sentence, return the longest word.
// On a tie, return the first one encountered.
//
// Input:   "I love JavaScript programming"
// Output:  "programming"
//
// THINK BEFORE CODING ──────────────────────────────────────
// • Do you need to sort the words? Is there a single-pass approach?
// • What does reduce track as the "running maximum"?
// • What happens on a tie — which word should win?

// ── YOUR SOLUTION ──────────────────────────────────────────

function longestWord(str) {
  let words = str.split(' ');
  let longest =  words[0];
  for(let word of words){
    if(word.length > longest.length){
      longest = word;
    }
  }
  return longest;
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['I love JavaScript programming'], expected: 'programming' },
  { args: ['hello world'],                   expected: 'hello' },
  { args: ['a bb ccc'],                      expected: 'ccc' },
  { args: ['one'],                           expected: 'one' },
  { args: ['cat bat sat'],                   expected: 'cat' },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = longestWord(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { longestWord, TESTS };
