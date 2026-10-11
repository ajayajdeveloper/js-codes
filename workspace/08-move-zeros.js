// ╔══════════════════════════════════════════════════════════╗
//   Problem 8: Move Zeros To End  [Easy-Med]  [Two Pointers]
//   node coach.js problem 8   → guiding questions
//   node coach.js hint 8 1    → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Move all zeros to the end of the array while preserving
// the order of non-zero elements.
//
// Input:   [1, 0, 2, 0, 3, 4]
// Output:  [1, 2, 3, 4, 0, 0]
//
// Constraint: Preserve order of non-zero elements.
//
// THINK BEFORE CODING ──────────────────────────────────────
// • Can you solve this without creating a new array?
// • What is a "write pointer" and how does it help?
// • If you filter non-zeros, how do you know how many zeros to append?

// ── YOUR SOLUTION ──────────────────────────────────────────

function moveZerosToEnd(arr) {

  let x = 0;
  for(let i = 0; i < arr.length; i++){
    if(arr[i] !== 0){
      arr[x] = arr[i];
      x++;
    }
  }

    for(let j = x; j < arr.length; j++){
      arr[j] = 0;
    }
  
  return arr;

  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 0, 2, 0, 3, 4]],   expected: [1, 2, 3, 4, 0, 0] },
  { args: [[0, 0, 1]],             expected: [1, 0, 0] },
  { args: [[1, 2, 3]],             expected: [1, 2, 3] },
  { args: [[0, 0, 0]],             expected: [0, 0, 0] },
  { args: [[1]],                   expected: [1] },
  { args: [[]],                    expected: [] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = moveZerosToEnd(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { moveZerosToEnd, TESTS };
