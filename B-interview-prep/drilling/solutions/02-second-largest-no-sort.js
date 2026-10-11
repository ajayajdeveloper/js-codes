// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/02-second-largest-no-sort.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Largest And Second-Largest, Without Sorting
// ════════════════════════════════════════════════════════════

// O(n) time  O(1) space
// `n !== largest` guards against a duplicate of the max being
// promoted to "second largest".
function largestTwo(nums) {
  let largest = null;
  let secondLargest = null;

  for (const n of nums) {
    if (largest === null || n > largest) {
      secondLargest = largest;
      largest = n;
    } else if (n !== largest && (secondLargest === null || n > secondLargest)) {
      secondLargest = n;
    }
  }

  return { largest, secondLargest };
}

module.exports = { largestTwo };
