// ⚠️  SPOILERS — Attempt A-dsa/07-two-pointer.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Two-Pointer Template On A Sorted Array
// ════════════════════════════════════════════════════════════

// ── YOUR APPROACH: HASH SET/MAP ──────────────── O(n) time  O(n) space
// The "two sum" hash trick works here too, once two bugs are fixed:
//   - `return ture` → `return true` (typo)
//   - the map was never populated — you checked `map.has(complement)`
//     but never called `map.set(sortedArr[i], true)` (or similar) to
//     record numbers as you see them. As written, the map is always
//     empty, so `.has()` never matches and the function always
//     returns false.
// Fixed version:
function hasPairWithSumYourApproach(sortedArr, target) {
  const seen = new Set();
  for (let i = 0; i < sortedArr.length; i++) {
    const complement = target - sortedArr[i];
    if (seen.has(complement)) {
      return true;
    }
    seen.add(sortedArr[i]);
  }
  return false;
}
// This is correct and O(n), but it uses O(n) extra space and never
// looks at the fact that the array is sorted — that's the whole
// point of a file called "two-pointer".

// ── OPTIMAL: TWO POINTERS ─────────────────────── O(n) time  O(1) space
// Because the array is sorted, start one pointer at the front and
// one at the back:
//   - sum too SMALL  → move `left` right (need a bigger number)
//   - sum too BIG    → move `right` left (need a smaller number)
//   - sum matches    → found it
// The pointers close in on each other, each index visited at most
// once, so it's O(n) time — and no extra container needed, O(1) space.
function hasPairWithSum(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;

  while (left < right) {
    const sum = sortedArr[left] + sortedArr[right];
    if (sum === target) {
      return true;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return false;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Sortedness is information you can spend instead of memory: a hash
// set turns "have I seen the complement" into an O(1) lookup at the
// cost of O(n) space; two pointers turn "is the sum too big or too
// small" into a direction to move, at the cost of nothing extra,
// but only because moving `left` forward / `right` backward is
// guaranteed to be the right move on a sorted array.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Your approach (Set):  correct and O(n) time, but O(n) space and
//                        doesn't require the array to be sorted at
//                        all — the more general "two sum" solution.
// Optimal (two-pointer): O(n) time, O(1) space — strictly better
//                        here, but ONLY works because the input is
//                        sorted. If the array weren't sorted, you'd
//                        either sort it first (O(n log n), which
//                        loses the advantage) or fall back to the
//                        hash-set version.

module.exports = {
  hasPairWithSumYourApproach,
  hasPairWithSum,
};
