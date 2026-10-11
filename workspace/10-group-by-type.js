// ╔══════════════════════════════════════════════════════════╗
//   Problem 10: Group By Type         [Easy]  [Array/Reduce]
//   node coach.js problem 10  → guiding questions
//   node coach.js hint 10 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a mixed array, group elements by their JavaScript
// typeof type and return an object keyed by type name.
//
// Input:   [1, "hello", true, 5, false, "world"]
// Output:  { number: [1, 5], string: ["hello", "world"], boolean: [true, false] }
//
// THINK BEFORE CODING ──────────────────────────────────────
// • What operator gives you the type of a value?
// • How do you initialize a new bucket in the accumulator?
// • What pattern does reduce use for building an object from an array?

// ── YOUR SOLUTION ──────────────────────────────────────────

function groupByType(arr) {

  return arr.reduce((acc, item) => {
    let key = typeof item;
    if(!acc[key]){
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [[1, 'hello', true, 5, false, 'world']],
    expected: { number: [1, 5], string: ['hello', 'world'], boolean: [true, false] },
  },
  {
    args: [[1, 2, 3]],
    expected: { number: [1, 2, 3] },
  },
  {
    args: [[]],
    expected: {},
  },
  {
    args: [['a', 'b']],
    expected: { string: ['a', 'b'] },
  },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = groupByType(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { groupByType, TESTS };
