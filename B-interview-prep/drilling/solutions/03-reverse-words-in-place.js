// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/03-reverse-words-in-place.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Reverse The Words In A Sentence
// ════════════════════════════════════════════════════════════

// O(n) time  O(n) space
// filter(Boolean) drops the empty strings that split(/\s+/) produces
// when the sentence has leading/trailing/repeated whitespace.
function reverseWords(sentence) {
  return sentence.trim().split(/\s+/).filter(Boolean).reverse().join(' ');
}

module.exports = { reverseWords };
