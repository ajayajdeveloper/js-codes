// ╔══════════════════════════════════════════════════════════╗
//   Problem 36: Top K Frequent Elements   [Medium]  [Heap/Bucket Sort]
//   node coach.js problem 36  → guiding questions
//   node coach.js hint 36 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an integer array `nums` and an integer `k`, return the
// k most frequent elements. Order within the result doesn't matter.
//
// Input:   nums = [1,1,1,2,2,3], k = 2
// Output:  [1,2]
//
// Input:   nums = [1], k = 1        → [1]
// Input:   nums = [4,4,4,6,6,7], k = 1  → [4]

// THINK BEFORE CODING ──────────────────────────────────────
// • Step 1 is always the same: build a frequency map of each
//   value (Problem 4-style counting).
// • Naive: sort all unique values by frequency descending, take
//   the top k. What's the time complexity of that sort?
// • Better/optimal: can you avoid sorting entirely? Think about
//   "bucket sort" — an array where index = frequency, and each
//   bucket holds all values with that frequency. Frequencies are
//   bounded by nums.length, so there are only n possible buckets.
// • Once buckets are built, which direction do you scan them in
//   to grab the k most frequent first?
// • Test cases should avoid ties exactly AT the k-th cutoff, since
//   which value wins a tie is otherwise ambiguous.

// ── YOUR SOLUTION ──────────────────────────────────────────

function topKFrequent(nums, k) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortArr = (arr) => Array.isArray(arr) ? [...arr].sort((a, b) => a - b) : arr;

const TESTS = [
  {
    args: [[1, 1, 1, 2, 2, 3], 2],
    expected: [1, 2],
  },
  {
    args: [[1], 1],
    expected: [1],
  },
  {
    args: [[4, 4, 4, 6, 6, 7], 1],
    expected: [4],
  },
  {
    args: [[5, 3, 5, 3, 5, 8, 8, 8, 8, 9], 3],
    expected: [8, 5, 3],
  },
  {
    args: [[1, 2, 3, 4, 5], 5],
    expected: [1, 2, 3, 4, 5],
  },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(sortArr(a)) === JSON.stringify(sortArr(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = topKFrequent(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { topKFrequent, TESTS };
