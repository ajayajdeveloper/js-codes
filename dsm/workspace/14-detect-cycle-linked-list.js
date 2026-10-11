// ╔══════════════════════════════════════════════════════════╗
//   Problem 14: Detect Cycle in Linked List         [Easy]  [Linked List/Two Pointers]
//   node coach.js problem 14  → guiding questions
//   node coach.js hint 14 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given the head of a linked list, determine whether it contains
// a cycle (some node's `next` eventually points back to a node
// already visited).
//
// Input:   [3,2,0,-4] with the tail connecting back to index 1
// Output:  true
//
// Input:   [1,2] with no cycle   → false
// Input:   []      → false (no node at all)

// THINK BEFORE CODING ──────────────────────────────────────
// • Floyd's Tortoise and Hare: two pointers, one moves 1 step at
//   a time (slow), one moves 2 steps at a time (fast).
// • If there's no cycle, what happens to the fast pointer first?
// • If there IS a cycle, why must slow and fast eventually land
//   on the exact same node?
// • What's the loop condition — what do you check each iteration
//   before advancing, and what do you check right after?
// • Could you solve this with a Set of visited nodes instead?
//   What's the space trade-off versus two pointers?

// ── YOUR SOLUTION ──────────────────────────────────────────

class ListNode {
  constructor(val, next = null) { this.val = val; this.next = next; }
}
function arrayToListWithCycle(arr, pos) {
  const nodes = arr.map(v => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0] || null;
}

function hasCycle(head) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[3,2,0,-4], 1], expected: true },
  { args: [[1,2], -1], expected: false },
  { args: [[], -1], expected: false },
  { args: [[1], -1], expected: false },
  { args: [[1], 0], expected: true },
  { args: [[1,2,3,4,5], -1], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const [arr, pos] = args;
    const head = arrayToListWithCycle(arr, pos);
    const result = hasCycle(head);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { hasCycle, ListNode, arrayToListWithCycle, TESTS };
