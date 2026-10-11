// ⚠️  SPOILERS — Attempt workspace/06-valid-anagram.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Valid Anagram
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Sort both strings and compare. Clean but not optimal.
function isAnagramBrute(s, t) {
  if (s.length !== t.length) return false;
  const sort = str => str.split('').sort().join('');
  return sort(s) === sort(t);
}

// ── BETTER ───────────────────────────── O(n) time  O(k) space
// Build a frequency counter for s, then decrement for t.
// If any count drops below 0, t has a character s doesn't.
function isAnagramBetter(s, t) {
  if (s.length !== t.length) return false;
  const freq = {};
  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
  for (const ch of t) {
    if (!freq[ch]) return false;
    freq[ch]--;
  }
  return true;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(k) space
// Same as better — just written more explicitly for clarity.
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const ch of s) count[ch] = (count[ch] || 0) + 1;
  for (const ch of t) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The early-exit on length mismatch is critical — don't skip it.
// The increment/decrement pattern (one counter, two loops) avoids
// building two separate frequency maps and then comparing them.
// You only need ONE map: build from s, tear down with t.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Sort:      O(n log n), 2 lines — fine in interviews if you note the cost
// Frequency: O(n), more code — preferred for large inputs or streaming
