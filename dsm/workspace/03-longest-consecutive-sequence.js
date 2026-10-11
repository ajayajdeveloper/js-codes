// ╔══════════════════════════════════════════════════════════╗
//   Problem 3: Longest Consecutive Sequence         [Medium]  [Array/HashSet]
//   node coach.js problem 3  → guiding questions
//   node coach.js hint 3 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an unsorted array of integers, return the length of the
// longest run of consecutive integers (they don't need to be
// consecutive in the array — just consecutive in VALUE).
// Must run in O(n) time.
//
// Input:   [100, 4, 200, 1, 3, 2]
// Output:  4        (the sequence 1, 2, 3, 4)
//
// Input:   [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]  → 9  (0..8)

// THINK BEFORE CODING ──────────────────────────────────────
// • Sorting first gives an easy O(n log n) solution — but the
//   requirement is O(n). What data structure gives O(1) lookups?
// • Put every number in a Set. For a number `n` to be the START
//   of a sequence, what must be true about `n - 1`?
// • If `n - 1` is NOT in the set, `n` starts a new sequence —
//   count upward (n+1, n+2, ...) while each is present.
// • Why does only counting from "sequence starts" keep this O(n)
//   overall, instead of O(n) per number?

// ── YOUR SOLUTION ──────────────────────────────────────────

function longestConsecutive(nums) {
  let numSet = new Set(nums);
  numSet = nums.forEach(num => numSet.add(num));
  for(let i = 0; i < nums.length; i++) {
    if( numsSet[i +1] - numsSet[i] ) {
      longest++;
    } else {
      longest = 0;
    }
  }
  return longest;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[100, 4, 200, 1, 3, 2]], expected: 4 },
  { args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9 },
  { args: [[]], expected: 0 },
  { args: [[5]], expected: 1 },
  { args: [[1, 2, 0, 1]], expected: 3 },
  { args: [[-1, -2, -3, 0]], expected: 4 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = longestConsecutive(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { longestConsecutive, TESTS };
