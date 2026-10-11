// ╔══════════════════════════════════════════════════════════╗
//   Problem 1: Remove Duplicates          [Easy]  [Array/Set]
//   node coach.js problem 1   → guiding questions
//   node coach.js hint 1 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array, return a new array with duplicate values
// removed, preserving the original order.
//
// Input:   [1, 2, 2, 3, 4, 4, 5]
// Output:  [1, 2, 3, 4, 5]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What data structure naturally enforces uniqueness?
// • How would you solve this without any built-in helpers?
// • What is the time cost of Array.includes()?

// ── YOUR SOLUTION ──────────────────────────────────────────

function removeDuplicates(arr) {

  // ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
  // arr = [...new Set(arr)];
  // return arr;

  // ── BETTER ───────────────────────────── O(n) time  O(n) space
  const seen = new Set();
  return arr.filter(x => {
    if(seen.has(x)) return false;
    seen.add(x);
    return true;
  }); 
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 2, 3, 4, 4, 5]],       expected: [1, 2, 3, 4, 5] },
  { args: [[]],                            expected: [] },
  { args: [[1, 1, 1, 1]],                expected: [1] },
  { args: [[1, 2, 3]],                    expected: [1, 2, 3] },
  { args: [['a', 'b', 'a', 'c', 'b']],  expected: ['a', 'b', 'c'] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = removeDuplicates(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { removeDuplicates, TESTS };
