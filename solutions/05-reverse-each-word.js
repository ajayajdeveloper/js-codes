// ⚠️  SPOILERS — Attempt workspace/05-reverse-each-word.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Reverse Each Word
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n) time  O(n) space
// Manual character reversal without using Array.reverse().
function reverseEachWordBrute(str) {
  return str.split(' ').map(word => {
    let reversed = '';
    for (let i = word.length - 1; i >= 0; i--) reversed += word[i];
    return reversed;
  }).join(' ');
}

// ── BETTER ───────────────────────────── O(n) time  O(n) space
// Using split/reverse/join on each word.
// [...word] handles Unicode characters safely (vs word.split(''))
function reverseEachWordBetter(str) {
  return str.split(' ').map(word => word.split('').reverse().join('')).join(' ');
}

// ── OPTIMAL (idiomatic) ──────────────── O(n) time  O(n) space
// Spread handles multi-byte Unicode chars; rest is clean chain.
function reverseEachWord(str) {
  return str.split(' ').map(w => [...w].reverse().join('')).join(' ');
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// All three approaches are O(n) — the "optimal" label here means
// most idiomatic ES6, not asymptotically superior.
// [...w] vs w.split('') matters for emoji/surrogate pairs:
//   '😊'.split('')  → ['\uD83D', '\uDE0A']  (splits the surrogate pair)
//   [...'😊']       → ['😊']               (correct single char)
