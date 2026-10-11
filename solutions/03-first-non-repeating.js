// ⚠️  SPOILERS — Attempt workspace/03-first-non-repeating.js first!
// ════════════════════════════════════════════════════════════
//  Solution: First Non-Repeating Character
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(1) space
// For each character, check if indexOf equals lastIndexOf.
// Both calls scan the whole string → O(n) each → O(n²) total.
function firstNonRepeatingBrute(str) {
  for (const ch of str) {
    if (str.indexOf(ch) === str.lastIndexOf(ch)) return ch;
  }
  return null;
}

// ── BETTER ───────────────────────────── O(n) time  O(k) space
// Two passes with a plain object. First build the count,
// then re-scan the original string to preserve order.
function firstNonRepeatingBetter(str) {
  const freq = {};
  for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;
  for (const ch of str) {
    if (freq[ch] === 1) return ch;
  }
  return null;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(k) space
// Use Map instead of plain object. Map preserves insertion order,
// so you can iterate it directly without re-scanning the string.
function firstNonRepeating(str) {
  const map = new Map();
  for (const ch of str) map.set(ch, (map.get(ch) || 0) + 1);
  for (const [ch, count] of map) {
    if (count === 1) return ch;
  }
  return null;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Map guarantees insertion order — its iteration order matches
// the order characters first appeared in the string.
// Plain object keys are also insertion-ordered in modern JS
// (for non-integer keys), but Map makes this explicit and reliable.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute:   no extra space, but O(n²) — unusable at scale
// Better:  O(n)/O(k) but scans original string twice
// Optimal: O(n)/O(k), iterates Map once — same asymptotic, cleaner intent
