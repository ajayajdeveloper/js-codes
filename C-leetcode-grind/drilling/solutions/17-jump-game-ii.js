// ⚠️  SPOILERS — Attempt C-leetcode-grind/drilling/17-jump-game-ii.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Jump Game II
// ══════════════════════════════════════════════════════════════

// O(n) time  O(1) space
function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }
  return jumps;
}

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
