// ╔══════════════════════════════════════════════════════════╗
//   01: Sum Of Odd And Even Numbers, Grouped           [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers, return an object with the sum of all
// ODD numbers and the sum of all EVEN numbers.
//
// Input:   sumOddEven([1, 2, 3, 4, 5, 6])
// Output:  { odd: 9, even: 12 }

// ── YOUR SOLUTION ──────────────────────────────────────────

function sumOddEven(nums) {
  let output = {
    odd: 0,
    even: 0,
  }

  let oddSum  = 0;
  let evenSum = 0;

  for(let i = 0; i < nums.length; i++){
     if(nums[i] % 2 === 1 || nums[i] % 2 === -1){
      oddSum = oddSum + nums[i]
     }else{
      evenSum = evenSum + nums[i] 
     }
  }

  output.odd = oddSum;
  output.even = evenSum;

  return output;


}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[1, 2, 3, 4, 5, 6]], expected: { odd: 9, even: 12 } },
  { args: [[]], expected: { odd: 0, even: 0 } },
  { args: [[2, 4, 6]], expected: { odd: 0, even: 12 } },
  { args: [[1, 3, 5]], expected: { odd: 9, even: 0 } },
  { args: [[-1, -2, 3, 4]], expected: { odd: 2, even: 2 } },  // negative numbers
  { args: [[0]], expected: { odd: 0, even: 0 } },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = sumOddEven(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { sumOddEven, TESTS };
