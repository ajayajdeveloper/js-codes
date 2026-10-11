// ⚠️  SPOILERS — Attempt workspace/19-binary-tree-level-order.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Binary Tree Level Order Traversal
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
// DFS while tracking depth, pushing each value into the array
// slot for its depth. Works, but mixes traversal order concerns
// (recursion) with grouping concerns (depth bookkeeping).
function levelOrderBrute(root) {
  const levels = [];
  function dfs(node, depth) {
    if (!node) return;
    if (!levels[depth]) levels[depth] = [];
    levels[depth].push(node.val);
    dfs(node.left, depth + 1);
    dfs(node.right, depth + 1);
  }
  dfs(root, 0);
  return levels;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// True BFS with a queue. Before draining the next batch, snapshot
// the current queue size — that's exactly one level's worth of nodes.
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Snapshotting `queue.length` before the inner loop is what turns a
// plain BFS into a LEVEL-order BFS — it draws a hard boundary between
// "this level's nodes" and "next level's nodes" that get enqueued
// mid-loop, so they don't bleed into the current level's array.

// ── TRADE-OFFS ───────────────────────────────────────────────
// DFS-with-depth is a valid alternative and equally O(n), but BFS
// with a queue matches the problem's natural shape (level by level)
// more directly and avoids recursion depth concerns on very tall trees.
