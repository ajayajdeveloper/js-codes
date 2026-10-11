// ╔══════════════════════════════════════════════════════════╗
//   06: Character Frequency Count                    [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string, return an object mapping each character to
// how many times it appears.
//
// Input:   "aabbc"
// Output:  { a: 2, b: 2, c: 1 }

// THINK BEFORE CODING ──────────────────────────────────────
// • What's the "default to 0, then increment" pattern for a
//   counter object?
// • for...of over a string vs str.split('') — any difference for
//   plain ASCII? (there is, for multi-byte unicode — not needed here)
// • Why is `{ ...acc, [ch]: (acc[ch] || 0) + 1 }` inside a reduce
//   a performance trap on large strings? What should you do instead?

// ── YOUR SOLUTION ──────────────────────────────────────────

function charFrequency(str) {

  let map = new Map();

  for(let i = 0 ; i < str.length; i++){
    if(map.has(str[i])){
      map.set(str[i], map.get(str[i]) +1)
    }
    else{
      map.set(str[i], 1)
    }
  }
  return map
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['aabbc'], expected: { a: 2, b: 2, c: 1 } },
  { args: ['javascript'], expected: { j: 1, a: 2, v: 1, s: 1, c: 1, r: 1, i: 1, p: 1, t: 1 } },
  { args: [''], expected: {} },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = charFrequency(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { charFrequency, TESTS };
