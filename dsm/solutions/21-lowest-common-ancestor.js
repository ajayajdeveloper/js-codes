// ⚠️  SPOILERS — Attempt workspace/21-lowest-common-ancestor.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Lowest Common Ancestor of a Binary Tree
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
function findNode(root, val) {
  if (!root) return null;
  if (root.val === val) return root;
  return findNode(root.left, val) || findNode(root.right, val);
}

// ── BRUTE FORCE ──────────────────────── O(n) time  O(n) space
// Record the full root-to-node path for p and for q, then walk
// both paths together and find the last node where they agree.
function lowestCommonAncestorBrute(root, p, q) {
  function findPath(node, target, path) {
    if (!node) return false;
    path.push(node);
    if (node === target) return true;
    if (findPath(node.left, target, path) || findPath(node.right, target, path)) return true;
    path.pop();
    return false;
  }
  const pathP = [], pathQ = [];
  findPath(root, p, pathP);
  findPath(root, q, pathQ);
  let lca = null;
  for (let i = 0; i < pathP.length && i < pathQ.length; i++) {
    if (pathP[i] === pathQ[i]) lca = pathP[i];
    else break;
  }
  return lca;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(h) space
// Post-order search: recurse into both children. If a node is
// null or IS p/q, return it up. If BOTH left and right recursion
// return non-null, this node is where p and q's paths diverge —
// it's the LCA. Otherwise bubble up whichever side found something.
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A node is the LCA exactly when p and q are found in DIFFERENT
// branches beneath it (or the node itself IS one of them and the
// other is somewhere in its subtree). The post-order recursion
// naturally surfaces this: only the true LCA sees non-null results
// from BOTH children.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Path-recording is more intuitive (build two paths, compare) but
// needs O(n) extra space for both paths and two full traversals.
// The post-order approach does it in a single pass with only
// O(h) recursion stack space.
