// ╔════════════════════════════════════════════════════════════╗
//  15: Binary Search                                     [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Given a sorted array of distinct integers and a target, return its
// index, or -1 if it's not present. Must run in O(log n).
//
// Input:   search([-1, 0, 3, 5, 9, 12], 9)
// Output:  4

// THINK BEFORE CODING ───────────────────────────────────────
// • What's the invariant about [left, right] — does it always
//   contain the target if the target exists in the array?
// • After comparing nums[mid] to target, which half do you discard —
//   does mid itself ever need to stay in play for the next round?
// • What should left/right be initialized to, and what's the loop
//   condition that stops you from going out of bounds?

// YOUR SOLUTION ─────────────────────────────────────────────

function search(nums, target) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
  { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
  { args: [[5], 5], expected: 0 },
  { args: [[], 5], expected: -1 },
  { args: [[1, 2, 3, 4, 5], 1], expected: 0 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = search(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { search };
