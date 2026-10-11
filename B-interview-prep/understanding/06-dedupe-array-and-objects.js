// ╔══════════════════════════════════════════════════════════╗
//   06: Remove Duplicates — Array, Then Array Of Objects  [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Part A — dedupeArray(arr): remove duplicate primitive values from
// an array, preserving first-occurrence order.
//
// Part B — dedupeByKey(arr, key): remove duplicate OBJECTS from an
// array, where two objects are "duplicates" if they share the same
// value at `key`. Keep the FIRST occurrence.
//
// Input:   dedupeArray([1, 2, 2, 3, 1])
// Output:  [1, 2, 3]
//
// Input:   dedupeByKey([{id:1,name:'a'},{id:2,name:'b'},{id:1,name:'c'}], 'id')
// Output:  [{id:1,name:'a'}, {id:2,name:'b'}]

// THINK BEFORE CODING ──────────────────────────────────────
// • `Set` stores unique PRIMITIVE values — how do you rebuild an
//   array from one while preserving insertion order?
//   (`[...new Set(arr)]`)
// • Objects aren't primitives, so a `Set` can't dedupe them by VALUE
//   the same way — two different object references with the same
//   `id` are still different objects to a `Set`. What do you need to
//   track instead? (the KEY values you've already seen — a `Set` of
//   just the ids works fine for that)
// • Which occurrence should survive when a key repeats — first or
//   last? How does your loop's direction (and when you check "have I
//   seen this key?") decide that?
// • What data structure gives you O(1) membership checks for "have I
//   seen this key before"?

// ── YOUR SOLUTION ──────────────────────────────────────────

function dedupeArray(arr) {
  // your code here
}

function dedupeByKey(arr, key) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const ARRAY_TESTS = [
  { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
  { args: [[]], expected: [] },
  { args: [[1, 1, 1]], expected: [1] },
];

const KEY_TESTS = [
  {
    args: [[{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'c' }], 'id'],
    expected: [{ id: 1, name: 'a' }, { id: 2, name: 'b' }],
  },
  { args: [[], 'id'], expected: [] },
];

if (require.main === module) {
  let score = 0;
  let total = 0;

  ARRAY_TESTS.forEach(({ args, expected }, i) => {
    total++;
    const result = dedupeArray(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${total} (dedupeArray ${i + 1}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });

  KEY_TESTS.forEach(({ args, expected }, i) => {
    total++;
    const result = dedupeByKey(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${total} (dedupeByKey ${i + 1}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

module.exports = { dedupeArray, dedupeByKey, ARRAY_TESTS, KEY_TESTS };
