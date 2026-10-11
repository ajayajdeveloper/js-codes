// ╔══════════════════════════════════════════════════════════╗
//   Problem 8: Container With Most Water         [Medium]  [Array/Two Pointers]
//   node coach.js problem 8  → guiding questions
//   node coach.js hint 8 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array `heights` where heights[i] is the height of a
// vertical line at position i, find two lines that, together with
// the x-axis, form a container holding the most water. Return the
// maximum area. Area between i and j = min(heights[i], heights[j])
// * (j - i).
//
// Input:   [1, 8, 6, 2, 5, 4, 8, 3, 7]
// Output:  49        (lines at index 1 (height 8) and index 8 (height 7):
//                      min(8,7) * (8-1) = 7 * 7 = 49)
//
// Input:   [1, 1]  → 1

// THINK BEFORE CODING ──────────────────────────────────────
// • The brute force checks every pair (i, j) — what's the time
//   complexity, and can you do better?
// • Start with two pointers at the far left and far right — that's
//   the WIDEST possible container. What limits its area: the
//   taller line or the shorter one?
// • If you move the pointer at the TALLER line inward, can the
//   area ever increase? If you move the SHORTER line's pointer
//   inward, why might the area increase?
// • Based on that, which pointer should you always move?

// ── YOUR SOLUTION ──────────────────────────────────────────

function maxArea(heights) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
  { args: [[1, 1]], expected: 1 },
  { args: [[4, 3, 2, 1, 4]], expected: 16 },
  { args: [[1, 2, 1]], expected: 2 },
  { args: [[1]], expected: 0 },
  { args: [[]], expected: 0 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = maxArea(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { maxArea, TESTS };
