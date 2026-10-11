// ╔══════════════════════════════════════════════════════════╗
//   Problem 2: Find Duplicates    [Easy]  [Array/Frequency]
//   node coach.js problem 2   → guiding questions
//   node coach.js hint 2 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array, return a new array containing only the
// values that appear more than once.
//
// Input:   [1, 2, 3, 2, 4, 5, 4]
// Output:  [2, 4]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What information must you track per element?
// • Should the output contain one copy or all copies of a duplicate?
// • Can you do this in a single pass?

// ── YOUR SOLUTION ──────────────────────────────────────────

function findDuplicates(arr) {

  let seen = new Set();
  let duplicates = new Set();

  for(let i = 0; i < arr.length; i++){
    if(seen.has(arr[i])){
      duplicates.add(arr[i]);
    } else {
      seen.add(arr[i]);
    }
  }
  return [...duplicates];
 
  // ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
    // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 2, 4, 5, 4]],  expected: [2, 4] },
  { args: [[1, 2, 3]],               expected: [] },
  { args: [[1, 1, 1]],               expected: [1] },
  { args: [[]],                       expected: [] },
  { args: [[5, 3, 5, 3, 5]],        expected: [5, 3] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = findDuplicates(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { findDuplicates, TESTS };
