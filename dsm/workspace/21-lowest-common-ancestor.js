// ╔══════════════════════════════════════════════════════════╗
//   Problem 21: Lowest Common Ancestor of a Binary Tree         [Medium]  [Tree/DFS]
//   node coach.js problem 21  → guiding questions
//   node coach.js hint 21 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given the root of a binary tree (NOT necessarily a BST) and
// two nodes p and q that exist in the tree, return their lowest
// common ancestor (LCA) — the deepest node that has both p and
// q as descendants (a node can be a descendant of itself).
//
// Input:   tree [3,5,1,6,2,0,8,null,null,7,4], p=5, q=1
//              3
//             / \
//            5   1
//           / \ / \
//          6  2 0  8
//            / \
//           7   4
// Output:  3   (the LCA of 5 and 1)
//
// Input:   same tree, p=5, q=4   → 5  (5 is an ancestor of 4)

// THINK BEFORE CODING ──────────────────────────────────────
// • This is a general binary tree — you CANNOT use BST ordering
//   to decide which way to go. You must search both subtrees.
// • Post-order (process children before the parent) is the key:
//   recurse left, recurse right, THEN decide what the current
//   node contributes.
// • If p and q are found in DIFFERENT subtrees of a node, that
//   node IS the LCA. If they're both found in the SAME subtree,
//   the LCA is somewhere deeper — bubble that result up.
// • Base case: if the current node is null, or equals p or q,
//   what should it return?

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
// Locates a node by value (used to build p/q references for tests).
function findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) || findNode(root.right, val);
}

function lowestCommonAncestor(root, p, q) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TREE = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4];

const TESTS = [
  { args: [TREE, 5, 1], expected: 3 },
  { args: [TREE, 5, 4], expected: 5 },
  { args: [TREE, 6, 4], expected: 5 },
  { args: [TREE, 7, 4], expected: 2 },
  { args: [TREE, 0, 8], expected: 1 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const [treeArr, pVal, qVal] = args;
    const root = arrayToTree(treeArr);
    const p = findNode(root, pVal);
    const q = findNode(root, qVal);
    const result = lowestCommonAncestor(root, p, q);
    const gotVal = result ? result.val : result;
    const ok = gotVal === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(gotVal)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { lowestCommonAncestor, TreeNode, arrayToTree, findNode, TESTS };
