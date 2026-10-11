// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/09-two-sum-hashmap-and-two-pointer.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Two-Sum — Hashmap (Unsorted) + Two-Pointer (Sorted)
// ════════════════════════════════════════════════════════════

// twoSumUnsorted:  O(n) time  O(n) space
// twoSumSorted:    O(n) time  O(1) space
function twoSumUnsorted(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return null;
}

function twoSumSorted(sortedNums, target) {
  let left = 0;
  let right = sortedNums.length - 1;

  while (left < right) {
    const sum = sortedNums[left] + sortedNums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}

module.exports = { twoSumUnsorted, twoSumSorted };
