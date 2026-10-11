// ╔══════════════════════════════════════════════════════════╗
//   05: Group An Array Into An Object By A Field (reduce)  [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of objects and a key name, group the objects
// into an object whose keys are the distinct values of that field,
// and whose values are arrays of the matching objects.
//
// Input:
//   groupBy([
//     { name: 'Ann', role: 'admin' },
//     { name: 'Bob', role: 'user' },
//     { name: 'Cid', role: 'admin' },
//   ], 'role')
// Output:
//   {
//     admin: [{ name: 'Ann', role: 'admin' }, { name: 'Cid', role: 'admin' }],
//     user:  [{ name: 'Bob', role: 'user' }],
//   }

// THINK BEFORE CODING ──────────────────────────────────────
// • What's the accumulator here — an array or an object? What
//   should its starting value be?
// • For each item, what's the "bucket key"? What if that bucket
//   doesn't exist yet in the accumulator?
// • acc[key] ??= [] — what does this do, and why is it useful here?
// • Why must you `return acc` at the end of the reducer function?

// ── YOUR SOLUTION ──────────────────────────────────────────

function groupBy(arr, key) {
   return [...arr].reduce((acc, val) =>{
    let grpKey = val[key]
    if(!acc[grpKey]){
      acc[grpKey] = [val]
    }else{
      acc[grpKey].push(val)
    }
    return acc
   },{})
}

// ── TESTS ──────────────────────────────────────────────────

const people = [
  { name: 'Ann', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Cid', role: 'admin' },
];

const TESTS = [
  {
    args: [people, 'role'],
    expected: {
      admin: [{ name: 'Ann', role: 'admin' }, { name: 'Cid', role: 'admin' }],
      user: [{ name: 'Bob', role: 'user' }],
    },
  },
  { args: [[], 'role'], expected: {} },
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
