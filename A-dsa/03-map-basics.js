// ╔══════════════════════════════════════════════════════════╗
//   03: Map — create, set, get, has, delete, iterate, size  [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement runInventoryOps() to exercise the full Map API:
//   1. Create a new Map.
//   2. set()    'apples' → 10, 'bananas' → 5, 'cherries' → 20
//   3. get()    the value for 'bananas'
//   4. has()    whether 'apples' is in the map
//   5. delete() 'cherries'
//   6. iterate  the remaining entries into a plain array of [key, value] pairs
//   7. size     the map's final size
// Return: { gotBananas, hasApples, entries, size }

// THINK BEFORE CODING ──────────────────────────────────────
// • How is `new Map()` different from `{}`? (key types, ordering,
//   .size vs Object.keys().length)
// • map.set() returns the map itself — how does that enable chaining?
// • What are the three ways to iterate a Map? (for...of on the map
//   directly, .entries(), .keys()/.values())
// • [...map] vs [...map.entries()] — same thing?

// ── YOUR SOLUTION ──────────────────────────────────────────

function runInventoryOps() {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    args: [],
    expected: {
      gotBananas: 5,
      hasApples: true,
      entries: [['apples', 10], ['bananas', 5]],
      size: 2,
    },
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = runInventoryOps(...args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { runInventoryOps, TESTS };
