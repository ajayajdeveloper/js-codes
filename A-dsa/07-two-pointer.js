// ╔══════════════════════════════════════════════════════════╗
//   07: Two-Pointer Template On A Sorted Array       [Easy-Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a SORTED array of numbers and a target sum, return true
// if any two DISTINCT elements add up to the target.
//
// Input:   hasPairWithSum([1, 2, 4, 7, 11, 15], 15)
// Output:  true      (4 + 11 = 15)
//
// Input:   hasPairWithSum([1, 2, 4, 7, 11, 15], 30)
// Output:  false

// THINK BEFORE CODING ──────────────────────────────────────
// • This is the canonical two-pointer template: one pointer `left`
//   starts at index 0, one pointer `right` starts at the last index.
// • At each step, compute sum = arr[left] + arr[right]. If it's too
//   small, which pointer moves — and in which direction? If it's
//   too big, which one moves?
// • Why does this ONLY work because the array is sorted?
// • What's the loop condition — when do you stop?
// • Compare this to the brute-force nested-loop O(n²) approach —
//   what makes two-pointer O(n)?

// ── YOUR SOLUTION ──────────────────────────────────────────

function hasPairWithSum(sortedArr, target) {

  let map = new Set();

  for (let i = 0; i < sortedArr.length; i++){
    let complement = target - sortedArr[i]
    if(map.has(complement)){
      return true
    }
    map.add(sortedArr[i]);
  }
  return false
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 4, 7, 11, 15], 15], expected: true },
  { args: [[1, 2, 4, 7, 11, 15], 30], expected: false },
  { args: [[1, 2, 3], 5], expected: true },
  { args: [[1, 2, 3], 100], expected: false },
  { args: [[], 5], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = hasPairWithSum(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { hasPairWithSum, TESTS };
