// ╔══════════════════════════════════════════════════════════╗
//   Problem 5: Reverse Each Word       [Easy]  [String/Array]
//   node coach.js problem 5   → guiding questions
//   node coach.js hint 5 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a sentence, reverse each word individually while
// keeping the words in their original positions.
//
// Input:   "Hello World"
// Output:  "olleH dlroW"
//
// THINK BEFORE CODING ──────────────────────────────────────
// • How do you split a sentence into words?
// • How do you reverse a single string?
// • Which array method applies a transformation to each element?

// ── YOUR SOLUTION ──────────────────────────────────────────

function reverseEachWord(str) {

  // str.split(' ').map(word => {
  //   return word.split('').reverse().join('');
  // }).join(' ');

  str = str.split(' ');
  let half = Math.floor(str.length / 2);
  let start = 0;
  let end = str.length - 1;
  while(start < half){
    [str[start], str[end]] = [str[end], str[start]];
    start++;
    end--;
  }
  return str.join(' ');

  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['Hello World'],            expected: 'olleH dlroW' },
  { args: ['I love JavaScript'],      expected: 'I evol tpircSavaJ' },
  { args: ['abc'],                    expected: 'cba' },
  { args: ['a b c'],                  expected: 'a b c' },
  { args: [''],                       expected: '' },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = reverseEachWord(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { reverseEachWord, TESTS };
