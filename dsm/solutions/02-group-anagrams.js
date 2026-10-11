// ⚠️  SPOILERS — Attempt workspace/02-group-anagrams.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Group Anagrams
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n² · k) time  O(n·k) space
// Compare each word against a representative of every existing group.
function groupAnagramsBrute(words) {
  const groups = [];
  for (const word of words) {
    const sorted = word.split('').sort().join('');
    const group = groups.find(g => g.key === sorted);
    if (group) group.items.push(word);
    else groups.push({ key: sorted, items: [word] });
  }
  return groups.map(g => g.items);
}

// ── OPTIMAL ──────────────────────────── O(n · k log k) time  O(n · k) space
// Use a Map keyed by the sorted-letters signature of each word.
function groupAnagrams(words) {
  const map = new Map();
  for (const word of words) {
    const key = word.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(word);
  }
  return [...map.values()];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A Map gives O(1) average lookup for "does this key already exist,"
// turning the brute force's linear scan through existing groups into
// a constant-time check. The sorted string is a canonical form that
// all anagrams of each other share.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: readable but re-scans all groups per word — O(n²).
// Map + sort key: O(n · k log k), the standard interview answer.
// A char-count signature (26 letters) can drop the key build to O(k),
// giving O(n · k) overall — worth mentioning as a follow-up optimization.
