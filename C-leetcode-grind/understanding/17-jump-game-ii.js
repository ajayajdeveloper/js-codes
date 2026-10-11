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

// THINK BEFORE CODING ───────────────────────────────────────
// • Think in "levels," like BFS: from your current jump, how far
//   could you possibly reach without taking another jump — call that
//   currentEnd. Separately track farthest, the best reach you could
//   get to from ANY index visited so far in this level.
// • As you scan i from 0 to n-2, update farthest = max(farthest,
//   i + nums[i]) at every index — you're considering every jump
//   option available in the current level before committing.
// • When i reaches currentEnd, you've exhausted this level and must
//   jump — increment your jump count and set currentEnd = farthest.
//   Why is it safe to stop the loop at i < nums.length - 1 instead
//   of scanning all the way to the last index?

// YOUR SOLUTION ─────────────────────────────────────────────

function jump(nums) {
  // your code here
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

module.exports = { jump };
