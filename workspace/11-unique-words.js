// ╔══════════════════════════════════════════════════════════╗
//   Problem 11: Unique Words             [Easy]  [String/Set]
//   node coach.js problem 11  → guiding questions
//   node coach.js hint 11 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a space-separated sentence, return an array of
// unique words preserving first-occurrence order.
//
// Input:   "apple banana apple orange banana"
// Output:  ["apple", "banana", "orange"]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What do you need to do with the string before applying array logic?
// • Does JavaScript's Set preserve insertion order?
// • How is this related to Problem 1 (Remove Duplicates)?

// ── YOUR SOLUTION ──────────────────────────────────────────

function uniqueWords(str) {
  // your code here
  // let map = new Map();
  let set = new Set();
  let words = str.split(' ');
  for(let word of words){
    if(!set.has(word)){
      set.add(word);
    } 
  }
  return [...set];
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['apple banana apple orange banana'], expected: ['apple', 'banana', 'orange'] },
  { args: ['hello world'],                      expected: ['hello', 'world'] },
  { args: ['one one one'],                      expected: ['one'] },
  { args: ['a'],                                expected: ['a'] },
  { args: [''],                                 expected: [''] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = uniqueWords(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { uniqueWords, TESTS };
