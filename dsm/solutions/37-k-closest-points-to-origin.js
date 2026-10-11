// ⚠️  SPOILERS — Attempt workspace/37-k-closest-points-to-origin.js first!
// ════════════════════════════════════════════════════════════
//  Solution: K Closest Points to Origin
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Compute squared distance for every point, sort ascending, take
// the first k. Simple and correct, but sorts the entire array
// when we only need the smallest k.
function kClosestBrute(points, k) {
  const distSq = ([x, y]) => x * x + y * y;
  return [...points]
    .sort((a, b) => distSq(a) - distSq(b))
    .slice(0, k);
}

// ── BETTER ───────────────────────────── O(n) average time  O(n) space
// Quickselect: partition around a pivot distance so that the k
// smallest distances end up in the first k positions, without
// fully sorting the rest. Same idea as Quickselect for the k-th
// smallest element, applied to squared distance as the key.
function kClosestBetter(points, k) {
  const pts = [...points];
  const distSq = ([x, y]) => x * x + y * y;

  const partition = (lo, hi) => {
    const pivot = distSq(pts[hi]);
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (distSq(pts[j]) <= pivot) {
        [pts[i], pts[j]] = [pts[j], pts[i]];
        i++;
      }
    }
    [pts[i], pts[hi]] = [pts[hi], pts[i]];
    return i;
  };

  let lo = 0, hi = pts.length - 1;
  while (lo < hi) {
    const p = partition(lo, hi);
    if (p === k - 1) break;
    else if (p < k - 1) lo = p + 1;
    else hi = p - 1;
  }

  return pts.slice(0, k);
}

// ── OPTIMAL ──────────────────────────── O(n log k) time  O(k) space
// Maintain a max-heap of size k (simulated with a sorted array,
// since JS has no built-in heap). Every point is compared against
// the heap's current farthest point; only points closer than that
// get in, keeping the heap capped at k entries at all times.
function kClosest(points, k) {
  const distSq = ([x, y]) => x * x + y * y;

  // heap: array of points, kept sorted DESCENDING by distance
  // so heap[0] is always the farthest point currently kept.
  const heap = [];

  for (const point of points) {
    if (heap.length < k) {
      heap.push(point);
      heap.sort((a, b) => distSq(b) - distSq(a));
    } else if (distSq(point) < distSq(heap[0])) {
      heap[0] = point;
      heap.sort((a, b) => distSq(b) - distSq(a));
    }
  }

  return heap;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// You never need the true distance — comparing x² + y² preserves
// the same ordering as sqrt(x² + y²) and avoids floating point
// entirely. A max-heap of size k only needs to know its WORST
// member to decide whether a new point is worth admitting, which
// is why max-heap (not min-heap) is the right structure here even
// though we want the smallest distances overall.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Full sort:    O(n log n), easiest to write, sorts more than needed.
// Quickselect:  O(n) average (O(n²) worst case), no extra output
//   ordering guarantee — good when you don't need the k results sorted.
// Max-heap of k: O(n log k), never holds more than k elements in
//   memory — best when k is much smaller than n and a real heap is available.
