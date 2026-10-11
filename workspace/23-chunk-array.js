// ╔══════════════════════════════════════════════════════════╗
//   Problem 23: Chunk Array            [Easy-Med]  [Array]
//   node coach.js problem 23  → guiding questions
//   node coach.js hint 23 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Split an array into groups of at most size n.
// The last chunk may be smaller if there aren't enough elements.
//
// Input:   [1, 2, 3, 4, 5],  size = 2
// Output:  [[1, 2], [3, 4], [5]]
//
// Input:   [1, 2, 3, 4, 5, 6],  size = 3
// Output:  [[1, 2, 3], [4, 5, 6]]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • How do you slice an array from index i to i+size?
// • What is your loop increment? (hint: not 1)
// • What happens on the last iteration when i+size > arr.length?
//   Does Array.slice handle that gracefully?
// • Can you solve it with arr.reduce() as a one-liner?

// ── YOUR SOLUTION ──────────────────────────────────────────

function chunkArray(arr, size) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 4, 5], 2],       expected: [[1, 2], [3, 4], [5]] },
  { args: [[1, 2, 3, 4, 5, 6], 3],    expected: [[1, 2, 3], [4, 5, 6]] },
  { args: [[1, 2, 3], 1],             expected: [[1], [2], [3]] },
  { args: [[1, 2, 3], 5],             expected: [[1, 2, 3]] },
  { args: [[], 2],                    expected: [] },
  { args: [[1], 1],                   expected: [[1]] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = chunkArray(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { chunkArray, TESTS };
