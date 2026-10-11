// ╔══════════════════════════════════════════════════════════╗
//   08: Group An Array Of Objects By A Field             [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of objects and a key, return an object mapping each
// distinct value of that key to an array of the matching items.
//
// Input:   groupBy([
//            { type: 'fruit', name: 'apple' },
//            { type: 'veg', name: 'carrot' },
//            { type: 'fruit', name: 'banana' },
//          ], 'type')
// Output:  {
//            fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
//            veg: [{ type: 'veg', name: 'carrot' }],
//          }

// THINK BEFORE CODING ──────────────────────────────────────
// • `reduce` is the natural tool here — what should the initial
//   accumulator be?
// • For each item, how do you check whether its group already exists
//   in the accumulator before pushing into it? What do you do the
//   FIRST time a given key value is seen?
// • This is a single O(n) pass — why would sorting the array by the
//   key first, then grouping, be unnecessary extra work?
// • What should happen if `key` refers to a property some items don't
//   have?

// ── YOUR SOLUTION ──────────────────────────────────────────

function groupBy(arr, key) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [
      [
        { type: 'fruit', name: 'apple' },
        { type: 'veg', name: 'carrot' },
        { type: 'fruit', name: 'banana' },
      ],
      'type',
    ],
    expected: {
      fruit: [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
      veg: [{ type: 'veg', name: 'carrot' }],
    },
  },
  { args: [[], 'type'], expected: {} },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = groupBy(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { groupBy, TESTS };
