// ╔══════════════════════════════════════════════════════════╗
//   Problem 9: 3Sum         [Medium]  [Array/Two Pointers]
//   node coach.js problem 9  → guiding questions
//   node coach.js hint 9 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of integers `nums`, return all UNIQUE triplets
// [a, b, c] such that a + b + c === 0. The order of triplets in
// the result, and the order within each triplet, doesn't matter —
// but no duplicate triplets allowed.
//
// Input:   [-1, 0, 1, 2, -1, -4]
// Output:  [[-1, -1, 2], [-1, 0, 1]]
//
// Input:   [0, 0, 0]        → [[0, 0, 0]]
// Input:   [0, 1, 1]        → []

// THINK BEFORE CODING ──────────────────────────────────────
// • The brute force triple-nested loop is O(n³). Can sorting the
//   array first unlock a faster approach?
// • Once sorted, fix ONE number nums[i], then use two pointers
//   (left just after i, right at the end) to find pairs that sum
//   to -nums[i] — this reduces to a two-pointer "2Sum" per i.
// • Duplicates are the tricky part: after fixing nums[i], if
//   nums[i] === nums[i-1], should you skip it? Why? Similarly,
//   after finding a valid triplet, how do you skip duplicate
//   values for left and right before moving them?
// • What early-exit is possible once nums[i] > 0 (since the array
//   is sorted and sums to 0 need at least one non-positive number)?

// ── YOUR SOLUTION ──────────────────────────────────────────

function threeSum(nums) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortTriplets = (triplets) =>
  triplets.map(t => [...t].sort((a, b) => a - b))
          .sort((a, b) => JSON.stringify(a) > JSON.stringify(b) ? 1 : -1);

const TESTS = [
  { args: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
  { args: [[0, 1, 1]], expected: [] },
  { args: [[0, 0, 0]], expected: [[0, 0, 0]] },
  { args: [[]], expected: [] },
  { args: [[1, 2]], expected: [] },
  { args: [[-2, 0, 0, 2, 2]], expected: [[-2, 0, 2]] },
];

if (require.main === module) {
  const pass = (a, b) =>
    JSON.stringify(sortTriplets(a)) === JSON.stringify(sortTriplets(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = threeSum(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { threeSum, TESTS };
