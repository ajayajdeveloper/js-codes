// ⚠️  SPOILERS — Attempt workspace/01-remove-duplicates.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Remove Duplicates
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(n) space
// For each element, scan the result array to check for inclusion.
// Array.includes() is O(n), making the overall loop O(n²).
function removeDuplicatesBrute(arr) {
  const result = [];
  for (const x of arr) {
    if (!result.includes(x)) result.push(x);
  }
  return result;
}

// ── BETTER ───────────────────────────── O(n) time   O(n) space
// Use a plain object as a "seen" hash map.
// Object property lookup is O(1) average.
function removeDuplicatesBetter(arr) {
  const seen = {};
  return arr.filter(x => {
    if (seen[x]) return false;
    return (seen[x] = true);
  });
}

// ── OPTIMAL ──────────────────────────── O(n) time   O(n) space
// Set is the canonical JS tool for uniqueness.
// Spread converts the Set back to an array in insertion order.
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Set and the plain-object approach are both O(n)/O(n).
// The difference is readability: Set is idiomatic ES6.
// The brute force hidden cost is that includes() is O(n) per call.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute:   simple, but O(n²) — fails for large inputs
// Better:  O(n) but verbose; note that object keys are stringified
//          (so 1 and "1" would collide) — use Map for mixed types
// Optimal: one line, clear intent, no type-coercion issues with Set
