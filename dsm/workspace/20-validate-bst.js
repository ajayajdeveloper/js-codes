// ╔══════════════════════════════════════════════════════════╗
//   Problem 20: Validate Binary Search Tree         [Medium]  [Tree/DFS]
//   node coach.js problem 20  → guiding questions
//   node coach.js hint 20 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given the root of a binary tree, determine if it is a valid
// binary search tree (BST). A valid BST means: for every node,
// ALL values in its left subtree are strictly less than the
// node's value, and ALL values in its right subtree are strictly
// greater — for the ENTIRE subtree, not just the immediate child.
//
// Input:   arrayToTree([5,1,4,null,null,3,6])
//              5
//             / \
//            1   4
//               / \
//              3   6
// Output:  false   (4 is 5's right child, but 4 < 5 — invalid)
//
// Input:   arrayToTree([2,1,3])   → true

// THINK BEFORE CODING ──────────────────────────────────────
// • Checking only "left child < node < right child" is NOT
//   enough — why does the example above fail that shallow check
//   but still need to return false?
// • Each node must satisfy a running (min, max) RANGE inherited
//   from all its ancestors, not just its direct parent.
// • When you recurse left, what happens to the max bound? When
//   you recurse right, what happens to the min bound?
// • BST requires STRICT inequality — what happens with duplicate
//   values (a node equal to an ancestor)?
// • What should an empty tree (null root) return?

// ── YOUR SOLUTION ──────────────────────────────────────────

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
// Builds a tree from a LeetCode-style level-order array where
// `null` marks a missing child. Uses a queue so null "holes" are
// handled correctly (not a perfect-binary-tree index formula).
function arrayToTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = new TreeNode(leftVal);
        queue.push(node.left);
      }
    }
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = new TreeNode(rightVal);
        queue.push(node.right);
      }
    }
  }
  return root;
}

function isValidBST(root) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[5,1,4,null,null,3,6]], expected: false },
  { args: [[2,1,3]], expected: true },
  { args: [[]], expected: true },
  { args: [[1]], expected: true },
  { args: [[5,4,6,null,null,3,7]], expected: false },
  { args: [[2,2,2]], expected: false },
  { args: [[10,5,15,null,null,6,20]], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const root = arrayToTree(args[0]);
    const result = isValidBST(root);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isValidBST, TreeNode, arrayToTree, TESTS };
