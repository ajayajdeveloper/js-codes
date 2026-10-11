// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/07-flatten-nested-array.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Flatten A Nested Array To Arbitrary Depth
// ════════════════════════════════════════════════════════════

// flattenRecursive:  O(n) time  O(depth) call-stack space
// flattenIterative:  O(n) time  O(n) space
function flattenRecursive(arr) {
  return arr.reduce(
    (flat, item) => flat.concat(Array.isArray(item) ? flattenRecursive(item) : item),
    []
  );
}

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

module.exports = { flattenRecursive, flattenIterative };
