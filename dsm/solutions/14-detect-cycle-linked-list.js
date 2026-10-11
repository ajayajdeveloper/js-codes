// ⚠️  SPOILERS — Attempt workspace/14-detect-cycle-linked-list.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Detect Cycle in Linked List
// ════════════════════════════════════════════════════════════

class ListNode {
  constructor(val, next = null) { this.val = val; this.next = next; }
}
function arrayToListWithCycle(arr, pos) {
  const nodes = arr.map(v => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0] || null;
}

// ── BRUTE FORCE ──────────────────────── O(n) time  O(n) space
// Track every node we've visited in a Set. If we ever revisit a
// node, there's a cycle. If we run off the end (null), there isn't.
function hasCycleBrute(head) {
  const seen = new Set();
  let curr = head;
  while (curr) {
    if (seen.has(curr)) return true;
    seen.add(curr);
    curr = curr.next;
  }
  return false;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Floyd's Tortoise and Hare: slow moves 1 step, fast moves 2 steps.
// If there's a cycle, fast eventually laps slow and they meet. If
// there's no cycle, fast hits null first.
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// In a cycle, the gap between fast and slow shrinks by 1 each
// iteration (fast gains 2 steps, slow gains 1), so they are
// guaranteed to collide — no cycle means fast simply reaches the
// end first, since it moves twice as fast as the list is long.

// ── TRADE-OFFS ───────────────────────────────────────────────
// The Set approach is intuitive and easy to explain in O(n) space.
// Floyd's algorithm gets the same O(n) time with O(1) space by using
// pointer speed instead of memory to detect the repeat — the classic
// interview follow-up is "can you do it without extra memory?"
