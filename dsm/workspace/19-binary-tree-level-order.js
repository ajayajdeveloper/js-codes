// ╔══════════════════════════════════════════════════════════╗
//   Problem 19: Binary Tree Level Order Traversal         [Medium]  [Tree/BFS]
//   node coach.js problem 19  → guiding questions
//   node coach.js hint 19 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given the root of a binary tree, return the level-order
// traversal of its node values (i.e., left to right, level by
// level), as an array of arrays — one inner array per level.
//
// Input:   arrayToTree([3,9,20,null,null,15,7])
//              3
//             / \
//            9  20
//               /  \
//              15   7
// Output:  [[3],[9,20],[15,7]]
//
// Input:   arrayToTree([])      → []
// Input:   arrayToTree([1])     → [[1]]

// THINK BEFORE CODING ──────────────────────────────────────
// • BFS uses a QUEUE (FIFO), not a stack — why does that matter
//   for getting nodes level-by-level instead of some other order?
// • The trick to grouping by level: before processing the next
//   batch of nodes, record how many nodes are CURRENTLY in the
//   queue — that count is exactly one level's worth.
// • For each node processed, when do you enqueue its children?
// • What should happen if root is null?

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

function levelOrder(root) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] },
  { args: [[]], expected: [] },
  { args: [[1]], expected: [[1]] },
  { args: [[1,2,3,4,5,6,7]], expected: [[1],[2,3],[4,5,6,7]] },
  { args: [[1,null,2,null,3]], expected: [[1],[2],[3]] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const root = arrayToTree(args[0]);
    const result = levelOrder(root);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { levelOrder, TreeNode, arrayToTree, TESTS };
