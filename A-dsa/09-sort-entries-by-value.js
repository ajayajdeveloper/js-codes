// ╔══════════════════════════════════════════════════════════╗
//   09: Object Entries → Sort By Value → Back To Object   [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an object mapping keys to numbers, return a NEW object
// whose keys are ordered by value, descending.
//
// Input:   { apples: 3, bananas: 1, cherries: 5 }
// Output:  { cherries: 5, apples: 3, bananas: 1 }
//
// (JS objects preserve insertion order for string keys, so the
// order you insert entries in the result IS the sorted order.)

// THINK BEFORE CODING ──────────────────────────────────────
// • Object.entries(obj) → what shape does this give you? (array of
//   [key, value] pairs)
// • How do you sort an array of pairs by the second element,
//   descending?
// • Object.fromEntries(...) → turns pairs back into an object.
//   What's the non-Object.fromEntries way, using reduce?

// ── YOUR SOLUTION ──────────────────────────────────────────

function sortObjectByValueDesc(obj) {
     
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [{ apples: 3, bananas: 1, cherries: 5 }],
    expected: { cherries: 5, apples: 3, bananas: 1 },
  },
  { args: [{}], expected: {} },
  { args: [{ a: 1 }], expected: { a: 1 } },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = sortObjectByValueDesc(...args);
    // JSON.stringify preserves key order, so this also checks ordering.
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { sortObjectByValueDesc, TESTS };
