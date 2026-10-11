// ╔════════════════════════════════════════════════════════════╗
//  07: Move Zeroes                                       [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Move all 0s in the array to the end while keeping the relative
// order of the non-zero elements — in-place, single pass if you can.
//
// Input:   moveZeroes([0, 1, 0, 3, 12])
// Output:  [1, 3, 12, 0, 0]

// YOUR SOLUTION ─────────────────────────────────────────────

function moveZeroes(nums) {

   let x  = 0;

   for(let i = 0 ; i < nums.length; i++){
    if(nums[i] !== 0){
      nums [x] = nums[i]
      x++;
    }
}
for(let i = x ; i < nums.length; i++){
  nums[i] = 0
  }
  return nums

}



// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
  { args: [[0]], expected: [0] },
  { args: [[1, 2, 3]], expected: [1, 2, 3] },
  { args: [[0, 0, 1]], expected: [1, 0, 0] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = moveZeroes(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { moveZeroes, TESTS };
