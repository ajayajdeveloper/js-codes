// ╔══════════════════════════════════════════════════════════╗
//   Problem 9: Second Largest  [Easy-Med]  [Array/SinglePass]
//   node coach.js problem 9   → guiding questions
//   node coach.js hint 9 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers, return the second largest
// unique value. Return null if it doesn't exist.
//
// Input:   [10, 5, 8, 20, 15]
// Output:  15
//
// THINK BEFORE CODING ──────────────────────────────────────
// • Sorting works — but can you do it in O(n) with O(1) space?
// • How do you track both the largest AND second largest in one pass?
// • What two conditions update your two tracked variables?

// ── YOUR SOLUTION ──────────────────────────────────────────

function secondLargest(arr) {

  // arr = arr.sort((a,b) => b - a);
  // arr = [...new Set(arr)];
  // return arr[1] ?? null;
  // your code here

  // let first = -Infinity;
  // let second = -Infinity;
  // for(let i = 0; i < arr.length; i++){
  //   if(arr[i] > first){
  //     second = first;
  //     first = arr[i];
  //   } else if(arr[i] > second && arr[i] !== first){
  //     second = arr[i];
  //   }
  // }
  // return second === -Infinity ? null : second;

  let first = -Infinity;
  let second = -Infinity;
  for(let i =0; i < arr.length;i++){
    if(arr[i] > first){
      second = Math.max(second, first);
      first = Math.max(first, arr[i]);
  }else if(arr[i] > second && arr[i] !== first){
    second = Math.max(second, arr[i]);
  }
}
  return second === 0 ? null : second;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[10, 5, 8, 20, 15]],    expected: 15 },
  { args: [[1, 2]],                 expected: 1 },
  { args: [[5, 5, 5]],             expected: null },
  { args: [[3]],                    expected: null },
  { args: [[1, 3, 2, 4, 5]],      expected: 4 },
  { args: [[-1, -2, -3]],          expected: -2 },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = secondLargest(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { secondLargest, TESTS };
