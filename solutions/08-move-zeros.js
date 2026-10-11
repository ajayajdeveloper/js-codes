// ⚠️  SPOILERS — Attempt workspace/08-move-zeros.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Move Zeros To End
// ════════════════════════════════════════════════════════════

// ── SIMPLE (new array) ────────────────── O(n) time  O(n) space
// Filter non-zeros, count zeros, concat.
// Clean, functional — but allocates a new array.
function moveZerosToEndSimple(arr) {
  const nonZeros = arr.filter(x => x !== 0);
  const zeroCount = arr.length - nonZeros.length;
  return [...nonZeros, ...Array(zeroCount).fill(0)];
}

// ── OPTIMAL (in-place) ────────────────── O(n) time  O(1) space
// Write pointer: scan with i, write non-zeros at write position.
// Then fill the tail with zeros.
// The write pointer is always ≤ i, so no overwrite of unread values.
function moveZerosToEnd(arr) {
  let write = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) arr[write++] = arr[i];
  }
  while (write < arr.length) arr[write++] = 0;
  return arr;
}

// ── TWO-POINTER SWAP VARIANT ─────────── O(n) time  O(1) space
// Maintain a pointer to the first zero. When a non-zero is found
// at i > zeroIdx, swap them and advance zeroIdx.
function moveZerosToEndSwap(arr) {
  let zeroIdx = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0 && i > zeroIdx) {
      [arr[i], arr[zeroIdx]] = [arr[zeroIdx], arr[i]];
    }
    if (arr[zeroIdx] !== 0) zeroIdx++;
  }
  return arr;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The write-pointer approach separates "reading" (i) from
// "writing" (write). This pattern appears in many in-place
// problems: remove element, compact array, partition.
// "Two pointers" is the general category; write pointer is a variant.
