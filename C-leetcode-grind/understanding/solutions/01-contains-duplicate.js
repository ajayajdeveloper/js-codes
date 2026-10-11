// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/01-contains-duplicate.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Contains Duplicate
// ══════════════════════════════════════════════════════════════

// O(n) time  O(n) space
function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}

const TESTS = [
  { args: [[1, 2, 3, 1]], expected: true },
  { args: [[1, 2, 3, 4]], expected: false },
  { args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
  { args: [[]], expected: false },
  { args: [[7]], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = containsDuplicate(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { containsDuplicate, TESTS };
