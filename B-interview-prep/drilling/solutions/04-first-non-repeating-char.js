// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/04-first-non-repeating-char.js first!
// ════════════════════════════════════════════════════════════
//  Solution: First Non-Repeating Character In A String
// ════════════════════════════════════════════════════════════

// O(n) time  O(n) space
function firstNonRepeatingChar(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of str) if (counts[ch] === 1) return ch;
  return null;
}

module.exports = { firstNonRepeatingChar };
