// ╔══════════════════════════════════════════════════════════╗
//   Problem 37: K Closest Points to Origin   [Medium]  [Heap/Sort]
//   node coach.js problem 37  → guiding questions
//   node coach.js hint 37 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of points [x,y] on a 2D plane and an integer k,
// return the k points closest to the origin (0,0). Distance is
// Euclidean — but you never need the actual sqrt, since comparing
// squared distances gives the same ordering. Order of the result
// doesn't matter.
//
// Input:   points = [[1,3],[-2,2]], k = 1
// Output:  [[-2,2]]     (dist² = 8 vs 10 for [1,3])
//
// Input:   points = [[3,3],[5,-1],[-2,4]], k = 2
// Output:  [[3,3],[-2,4]]

// THINK BEFORE CODING ──────────────────────────────────────
// • Distance² = x*x + y*y. Never call Math.sqrt — it's monotonic,
//   so comparing squared distances preserves the ordering and
//   avoids floating point rounding issues.
// • Naive: compute distance for every point, sort ascending, slice
//   the first k. What's the time complexity?
// • Optimal: maintain a MAX-heap of size k. For each point, if
//   the heap has fewer than k points, add it. Otherwise, compare
//   against the heap's current farthest point — if this point is
//   closer, evict the farthest and insert this one.
// • Why a MAX-heap (not min) when you want the k SMALLEST distances?
//   (Hint: you want fast access to the worst of your k best so far.)
// • Choose test points where the k-th boundary is unambiguous —
//   no ties in squared distance right at the cutoff.

// ── YOUR SOLUTION ──────────────────────────────────────────

function kClosest(points, k) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortPoints = (pts) =>
  Array.isArray(pts)
    ? pts.map(p => [...p]).sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]))
    : pts;

const TESTS = [
  {
    args: [[[1, 3], [-2, 2]], 1],
    expected: [[-2, 2]],
  },
  {
    args: [[[3, 3], [5, -1], [-2, 4]], 2],
    expected: [[3, 3], [-2, 4]],
  },
  {
    args: [[[0, 0]], 1],
    expected: [[0, 0]],
  },
  {
    args: [[[1, 1], [2, 2], [3, 3]], 3],
    expected: [[1, 1], [2, 2], [3, 3]],
  },
  {
    args: [[[1, 0], [10, 10], [-1, 0], [2, 2]], 2],
    expected: [[1, 0], [-1, 0]],
  },
];

if (require.main === module) {
  const pass = (a, b) =>
    JSON.stringify(sortPoints(a)) === JSON.stringify(sortPoints(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = kClosest(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { kClosest, TESTS };
