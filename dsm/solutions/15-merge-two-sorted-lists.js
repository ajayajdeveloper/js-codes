// ⚠️  SPOILERS — Attempt workspace/15-merge-two-sorted-lists.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Merge Two Sorted Linked Lists
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

// ── BRUTE FORCE ──────────────────────── O(n + m) time  O(n + m) space
// Dump both lists into an array, sort, rebuild a fresh list. Works,
// but throws away the fact both inputs are already sorted and
// allocates a brand-new list instead of reusing existing nodes.
function mergeTwoListsBrute(l1, l2) {
  const vals = [...listToArray(l1), ...listToArray(l2)].sort((a, b) => a - b);
  return arrayToList(vals);
}

// ── OPTIMAL ──────────────────────────── O(n + m) time  O(1) extra space
// Splice the existing nodes together using a dummy head. Walk both
// lists, always attaching the smaller current node, then append
// whatever remains of the non-exhausted list.
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  tail.next = l1 || l2; // splice on whatever's left, no need to loop it
  return dummy.next;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A dummy head removes the special-case of "what's the first node
// of the result" — you always have a `tail` to attach to. Since one
// list runs out first, the remaining tail of the other is already
// sorted and can be attached in one O(1) step instead of node-by-node.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Sorting a combined array is simple but ignores existing order,
// costing O((n+m) log(n+m)) and extra allocation. Splicing existing
// nodes is O(n+m) time and O(1) extra space — the expected answer.
