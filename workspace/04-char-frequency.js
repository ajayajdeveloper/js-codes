// ╔══════════════════════════════════════════════════════════╗
//   Problem 4: Character Frequency Counter  [Easy]  [String]
//   node coach.js problem 4   → guiding questions
//   node coach.js hint 4 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string, return an object mapping each character
// to the number of times it appears.
//
// Input:   "javascript"
// Output:  { j:1, a:2, v:1, s:1, c:1, r:1, i:1, p:1, t:1 }
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What is the default value for a key not yet in the counter?
// • Can you do this with reduce? With a for...of loop?
// • Is spread inside reduce efficient? (spoiler: no, O(n²))

// ── YOUR SOLUTION ──────────────────────────────────────────

function charFrequency(str) {
  let map = new Map();
  for(let i = 0; i < str.length; i++){
    map.set(str[i], (map.get(str[i]) || 0) + 1);
  }
  return Object.fromEntries(map);
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['javascript'], expected: { j:1, a:2, v:1, s:1, c:1, r:1, i:1, p:1, t:1 } },
  { args: ['aaa'],        expected: { a: 3 } },
  { args: [''],           expected: {} },
  { args: ['ab'],         expected: { a: 1, b: 1 } },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = charFrequency(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { charFrequency, TESTS };
