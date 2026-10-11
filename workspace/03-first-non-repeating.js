// ╔══════════════════════════════════════════════════════════╗
//   Problem 3: First Non-Repeating Char   [Easy]  [String/Map]
//   node coach.js problem 3   → guiding questions
//   node coach.js hint 3 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string, return the first character that does not
// repeat anywhere in the string. Return null if none exists.
//
// Input:   "aabbccddefg"
// Output:  "e"
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What two things do you need to know about each character?
// • Does order matter when iterating your data structure?
// • Can you solve this in one pass or do you need two?

// ── YOUR SOLUTION ──────────────────────────────────────────

function firstNonRepeating(str) {
  
  let map = new Map();
  for(let i = 0; i < str.length; i++){
    map.set(str[i], (map.get(str[i]) || 0) + 1);
  }

  for(let i = 0; i < str.length; i++){
    if(map.get(str[i]) === 1) return str[i];
  }
   return null;
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['aabbccddefg'],  expected: 'e' },
  { args: ['aabb'],         expected: null },
  { args: ['abcdef'],       expected: 'a' },
  { args: [''],             expected: null },
  { args: ['aab'],          expected: 'b' },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = firstNonRepeating(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { firstNonRepeating, TESTS };
