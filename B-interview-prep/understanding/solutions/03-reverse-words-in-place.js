// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/03-reverse-words-in-place.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Reverse The Words In A Sentence
// ════════════════════════════════════════════════════════════

// ── OPTIMAL (THE "IN-PLACE" TRICK): CHAR ARRAY DOUBLE-REVERSE ──
// O(n) time  O(n) space (a mutable copy is unavoidable in JS, since
// strings can't be mutated — but the ALGORITHM is the same one you'd
// use in-place on a real char array in C/Java/etc.)
// Step 1: reverse the ENTIRE character array.
// Step 2: walk it once more, and every time you hit a space (or the
// end), reverse just the run of characters since the last boundary —
// that puts each word's own letters back in order while leaving the
// overall word ORDER reversed from step 1.
function reverseWords(sentence) {
  const chars = sentence.trim().replace(/\s+/g, ' ').split('');
  const n = chars.length;

  reverseRange(chars, 0, n - 1);

  let start = 0;
  for (let i = 0; i <= n; i++) {
    if (i === n || chars[i] === ' ') {
      reverseRange(chars, start, i - 1);
      start = i + 1;
    }
  }

  return chars.join('');
}

function reverseRange(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}

// ── ALTERNATIVE: SPLIT, REVERSE, JOIN ───────── O(n) time  O(n) space
// The idiomatic JS one-liner. `split(/\s+/)` after `.trim()` collapses
// any run of whitespace into a single delimiter, so `filter(Boolean)`
// isn't even needed — there are no empty-string entries left to drop.
function reverseWordsSimple(sentence) {
  return sentence.trim().split(/\s+/).join(' ').split(' ').reverse().join(' ');
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// "Reverse the whole thing, then reverse each piece back" is a
// general trick for reordering chunks without extra bookkeeping
// arrays — it shows up again in problems like rotating an array by k.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Double-reverse:  demonstrates the in-place algorithm interviewers
//                  are often actually testing for; more code, but
//                  the "impressive" answer.
// Split/reverse:   trivial to write correctly under pressure; the
//                  answer to reach for when the goal is just working
//                  code fast.

module.exports = { reverseWords, reverseWordsSimple };
