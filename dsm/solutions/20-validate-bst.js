// ⚠️  SPOILERS — Attempt workspace/20-validate-bst.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Validate Binary Search Tree
// ════════════════════════════════════════════════════════════

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
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

// ── BRUTE FORCE ──────────────────────── O(n) time  O(n) space
// In-order traversal of a valid BST visits values in strictly
// ascending order. Collect the in-order sequence, then check it's
// strictly increasing. Simple, but requires buffering every value.
function isValidBSTBrute(root) {
  const values = [];
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    values.push(node.val);
    inorder(node.right);
  }
  inorder(root);
  for (let i = 1; i < values.length; i++) {
    if (values[i] <= values[i - 1]) return false;
  }
  return true;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(h) space
// Recursive min/max bound checking. Every node must fall strictly
// within the (min, max) range inherited from ALL its ancestors —
// not just its immediate parent. Recursing left tightens the max;
// recursing right tightens the min.
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (min !== null && node.val <= min) return false;
    if (max !== null && node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, null, null);
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A node "looks" locally valid (its immediate children straddle it
// correctly) yet still violate the BST property against a GRANDPARENT
// or higher ancestor. Threading (min, max) bounds down the recursion
// enforces the range from every ancestor, not just the direct parent
// — and using strict <=/>= comparisons rejects equal-valued nodes.

// ── TRADE-OFFS ───────────────────────────────────────────────
// In-order + strictly-increasing check is intuitive and easy to
// verify, but buffers all n values up front. Min/max bound recursion
// achieves the same O(n) time with only O(h) space (call stack), and
// can short-circuit as soon as a violation is found.
