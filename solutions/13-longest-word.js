// ⚠️  SPOILERS — Attempt workspace/13-longest-word.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Longest Word
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Sort by length descending, return first element.
// Sorts all words even though we only need the maximum.
function longestWordBrute(str) {
  return str.split(' ').sort((a, b) => b.length - a.length)[0] ?? '';
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// reduce tracks running maximum with a single scan.
// ">" (not ">=") means the FIRST word wins on ties.
function longestWord(str) {
  return str.split(' ').reduce((max, w) => w.length > max.length ? w : max);
}

// ── FOR...OF VARIANT ─────────────────── O(n) time  O(n) space
function longestWordLoop(str) {
  let max = '';
  for (const w of str.split(' ')) {
    if (w.length > max.length) max = w;
  }
  return max;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// reduce(fn) with no initial value starts with the first element
// as the accumulator and the second element as the current value.
// This is the standard "running max/min" reduce pattern.
// The comparison operator choice (> vs >=) determines tie behaviour.

// ── RETURN ALL TIED LONGEST WORDS ─────────────────────────────
function allLongestWords(str) {
  const words = str.split(' ');
  const maxLen = Math.max(...words.map(w => w.length));
  return words.filter(w => w.length === maxLen);
}
