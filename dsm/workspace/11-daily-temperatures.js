// ╔══════════════════════════════════════════════════════════╗
//   Problem 11: Daily Temperatures         [Medium]  [Stack/Monotonic]
//   node coach.js problem 11  → guiding questions
//   node coach.js hint 11 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of daily temperatures, return an array where
// result[i] is the number of days you'd have to wait after day i
// to get a WARMER temperature. If there is no future day for
// which this is possible, put 0 instead.
//
// Input:   [73,74,75,71,69,72,76,73]
// Output:  [1,1,4,2,1,1,0,0]
//
// Input:   [30,40,50,60]   → [1,1,1,0]
// Input:   [30,60,90]      → [1,1,0]

// THINK BEFORE CODING ──────────────────────────────────────
// • Brute force: for each day, scan forward until you find a
//   warmer day. What's the time complexity? Can we do better?
// • A monotonic stack holds INDICES whose temperatures are in
//   decreasing order (top of stack = smallest so far).
// • When the current temperature is greater than the temp at
//   the index on top of the stack, that's the answer for that
//   index — pop it and record the day-distance.
// • What should be pushed onto the stack, values or indices?
//   (Hint: you need to compute i - poppedIndex.)

// ── YOUR SOLUTION ──────────────────────────────────────────

function dailyTemperatures(temps) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] },
  { args: [[30,40,50,60]], expected: [1,1,1,0] },
  { args: [[30,60,90]], expected: [1,1,0] },
  { args: [[90,60,30]], expected: [0,0,0] },
  { args: [[]], expected: [] },
  { args: [[50]], expected: [0] },
  { args: [[55,55,55]], expected: [0,0,0] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = dailyTemperatures(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { dailyTemperatures, TESTS };
