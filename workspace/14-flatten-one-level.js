// ╔══════════════════════════════════════════════════════════╗
//   Problem 14: Flatten One Level      [Easy]  [Array/Spread]
//   node coach.js problem 14  → guiding questions
//   node coach.js hint 14 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array nested exactly one level deep, return a
// completely flat array.
//
// Input:   [1, [2, 3], [4, 5]]
// Output:  [1, 2, 3, 4, 5]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What is the difference between flat(1) and flat(Infinity)?
// • How would you implement this without flat()?
// • What does [].concat(...arr) do?

// ── YOUR SOLUTION ──────────────────────────────────────────

function flattenOneLevel(arr) {
  // return arr.flat();
  for(let i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      arr = arr.concat(arr[i]);
    }
  }
  return arr;
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, [2, 3], [4, 5]]],          expected: [1, 2, 3, 4, 5] },
  { args: [[1, 2, 3]],                     expected: [1, 2, 3] },
  { args: [[[1, 2], [3, 4], [5, 6]]],     expected: [1, 2, 3, 4, 5, 6] },
  { args: [[]],                            expected: [] },
  { args: [[1, [2], 3, [4, 5, 6]]],       expected: [1, 2, 3, 4, 5, 6] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = flattenOneLevel(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { flattenOneLevel, TESTS };
