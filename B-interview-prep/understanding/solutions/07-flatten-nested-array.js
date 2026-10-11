// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/07-flatten-nested-array.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Flatten A Nested Array To Arbitrary Depth
// ════════════════════════════════════════════════════════════

// ── RECURSIVE ────────────────────────────────── O(n) time  O(depth) call-stack space
// For each element: if it's an array, recurse and concat the (already
// flat) result in; otherwise concat the element itself. `concat`
// happily accepts either a single value or an array, which is what
// keeps this a one-liner per element.
function flattenRecursive(arr) {
  return arr.reduce(
    (flat, item) => flat.concat(Array.isArray(item) ? flattenRecursive(item) : item),
    []
  );
}

// ── ITERATIVE ────────────────────────────────── O(n) time  O(n) space
// A stack-based simulation of the recursion, with no call stack of
// its own. The trick to preserving left-to-right ORDER with a
// push/pop (LIFO) stack: reverse the input once up front, and when a
// popped item is itself an array, push ITS elements in reverse order
// too. That way, whatever comes out of `pop()` next is always the
// next element in the original left-to-right sequence.
function flattenIterative(arr) {
  const stack = [...arr].reverse();
  const result = [];

  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) stack.push(item[i]);
    } else {
      result.push(item);
    }
  }

  return result;
}

// ── ALTERNATIVE ITERATIVE: shift/unshift QUEUE ──────────────
// Conceptually simpler — no reversing needed, since a FIFO queue
// naturally processes items in order — but `shift()`/`unshift()` are
// O(n) per call (the whole array re-indexes), making this slower on
// large or deeply nested inputs than the push/pop version above.
function flattenIterativeQueue(arr) {
  const queue = [...arr];
  const result = [];

  while (queue.length) {
    const item = queue.shift();
    if (Array.isArray(item)) queue.unshift(...item);
    else result.push(item);
  }

  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Recursion and an explicit stack are two ways of expressing the same
// depth-first traversal — a stack-based loop is just recursion with
// the call stack made visible and manually managed. The one subtlety
// with a LIFO stack is that you must pre-reverse to keep output order
// matching the original left-to-right sequence.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Recursive:        shortest, most readable; risks a stack overflow
//                   on VERY deeply nested input (thousands of levels).
// Iterative (stack): no recursion-depth limit; the reverse-then-pop
//                    trick is the part worth internalizing.
// Iterative (queue): simplest to reason about, but O(n) shift/unshift
//                    calls make it the slowest of the three.

module.exports = { flattenRecursive, flattenIterative, flattenIterativeQueue };
