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

// ── YOUR SOLUTION ──────────────────────────────────────────

function groupBy(arr, key) {

  let res = [...arr].reduce((acc, val) => {
    let grpkey = val[key]
    if(!acc[grpkey]){
      acc[grpkey] = [val]
    }else{
      acc[grpkey].push(val)
    }
    return acc
  },{})
  return res
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
