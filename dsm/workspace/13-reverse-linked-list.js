// ╔══════════════════════════════════════════════════════════╗
//   Problem 13: Reverse Linked List         [Easy]  [Linked List]
//   node coach.js problem 13  → guiding questions
//   node coach.js hint 13 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given the head of a singly linked list, reverse the list and
// return the new head.
//
// Input:   1 -> 2 -> 3 -> 4 -> 5
// Output:  5 -> 4 -> 3 -> 2 -> 1
//
// Input:   []        → []
// Input:   [1]        → [1]

// THINK BEFORE CODING ──────────────────────────────────────
// • You need three pointers as you walk the list: prev, curr, next.
// • Before overwriting curr.next, you must save it — why?
// • At each step: save next, point curr.next back at prev, then
//   advance prev and curr forward by one.
// • What is prev once the loop ends? That's your new head.
// • Could you also solve this recursively? What would the base
//   case be?

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

function reverseLinkedList(head) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1,2,3,4,5]], expected: [5,4,3,2,1] },
  { args: [[]], expected: [] },
  { args: [[1]], expected: [1] },
  { args: [[1,2]], expected: [2,1] },
  { args: [[7,7,7]], expected: [7,7,7] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const head = arrayToList(args[0]);
    const result = listToArray(reverseLinkedList(head));
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { reverseLinkedList, ListNode, arrayToList, listToArray, TESTS };
