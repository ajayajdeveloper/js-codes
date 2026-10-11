// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/05-valid-anagram.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Check If Two Strings Are Anagrams
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: FREQUENCY MAP ──────────────────── O(n) time  O(n) space
// Normalize both strings (lowercase, strip spaces). A length mismatch
// is an instant `false`. Otherwise build a count map from the first
// string, then walk the second string decrementing counts — if any
// character is missing or already at 0, they can't be anagrams.
function isAnagram(a, b) {
  const clean = (s) => s.toLowerCase().replace(/\s+/g, '');
  const s1 = clean(a);
  const s2 = clean(b);
  if (s1.length !== s2.length) return false;

  const counts = {};
  for (const ch of s1) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of s2) {
    if (!counts[ch]) return false;
    counts[ch]--;
  }
  return true;
}

// ── ALTERNATIVE: SORT AND COMPARE ───────────── O(n log n) time  O(n) space
// Normalize, split into characters, sort, join, compare. Fewer lines
// and easier to get right under pressure, but the sort makes it
// asymptotically slower than the frequency-map version.
function isAnagramBySorting(a, b) {
  const normalize = (s) => s.toLowerCase().replace(/\s+/g, '').split('').sort().join('');
  return normalize(a) === normalize(b);
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Anagram-checking is really just "do these two strings have the same
// character multiset?" — a frequency map answers that in O(n) because
// it never needs to establish an ORDER between characters the way
// sorting does.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Frequency map:  O(n) time — the answer worth reaching for when
//                 asked to optimize past the sort-based version.
// Sort + compare: O(n log n) time, but reads almost like plain
//                 English — a safe first answer under time pressure.

module.exports = { isAnagram, isAnagramBySorting };
