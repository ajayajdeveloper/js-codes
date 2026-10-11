// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/04-first-non-repeating-char.js first!
// ════════════════════════════════════════════════════════════
//  Solution: First Non-Repeating Character In A String
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: TWO-PASS FREQUENCY MAP ─────────── O(n) time  O(n) space
// Pass 1 counts every character. Pass 2 re-walks the ORIGINAL string
// (not the map's keys) so the "first" in "first non-repeating" is
// judged by the string's own order, not by whatever order the map
// happens to iterate in.
function firstNonRepeatingChar(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of str) if (counts[ch] === 1) return ch;
  return null;
}

// ── ALTERNATIVE: indexOf / lastIndexOf ──────── O(n²) time  O(1) space
// For each character, check whether its first and last occurrence in
// the string are the same index — if so, it never repeats. No extra
// map needed, but indexOf/lastIndexOf each scan the string, so this
// degrades to quadratic time on long strings.
function firstNonRepeatingCharBruteForce(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) return str[i];
  }
  return null;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// You cannot know whether a character is "non-repeating" from a
// single left-to-right pass alone — a character seen once so far
// might repeat three characters later. The frequency map defers that
// judgment until the full string has been seen, then a second,
// order-preserving pass reads off the answer.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Frequency map:  O(n) time, needs O(n) extra space for the map —
//                 the answer to reach for by default.
// indexOf pair:   no extra data structure, but O(n²) time — only
//                 reasonable to mention as the "obvious but slow"
//                 baseline.

module.exports = { firstNonRepeatingChar, firstNonRepeatingCharBruteForce };
