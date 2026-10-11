// ╔════════════════════════════════════════════════════════════╗
//  01: Contains Duplicate                                [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Given an integer array, return true if any value appears at least
// twice in the array, and false if every element is distinct.
//
// Input:   containsDuplicate([1, 2, 3, 1])
// Output:  true

// THINK BEFORE CODING ───────────────────────────────────────
// • What data structure gives O(1) average lookup for "have I seen
//   this value before"?
// • You could also sort first and check neighbors — what's the
//   time/space tradeoff versus a Set?
// • Do you need to finish scanning the whole array once you find a
//   duplicate, or can you exit early?

// YOUR SOLUTION ─────────────────────────────────────────────

function containsDuplicate(nums) {
  // your code here
}

// TESTS ─────────────────────────────────────────────────────

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

module.exports = { containsDuplicate };
