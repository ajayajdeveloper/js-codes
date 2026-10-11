// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/08-group-by-field.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Group An Array Of Objects By A Field
// ════════════════════════════════════════════════════════════

// O(n) time  O(n) space
function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const groupKey = item[key];
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
    return groups;
  }, {});
}

module.exports = { groupBy };
