// ⚠️  SPOILERS — Attempt workspace/04-char-frequency.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Character Frequency Counter
// ════════════════════════════════════════════════════════════

// ── FOR...OF LOOP ─────────────────────── O(n) time  O(k) space
// Most readable. Direct mutation of the accumulator.
function charFrequencyLoop(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  return freq;
}

// ── REDUCE (MUTATING ACCUMULATOR) ────── O(n) time  O(k) space
// Functional style. Mutating the accumulator (not spreading)
// keeps it O(n) — spreading would make it O(n²).
function charFrequencyReduce(str) {
  return str.split('').reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});
}

// ── CANONICAL / PREFERRED ────────────── O(n) time  O(k) space
// Same as loop — for...of on a string is cleaner than split('').
function charFrequency(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  return freq;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// DO NOT use spread inside reduce:
//   str.split('').reduce((acc, ch) => ({ ...acc, [ch]: ... }), {})
// This is O(n²) because each {...acc} copies the entire object.
// Always mutate the accumulator in reduce when building an object.

// ── BONUS: find most frequent character ──────────────────────
function mostFrequent(str) {
  const freq = charFrequency(str);
  return Object.entries(freq).reduce((max, entry) =>
    entry[1] > max[1] ? entry : max
  )[0];
}
