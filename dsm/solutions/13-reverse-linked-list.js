// ⚠️  SPOILERS — Attempt workspace/13-reverse-linked-list.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Reverse Linked List
// ════════════════════════════════════════════════════════════

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

// ── BRUTE FORCE ──────────────────────── O(n) time  O(n) space
// Collect values into an array, then rebuild the list backwards.
// Correct, but wastes O(n) extra space when an in-place reversal
// of the pointers themselves is possible.
function reverseLinkedListBrute(head) {
  const vals = listToArray(head);
  return arrayToList(vals.reverse());
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Iterative pointer-rewiring: walk the list once, flipping each
// node's `next` pointer to point at the previous node.
function reverseLinkedList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next; // save before we overwrite it
    curr.next = prev;       // flip the pointer
    prev = curr;             // advance prev
    curr = next;             // advance curr
  }
  return prev; // prev is the new head once curr runs off the end
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// You must save `curr.next` BEFORE reassigning it, or you lose the
// rest of the list. Three pointers (prev, curr, next) marching in
// lockstep let you reverse links in a single O(1)-space pass.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Array round-trip is easy to write but costs O(n) extra memory.
// In-place pointer reversal is the expected interview answer —
// O(1) space and a single pass. A recursive version also exists
// but costs O(n) call-stack space, so it's not strictly better.
