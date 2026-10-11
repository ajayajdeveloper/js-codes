// ╔══════════════════════════════════════════════════════════╗
//   Problem 18: Deep Flatten            [Medium]  [Recursion]
//   node coach.js problem 18  → guiding questions
//   node coach.js hint 18 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Flatten a deeply nested array to any depth — WITHOUT using
// Array.prototype.flat() or Array.prototype.flatMap().
//
// Input:   [1, [2, [3, [4, [5]]]]]
// Output:  [1, 2, 3, 4, 5]
//
// Input:   [1, [2, 3], [4, [5, 6]]]
// Output:  [1, 2, 3, 4, 5, 6]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What is the base case? (when do you stop recursing?)
// • For each element in the array: what are the two possibilities?
// • How do you combine the results? (spread into accumulator, or concat?)
// • Could you solve this iteratively with a stack?
//   → Push items in reverse, pop and process — if array, push its items.

// ── YOUR SOLUTION ──────────────────────────────────────────

function deepFlatten(arr) {
  // your code here — no .flat() or .flatMap() allowed!
  let result = [];
  for(let i =0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      result = result.concat(deepFlatten(arr[i]));
    }else{
      result.push(arr[i]);
    }
  }
  return result;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, [2, [3, [4, [5]]]]]], expected: [1, 2, 3, 4, 5] },
  { args: [[1, [2, 3], [4, [5, 6]]]], expected: [1, 2, 3, 4, 5, 6] },
  { args: [[[]]], expected: [] },
  { args: [[1, 2, 3]], expected: [1, 2, 3] },
  { args: [[1, [2, [3]]]], expected: [1, 2, 3] },
  { args: [[]], expected: [] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = deepFlatten(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { deepFlatten, TESTS };
