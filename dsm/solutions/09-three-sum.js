// ⚠️  SPOILERS — Attempt workspace/09-three-sum.js first!
// ════════════════════════════════════════════════════════════
//  Solution: 3Sum
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n³) time  O(n) space (dedupe)
// Check every triplet, dedupe by a sorted-key signature.
function threeSumBrute(nums) {
  const seen = new Set();
  const result = [];
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (nums[i] + nums[j] + nums[k] === 0) {
          const triplet = [nums[i], nums[j], nums[k]].sort((a, b) => a - b);
          const key = triplet.join(',');
          if (!seen.has(key)) {
            seen.add(key);
            result.push(triplet);
          }
        }
      }
    }
  }
  return result;
}

// ── OPTIMAL ──────────────────────────── O(n²) time  O(1) extra space (excl. output)
// Sort, then fix each number and use two pointers for the remaining
// pair — skipping duplicates at every level.
function threeSum(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const result = [];
  const n = sorted.length;

  for (let i = 0; i < n - 2; i++) {
    if (sorted[i] > 0) break; // sorted array, can't sum to 0 anymore
    if (i > 0 && sorted[i] === sorted[i - 1]) continue; // skip duplicate anchor

    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];

      if (sum === 0) {
        result.push([sorted[i], sorted[left], sorted[right]]);
        left++;
        right--;
        while (left < right && sorted[left] === sorted[left - 1]) left++;
        while (left < right && sorted[right] === sorted[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Sorting turns "find a pair summing to X" into a two-pointer scan,
// dropping the innermost loop from O(n) to O(n) amortized across the
// whole two-pointer pass — overall O(n²) instead of O(n³). Sorting
// also makes duplicates ADJACENT, so skipping them is a cheap
// neighbor-check instead of needing a Set.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: O(n³), needs a Set/signature to dedupe triplets.
// Sort + two pointers: O(n²) time, O(1) extra space (ignoring the
// sort itself and the output) — the standard interview answer.
