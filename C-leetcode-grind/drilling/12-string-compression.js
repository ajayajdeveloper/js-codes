// ╔════════════════════════════════════════════════════════════╗
//  12: String Compression (Run-Length Encode)            [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Compress a string by replacing runs of the same character with
// the character followed by its run length (e.g. "aaabbc" ->
// "a3b2c1"). Every run gets an explicit count, even runs of 1.
//
// Input:   compress("aaabbc")
// Output:  "a3b2c1"

// YOUR SOLUTION ─────────────────────────────────────────────

function compress(s) {
  let str = '';
  let count = 1;

  for(let i = 0; i < s.length; i++){
    let curr = s[i];
    let nextCurr = s[i + 1];
    if(curr === nextCurr){
      count++;
    }else{
      str += curr + count
       count = 1
    }   
  }
  return str;
}

// TESTS ─────────────────────────────────────────────────────

const TESTS = [
  { args: ['aaabbc'], expected: 'a3b2c1' },
  { args: ['abcd'], expected: 'a1b1c1d1' },
  { args: [''], expected: '' },
  { args: ['aaaa'], expected: 'a4' },
  { args: ['a'], expected: 'a1' },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = compress(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { compress, TESTS };
