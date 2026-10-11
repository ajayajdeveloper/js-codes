// ⚠️  SPOILERS — Attempt workspace/12-array-intersection.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Array Intersection
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n*m) time  O(n) space
// For each element of b, scan a to check membership.
// Array.includes() is O(n) per call.
function arrayIntersectionBrute(a, b) {
  return [...new Set(b.filter(x => a.includes(x)))];
}

// ── OPTIMAL ──────────────────────────── O(n+m) time  O(n) space
// Convert a to a Set (O(n) build, O(1) lookup).
// Filter b using Set.has() — O(m) for the whole filter.
// Wrap result in Set to remove duplicates from b.
function arrayIntersection(a, b) {
  const setA = new Set(a);
  return [...new Set(b.filter(x => setA.has(x)))];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The bottleneck in the brute force is the O(n) includes() call
// inside a loop — making it O(n*m).
// Converting to Set makes lookup O(1), reducing total to O(n+m).
// This "Set for lookup" pattern applies to any "is X in collection Y?" problem.

// ── SET OPERATIONS CHEATSHEET ─────────────────────────────────
// Intersection (a ∩ b):  [...new Set(b.filter(x => setA.has(x)))]
// Union (a ∪ b):         [...new Set([...a, ...b])]
// Difference (a - b):    a.filter(x => !setB.has(x))
// Sym. Diff (a △ b):     [...a.filter(x=>!setB.has(x)), ...b.filter(x=>!setA.has(x))]
