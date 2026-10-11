// ⚠️  SPOILERS — Attempt workspace/11-unique-words.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Unique Words
// ════════════════════════════════════════════════════════════

// ── MANUAL (frequency object) ─────────── O(n) time  O(n) space
// Same as Problem 1 but operating on words instead of chars.
function uniqueWordsBrute(str) {
  const words = str.split(' ');
  const seen = {};
  const result = [];
  for (const w of words) {
    if (!seen[w]) { seen[w] = true; result.push(w); }
  }
  return result;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Problem 1 applied directly after split.
// Set preserves insertion order, so first-occurrence order is maintained.
function uniqueWords(str) {
  return [...new Set(str.split(' '))];
}

// ── CASE-INSENSITIVE VARIANT ──────────────────────────────────
function uniqueWordsCI(str) {
  return [...new Set(str.toLowerCase().split(' '))];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// This is Problem 1 (Remove Duplicates) composed with str.split(' ').
// Recognising this pattern — "array problem on derived array" —
// is a key interview skill. Always ask: what is the actual array here?
