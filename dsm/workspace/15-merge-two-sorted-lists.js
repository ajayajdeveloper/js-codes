// ╔══════════════════════════════════════════════════════════╗
//   Problem 15: Merge Two Sorted Linked Lists         [Easy]  [Linked List]
//   node coach.js problem 15  → guiding questions
//   node coach.js hint 15 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given the heads of two sorted linked lists, merge them into
// one sorted list by splicing the existing nodes together, and
// return the head of the merged list.
//
// Input:   l1 = 1 -> 2 -> 4,  l2 = 1 -> 3 -> 4
// Output:  1 -> 1 -> 2 -> 3 -> 4 -> 4
//
// Input:   l1 = [],  l2 = []      → []
// Input:   l1 = [],  l2 = [0]     → [0]

// THINK BEFORE CODING ──────────────────────────────────────
// • This is the "merge" step from merge sort, but on linked
//   nodes instead of array slices.
// • A dummy head node simplifies edge cases — why? What would
//   go wrong without one?
// • At each step, compare l1.val and l2.val; attach the smaller
//   node to the result and advance only that pointer.
// • Once one list runs out, what do you do with whatever remains
//   of the other list? (Hint: you don't need to loop node-by-node.)

// ── YOUR SOLUTION ──────────────────────────────────────────

class ListNode {
  constructor(val, next = null) { this.val = val; this.next = next; }
}
function arrayToList(arr) {
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const v of arr) { cur.next = new ListNode(v); cur = cur.next; }
  return dummy.next;
}
function listToArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}

function mergeTwoLists(l1, l2) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] },
  { args: [[], []], expected: [] },
  { args: [[], [0]], expected: [0] },
  { args: [[2], [1]], expected: [1,2] },
  { args: [[1,2,3], []], expected: [1,2,3] },
  { args: [[5,5], [5,5]], expected: [5,5,5,5] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const [a, b] = args;
    const l1 = arrayToList(a);
    const l2 = arrayToList(b);
    const result = listToArray(mergeTwoLists(l1, l2));
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { mergeTwoLists, ListNode, arrayToList, listToArray, TESTS };
