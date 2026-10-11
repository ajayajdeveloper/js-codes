// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/01-sum-odd-even-groups.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Sum Of Odd And Even Numbers, Grouped
// ════════════════════════════════════════════════════════════

// O(n) time  O(1) space
// `n % 2 !== 0` (not `=== 1`) so negative odd numbers are caught too.
function sumOddEven(nums) {
  return nums.reduce(
    (acc, n) => {
      if (n % 2 !== 0) acc.odd += n;
      else acc.even += n;
      return acc;
    },
    { odd: 0, even: 0 }
  );
}

module.exports = { sumOddEven };
