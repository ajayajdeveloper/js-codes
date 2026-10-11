// ╔══════════════════════════════════════════════════════════╗
//   Problem 12: Next Greater Element         [Medium]  [Stack/Monotonic]
//   node coach.js problem 12  → guiding questions
//   node coach.js hint 12 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers, for each element find the next
// element to its right that is greater than it. If none exists,
// use -1. Return the results as an array (same length as input).
//
// Input:   [2,1,2,4,3]
// Output:  [4,2,4,-1,-1]
//
// Input:   [4,3,2,1]   → [-1,-1,-1,-1]
// Input:   [1,2,3,4]   → [2,3,4,-1]

// THINK BEFORE CODING ──────────────────────────────────────
// • This is Problem 11 (Daily Temperatures) but returning the
//   VALUE instead of the day-distance. Can you reuse the idea?
// • A monotonic decreasing stack of INDICES (or values) still
//   works — what changes is what you store in the result when
//   you pop.
// • What do unmatched (never-popped) stack entries mean at the
//   end of the loop?
// • Careful with duplicate values — [2,1,2,4,3]: the first 2's
//   next greater is 4, not the second 2.

// ── YOUR SOLUTION ──────────────────────────────────────────

function nextGreaterElement(nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[2,1,2,4,3]], expected: [4,2,4,-1,-1] },
  { args: [[4,3,2,1]], expected: [-1,-1,-1,-1] },
  { args: [[1,2,3,4]], expected: [2,3,4,-1] },
  { args: [[]], expected: [] },
  { args: [[5]], expected: [-1] },
  { args: [[1,1,1]], expected: [-1,-1,-1] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = nextGreaterElement(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { nextGreaterElement, TESTS };
