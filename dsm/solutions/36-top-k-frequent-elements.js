// ⚠️  SPOILERS — Attempt workspace/36-top-k-frequent-elements.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Top K Frequent Elements
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Build a frequency map, then sort the unique keys by frequency
// descending and slice the top k. Simple, but pays a full sort
// when we only need the top k.
function topKFrequentBrute(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  return [...freq.keys()]
    .sort((a, b) => freq.get(b) - freq.get(a))
    .slice(0, k);
}

// ── BETTER ───────────────────────────── O(u·k) time  O(n) space  (u = unique values)
// Use a min-heap of size k (simulated here with an array kept
// sorted, since JS has no built-in heap). Push each unique value,
// and if the heap grows past k, evict the smallest-frequency item.
// A real binary heap would make this O(u log k) instead.
function topKFrequentBetter(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  // heap: array of [num, count], kept sorted ascending by count
  const heap = [];
  for (const [num, count] of freq) {
    heap.push([num, count]);
    heap.sort((a, b) => a[1] - b[1]);
    if (heap.length > k) heap.shift(); // evict smallest
  }

  return heap.map(([num]) => num);
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Bucket sort: frequency can never exceed nums.length, so create
// `nums.length + 1` buckets indexed by frequency. Drop each unique
// value into bucket[frequency], then walk buckets from highest
// frequency down, collecting values until we have k.
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);

  const buckets = new Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result = [];
  for (let count = buckets.length - 1; count >= 0 && result.length < k; count--) {
    for (const num of buckets[count]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Frequency is bounded by array length — that bound is what makes
// bucket sort O(n) instead of O(n log n). Instead of sorting values
// by frequency, index directly INTO an array of frequencies and
// walk it from the top down.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Full sort:    O(n log n), simplest to write and explain.
// Heap of size k: O(n log k) — better when k is small relative to n,
//   though JS's lack of a built-in heap makes this fiddly to implement cleanly.
// Bucket sort:  O(n), optimal — relies on frequency being bounded
//   by n, which is always true here.
