// ⚠️  SPOILERS — Attempt workspace/10-group-by-type.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Group By Type
// ════════════════════════════════════════════════════════════

// ── FOR...OF ─────────────────────────── O(n) time  O(n) space
// Explicit and easy to follow.
function groupByTypeLoop(arr) {
  const groups = {};
  for (const x of arr) {
    const key = typeof x;
    if (!groups[key]) groups[key] = [];
    groups[key].push(x);
  }
  return groups;
}

// ── REDUCE ───────────────────────────── O(n) time  O(n) space
// Functional style. Nullish assignment (??=) available in ES2021+.
function groupByTypeReduce(arr) {
  return arr.reduce((acc, x) => {
    const key = typeof x;
    acc[key] = acc[key] || [];
    acc[key].push(x);
    return acc;
  }, {});
}

// ── CANONICAL / PREFERRED ────────────── O(n) time  O(n) space
function groupByType(arr) {
  return arr.reduce((acc, x) => {
    const key = typeof x;
    (acc[key] ??= []).push(x);
    return acc;
  }, {});
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// This is the "groupBy" pattern — one of the most useful reduce
// patterns. Generalise it:
//   const groupBy = (arr, fn) => arr.reduce((acc, x) => {
//     (acc[fn(x)] ??= []).push(x); return acc;
//   }, {});
// Object.groupBy(arr, fn) does this natively in ES2024.

// ── GENERIC VERSION ──────────────────────────────────────────
const groupBy = (arr, fn) =>
  arr.reduce((acc, x) => { (acc[fn(x)] ??= []).push(x); return acc; }, {});

// Usage: groupBy(users, u => u.role)
