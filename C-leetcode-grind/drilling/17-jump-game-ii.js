// ╔════════════════════════════════════════════════════════════╗
//  17: Jump Game II                                    [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// You start at index 0 of nums. nums[i] is the maximum number of
// steps you can jump forward from index i. Return the minimum
// number of jumps needed to reach the last index (the input is
// always such that the last index is reachable).
//
// Input:   jump([2, 3, 1, 1, 4])
// Output:  2  (index 0 -> 1 -> 4)

// YOUR SOLUTION ─────────────────────────────────────────────

function jump(nums) {
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: [[2, 3, 1, 1, 4]], expected: 2 },
  { args: [[2, 3, 0, 1, 4]], expected: 2 },
  { args: [[1]], expected: 0 },
  { args: [[1, 2]], expected: 1 },
  { args: [[1, 1, 1, 1]], expected: 3 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = jump(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { jump, TESTS };
