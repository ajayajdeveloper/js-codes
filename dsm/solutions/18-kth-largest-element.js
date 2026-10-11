// ⚠️  SPOILERS — Attempt workspace/18-kth-largest-element.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Kth Largest Element in an Array
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Sort descending, index k - 1. Simple, but sorts the WHOLE array
// even though we only need one position's worth of ordering.
function findKthLargestBrute(nums, k) {
  const sorted = [...nums].sort((a, b) => b - a);
  return sorted[k - 1];
}

// ── BETTER ───────────────────────────── O(n log k) time  O(k) space
// Maintain a min-heap capped at size k. Anything smaller than the
// heap's smallest element can never be the kth largest, so it's
// safe to discard without ever fully sorting the array.
function heapPush(heap, val) {
  heap.push(val);
  let i = heap.length - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    if (heap[parent] <= heap[i]) break;
    [heap[parent], heap[i]] = [heap[i], heap[parent]];
    i = parent;
  }
}
function heapPop(heap) {
  const top = heap[0];
  const last = heap.pop();
  if (heap.length) {
    heap[0] = last;
    let i = 0;
    while (true) {
      const l = 2 * i + 1, r = 2 * i + 2;
      let smallest = i;
      if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
      if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
      if (smallest === i) break;
      [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
      i = smallest;
    }
  }
  return top;
}
function findKthLargestBetter(nums, k) {
  const heap = []; // min-heap, capped at size k
  for (const num of nums) {
    if (heap.length < k) {
      heapPush(heap, num);
    } else if (num > heap[0]) {
      heapPop(heap);
      heapPush(heap, num);
    }
  }
  return heap[0];
}

// ── OPTIMAL ──────────────────────────── O(n) average time  O(1) extra space
// Quickselect: partition (Lomuto scheme, random pivot) like quicksort,
// but only recurse into the ONE side that contains the target index.
// The kth largest in ascending order sits at index (n - k).
function swap(arr, i, j) { [arr[i], arr[j]] = [arr[j], arr[i]]; }

function partition(arr, left, right) {
  const randomIdx = left + Math.floor(Math.random() * (right - left + 1));
  swap(arr, randomIdx, right); // move random pivot to the end
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      swap(arr, i, j);
      i++;
    }
  }
  swap(arr, i, right); // pivot lands at its final sorted index i
  return i;
}

function findKthLargest(nums, k) {
  const arr = [...nums]; // avoid mutating caller's array
  const targetIdx = arr.length - k; // kth largest == (n-k)th smallest, 0-based
  let left = 0;
  let right = arr.length - 1;

  while (true) {
    const pivotIdx = partition(arr, left, right);
    if (pivotIdx === targetIdx) return arr[pivotIdx];
    if (pivotIdx < targetIdx) left = pivotIdx + 1;
    else right = pivotIdx - 1;
  }
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// You never need the array fully sorted — only the ONE partition
// boundary at index (n - k). Quickselect throws away the half of
// the array that can't contain that index, so on average it does
// O(n) + O(n/2) + O(n/4) + ... = O(n) work instead of O(n log n).
// A random pivot avoids the O(n²) worst case on adversarial/sorted input.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Full sort: simplest to write, O(n log n), fine for small inputs.
// Min-heap of size k: good when k is small relative to n, or when
// processing a stream where you can't hold the whole array at once.
// Quickselect: best average-case time, O(1) extra space, but worst
// case is O(n²) without randomization and it mutates order in-place.
