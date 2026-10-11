// ⚠️  SPOILERS — Attempt workspace/15-number-frequency.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Number Frequency Counter
// ════════════════════════════════════════════════════════════

// ── FOR...OF ─────────────────────────── O(n) time  O(k) space
// Direct and clear. Same pattern as charFrequency (Problem 4).
function numberFrequencyLoop(arr) {
  const freq = {};
  for (const x of arr) freq[x] = (freq[x] || 0) + 1;
  return freq;
}

// ── REDUCE ───────────────────────────── O(n) time  O(k) space
// Functional. Mutate accumulator (not spread) to keep O(n).
function numberFrequency(arr) {
  return arr.reduce((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;
    return acc;
  }, {});
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// This is the exact same pattern as charFrequency — just applied
// to numbers. The only difference: object keys are strings,
// so { 1: 3 } is really { "1": 3 }. In most cases this is fine,
// but use Map if you need numeric key semantics.

// ── USEFUL EXTENSIONS ────────────────────────────────────────

// Find mode (most frequent element)
function mode(arr) {
  const freq = numberFrequency(arr);
  return +Object.entries(freq).reduce((max, e) => e[1] > max[1] ? e : max)[0];
}

// Check if two arrays are permutations of each other
function arePermutations(a, b) {
  if (a.length !== b.length) return false;
  const freqA = numberFrequency(a);
  const freqB = numberFrequency(b);
  return Object.keys(freqA).every(k => freqA[k] === freqB[k]);
}
