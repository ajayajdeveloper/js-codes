// ╔══════════════════════════════════════════════════════════╗
//   Problem 16: Two Sum                 [Medium]  [HashMap]
//   node coach.js problem 16  → guiding questions
//   node coach.js hint 16 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers and a target sum, return the
// INDICES of the two numbers that add up to the target.
// You may assume exactly one solution exists.
//
// Input:   [2, 7, 11, 15],  target = 9
// Output:  [0, 1]          (because nums[0] + nums[1] = 2 + 7 = 9)
//
// Input:   [3, 2, 4],  target = 6
// Output:  [1, 2]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • The brute force is O(n²) — two nested loops. Can you do O(n)?
// • For each number x, what is the "complement" you're looking for?
// • If you store numbers you've already seen in a Map (value → index),
//   how quickly can you check if the complement exists?
// • What do you store as the Map key vs the Map value?

// ── YOUR SOLUTION ──────────────────────────────────────────

function twoSum(nums, target) {

  // for(let i = 0; i < nums.length; i++){
  //   for(let j = i + 1; j < nums.length; j++){
  //     if(nums[i] + nums[j] === target){
  //       return [i, j];
  //     }
  //   }
  // }

  const map = new Map();
  for(let i = 0; i < nums.length; i++){
    let complement = target - nums[i];
    if(map.has(complement)){
      return [map.get(complement), i]
    }else{
      map.set(nums[i], i);
    }
  }
  return [];
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[2, 7, 11, 15], 9],  expected: [0, 1] },
  { args: [[3, 2, 4],      6],  expected: [1, 2] },
  { args: [[3, 3],         6],  expected: [0, 1] },
  { args: [[1, 5, 3, 7],   8],  expected: [1, 2] },
  { args: [[0, 4, 3, 0],   0],  expected: [0, 3] },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = twoSum(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { twoSum, TESTS };
