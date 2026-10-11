// ╔════════════════════════════════════════════════════════════╗
//  09: Valid Palindrome                                  [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Given a string, return true if it reads the same forwards and
// backwards when you consider only alphanumeric characters and
// ignore case.
//
// Input:   isPalindrome("A man, a plan, a canal: Panama")
// Output:  true

// THINK BEFORE CODING ───────────────────────────────────────
// • Two pointers closing in from both ends — what do you do when a
//   pointer is sitting on a non-alphanumeric character?
// • Don't forget case-insensitivity — where's the cheapest place to
//   normalize case, per character or per string?
// • What should an empty string, or a string of only punctuation,
//   return?

// YOUR SOLUTION ─────────────────────────────────────────────

function isPalindrome(s) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: ['A man, a plan, a canal: Panama'], expected: true },
  { args: ['race a car'], expected: false },
  { args: [' '], expected: true },
  { args: [''], expected: true },
  { args: ['0P'], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isPalindrome(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isPalindrome };
