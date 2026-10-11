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

// THINK BEFORE CODING ───────────────────────────────────────
// • Scan once, tracking the current run's character and a running
//   count — what condition ends a run?
// • What do you do with the FINAL run after the loop ends — it never
//   triggers the "end of run" condition from inside the loop, so
//   where does its output get flushed?
// • Follow-up variant (LeetCode #443): only use the compressed form
//   if it's actually shorter than the original — not required here,
//   but worth knowing as an extension.

// YOUR SOLUTION ─────────────────────────────────────────────

function compress(s) {
  // your code here
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

module.exports = { compress };
