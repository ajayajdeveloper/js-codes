// ⚠️  SPOILERS — Attempt workspace/12-next-greater-element.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Next Greater Element
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(n) space
// For each element, scan forward for the first greater value.
function nextGreaterElementBrute(nums) {
  const result = new Array(nums.length).fill(-1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > nums[i]) {
        result[i] = nums[j];
        break;
      }
    }
  }
  return result;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Monotonic decreasing stack of INDICES. When we see a value bigger
// than the value at the top-of-stack index, that top index's answer
// is the current value — pop and record, repeat, then push current.
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // indices, nums[stack] strictly decreasing

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = nums[i];
    }
    stack.push(i);
  }
  return result; // anything left on the stack at the end stays -1
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Identical shape to Daily Temperatures — the stack tracks indices
// still "waiting" for something bigger. The only difference is we
// record the VALUE that satisfied them instead of the distance.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force is O(n²) but trivial to reason about with duplicates.
// The stack approach is O(n) and naturally handles duplicates because
// it compares by position, not by first-seen value.
