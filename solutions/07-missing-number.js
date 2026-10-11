// ⚠️  SPOILERS — Attempt workspace/07-missing-number.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Missing Number
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Sort a copy, then find where the sequence breaks.
function missingNumberBrute(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] !== i + 1) return i + 1;
  }
  return sorted.length + 1;
}

// ── BETTER ───────────────────────────── O(n) time  O(n) space
// Build a Set, then scan 1..n+1 for the absent value.
function missingNumberSet(arr) {
  const set = new Set(arr);
  for (let i = 1; i <= arr.length + 1; i++) {
    if (!set.has(i)) return i;
  }
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Gauss formula: sum of 1..n = n*(n+1)/2
// n here is arr.length + 1 (the full range before one was removed).
// Missing number = expected sum − actual sum.
function missingNumber(arr) {
  const n = arr.length + 1;
  const expected = (n * (n + 1)) / 2;
  const actual   = arr.reduce((sum, x) => sum + x, 0);
  return expected - actual;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The math trick trades O(n) space for a single arithmetic formula.
// This is a classic "expected vs actual" pattern — useful whenever
// you know what the complete set should sum/XOR to.
// XOR variant: reduce all elements XOR all of 1..n — also O(n)/O(1).

// ── XOR VARIANT (bonus) ──────────────────────────────────────
function missingNumberXOR(arr) {
  let xor = arr.length + 1;
  for (let i = 0; i < arr.length; i++) xor ^= (i + 1) ^ arr[i];
  return xor;
}
