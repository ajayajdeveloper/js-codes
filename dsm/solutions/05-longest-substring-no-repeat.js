// ⚠️  SPOILERS — Attempt workspace/05-longest-substring-no-repeat.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Longest Substring Without Repeating Characters
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n³) time  O(min(n,k)) space
// Check every substring for uniqueness.
function lengthOfLongestSubstringBrute(s) {
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j <= s.length; j++) {
      const sub = s.slice(i, j);
      if (new Set(sub).size === sub.length) {
        best = Math.max(best, sub.length);
      }
    }
  }
  return best;
}

// ── BETTER ───────────────────────────── O(n) time  O(min(n,k)) space
// Sliding window with a Set: expand right, and while there's a
// duplicate, shrink from the left one character at a time.
function lengthOfLongestSubstringBetter(s) {
  const seen = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(min(n,k)) space
// Sliding window with a Map of last-seen index — jump `left`
// directly past the duplicate instead of stepping one at a time.
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1;
    }
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The Map-of-last-index trick avoids the inner while loop entirely:
// each character is visited exactly once by the outer loop, giving
// a clean single-pass O(n). The `>= left` guard matters — without
// it, a stale index from outside the current window would wrongly
// yank `left` forward.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: O(n³), only useful to demonstrate you understand the
// naive approach before optimizing.
// Set + shrink loop: O(n) amortized, intuitive to explain out loud.
// Map + last index: O(n) strict single pass, the tightest version.
