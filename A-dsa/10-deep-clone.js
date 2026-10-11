// ╔══════════════════════════════════════════════════════════╗
//   10: Deep Clone Without structuredClone            [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement deepClone(value) that recursively clones plain objects
// and arrays, WITHOUT using structuredClone or JSON.parse(JSON.stringify()).
// Mutating the clone must NOT affect the original, at any nesting depth.
//
// Input:   { a: 1, b: { c: [1, 2, { d: 3 }] } }
// Output:  a deep copy — same shape/values, but no shared references.

// THINK BEFORE CODING ──────────────────────────────────────
// • What's the base case — a value that doesn't need recursing
//   (numbers, strings, booleans, null, undefined)?
// • How do you tell an array apart from a plain object at runtime?
//   (Array.isArray)
// • For an object/array, what do you do for EACH of its
//   properties/elements?
// • Why does JSON.parse(JSON.stringify(x)) fail on functions,
//   undefined values, Dates, and circular references? (you don't
//   need to handle circular refs here — just know why it's a trap)

// ── YOUR SOLUTION ──────────────────────────────────────────

function deepClone(value) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

if (require.main === module) {
  let score = 0;
  let total = 0;

  function check(label, ok) {
    total++;
    score += ok ? 1 : 0;
    console.log(`Test ${total} (${label}): ${ok ? '✅' : '❌'}`);
  }

  const original = { a: 1, b: { c: [1, 2, { d: 3 }] } };
  const clone = deepClone(original);

  check('deep equal in value', JSON.stringify(clone) === JSON.stringify(original));
  check('top-level object is a different reference', clone !== original);
  check('nested object is a different reference', clone.b !== original.b);
  check('nested array is a different reference', clone.b.c !== original.b.c);

  clone.b.c[2].d = 999;
  check('mutating clone does not affect original', original.b.c[2].d === 3);

  const arrClone = deepClone([1, [2, 3], { x: 4 }]);
  check('clones top-level arrays too', JSON.stringify(arrClone) === JSON.stringify([1, [2, 3], { x: 4 }]));

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

module.exports = { deepClone };
