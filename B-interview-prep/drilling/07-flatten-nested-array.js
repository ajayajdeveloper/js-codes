// ╔══════════════════════════════════════════════════════════╗
//   07: Flatten A Nested Array To Arbitrary Depth       [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement flattenRecursive(arr) AND flattenIterative(arr) — each
// should flatten an arbitrarily nested array into one flat array,
// preserving order. Do not use Array.prototype.flat().
//
// Input:   flattenRecursive([1, [2, [3, [4, 5]], 6]])
// Output:  [1, 2, 3, 4, 5, 6]

// ── YOUR SOLUTION ──────────────────────────────────────────

function flattenRecursive(arr) {
  // your code here
}

function flattenIterative(arr) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, [2, [3, [4, 5]], 6]]], expected: [1, 2, 3, 4, 5, 6] },
  { args: [[]], expected: [] },
  { args: [[1, 2, 3]], expected: [1, 2, 3] },
  { args: [[[[[1]]]]], expected: [1] },
  { args: [[1, [], 2]], expected: [1, 2] },
];

if (require.main === module) {
  let score = 0;
  let total = 0;

  [flattenRecursive, flattenIterative].forEach((fn) => {
    TESTS.forEach(({ args, expected }, i) => {
      total++;
      const result = fn(...args);
      const ok = JSON.stringify(result) === JSON.stringify(expected);
      score += ok ? 1 : 0;
      console.log(`Test ${total} (${fn.name} ${i + 1}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
    });
  });

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

module.exports = { flattenRecursive, flattenIterative, TESTS };
