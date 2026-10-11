// ╔══════════════════════════════════════════════════════════╗
//   02: Sort Objects By Numeric Field, Then String Field   [Easy-Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of people objects { name, age }, sort them
// primarily by age (ascending), and when two people have the
// SAME age, break the tie alphabetically by name (ascending).
// Do not mutate the input array.
//
// Input:
//   [{ name: 'Bob', age: 30 }, { name: 'Ann', age: 25 }, { name: 'Cid', age: 25 }]
// Output:
//   [{ name: 'Ann', age: 25 }, { name: 'Cid', age: 25 }, { name: 'Bob', age: 30 }]

// THINK BEFORE CODING ──────────────────────────────────────
// • A compare function returns negative / zero / positive. How do
//   you compare numbers vs strings inside the same compare fn?
// • What do you return from the compare function when ages are
//   EQUAL, to fall through to comparing names?
// • String comparison: a.name < b.name works, or use
//   a.name.localeCompare(b.name) — what's the difference?
// • [...arr].sort(...) vs arr.sort(...) — why does it matter here?

// ── YOUR SOLUTION ──────────────────────────────────────────

function sortPeople(people) {
  // your code here
   let final = people.map( val => val)
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [[
      { name: 'Bob', age: 30 },
      { name: 'Ann', age: 25 },
      { name: 'Cid', age: 25 },
    ]],
    expected: [
      { name: 'Ann', age: 25 },
      { name: 'Cid', age: 25 },
      { name: 'Bob', age: 30 },
    ],
  },
  {
    args: [[
      { name: 'Zed', age: 40 },
      { name: 'Amy', age: 20 },
    ]],
    expected: [
      { name: 'Amy', age: 20 },
      { name: 'Zed', age: 40 },
    ],
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const original = JSON.stringify(args[0]);
    const result = sortPeople(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    const mutated = JSON.stringify(args[0]) !== original;
    score += ok && !mutated ? 1 : 0;
    console.log(
      `Test ${i + 1}: ${ok && !mutated ? '✅' : '❌'}  got ${JSON.stringify(result)}` +
      (mutated ? '  ⚠️  mutated the input array!' : '')
    );
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { sortPeople, TESTS };
