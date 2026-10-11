// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/05-valid-anagram.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Check If Two Strings Are Anagrams
// ════════════════════════════════════════════════════════════

// O(n log n) time  O(n) space
function isAnagram(a, b) {
  const normalize = (s) => s.toLowerCase().replace(/\s+/g, '').split('').sort().join('');
  return normalize(a) === normalize(b);
}

module.exports = { isAnagram };
