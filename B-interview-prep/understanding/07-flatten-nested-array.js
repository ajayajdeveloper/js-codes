// ╔══════════════════════════════════════════════════════════╗
//   07: Flatten A Nested Array To Arbitrary Depth       [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement flattenRecursive(arr) AND flattenIterative(arr) — each
// should flatten an arbitrarily nested array into one flat array,
// preserving order. Do not use Array.prototype.flat().
//
// Input:   flattenRecursive([1, [2, [3, [4, 5]], 6]])
// Output:  [1, 2, 3, 4, 5, 6]

// THINK BEFORE CODING ──────────────────────────────────────
// • Recursive version: for each element, if it's an array, recurse
//   into it and merge the results in; otherwise, push it directly.
//   What's the base case that stops the recursion for a given
//   element? (a non-array element)
// • `Array.isArray()` vs `typeof` — which one correctly identifies
//   arrays? (`typeof []` is `'object'`, same as a plain object)
// • Iterative version (no recursion, no `.flat()`): the natural tool
//   is an explicit STACK. If you push a sub-array's elements onto the
//   stack in their ORIGINAL order and then `pop()` from the end, do
//   you get left-to-right output order, or does it come out reversed?
//   What do you need to do differently to preserve order using
//   push/pop instead of push/shift?
// • Why would `shift()`/`unshift()` also produce correct order, and
//   what's the performance trade-off of using those instead of
//   `push()`/`pop()`? (shift/unshift are O(n) per call since they
//   re-index the whole array; push/pop are O(1))

// ── YOUR SOLUTION ──────────────────────────────────────────

function flattenRecursive(arr) {
  // your code here
}

function flattenIterative(arr) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, [2, [3, [4, 5]], 6]]], expected: [1, 2, 3, 4, 5, 6] },
  { args: [[]], expected: [] },
  { args: [[1, 2, 3]], expected: [1, 2, 3] },
  { args: [[[[[1]]]]], expected: [1] },
  { args: [[1, [], 2]], expected: [1, 2] },
];

if (require.main === module) {
  let score = 0;
  let total = 0;

  [flattenRecursive, flattenIterative].forEach((fn) => {
    TESTS.forEach(({ args, expected }, i) => {
      total++;
      const result = fn(...args);
      const ok = JSON.stringify(result) === JSON.stringify(expected);
      score += ok ? 1 : 0;
      console.log(`Test ${total} (${fn.name} ${i + 1}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
    });
  });

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

module.exports = { flattenRecursive, flattenIterative, TESTS };
