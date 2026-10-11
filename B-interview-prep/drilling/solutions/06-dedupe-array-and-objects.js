// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/06-dedupe-array-and-objects.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Remove Duplicates — Array, Then Array Of Objects
// ════════════════════════════════════════════════════════════

// dedupeArray:  O(n) time  O(n) space
// dedupeByKey:  O(n) time  O(n) space
function dedupeArray(arr) {
  return [...new Set(arr)];
}

function dedupeByKey(arr, key) {
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    if (!seen.has(item[key])) {
      seen.add(item[key]);
      result.push(item);
    }
  }
  return result;
}

module.exports = { dedupeArray, dedupeByKey };
