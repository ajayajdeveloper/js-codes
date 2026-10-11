// ⚠️  SPOILERS — Attempt workspace/01-two-sum.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Two Sum (Unsorted Array)
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(1) space
// Check every pair of indices.
function twoSumBrute(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Single pass: for each number, check if its complement was
// already seen. If not, remember this number's index for later.
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Check for the complement BEFORE inserting the current value —
// otherwise a single element could pair with itself. Because we
// scan left to right and return on the first match, the earlier
// index always ends up first in the result (i < j automatically).

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: O(n²), zero extra space — fine for tiny inputs.
// Hash map:    O(n) time, O(n) space — the standard interview answer.
