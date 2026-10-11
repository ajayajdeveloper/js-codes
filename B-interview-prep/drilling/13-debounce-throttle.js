// ╔══════════════════════════════════════════════════════════╗
//   13: Write A Debounce And A Throttle               [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// debounce(fn, wait): return a wrapped function that only calls fn
// after `wait` ms have passed with NO new calls — each new call
// resets the timer. Only the LAST call's arguments are used.
//
// throttle(fn, wait): return a wrapped function that calls fn
// IMMEDIATELY on the first call, then ignores further calls until
// `wait` ms have passed (leading-edge throttle).
//
// Input:   const d = debounce(save, 300); d(); d(); d();  (all within 300ms)
// Output:  save() is called exactly ONCE, after the last call + 300ms

// ── YOUR SOLUTION ──────────────────────────────────────────

function debounce(fn, wait) {
  // your code here
}

function throttle(fn, wait) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  let score = 0;
  let total = 0;

  function check(label, ok, got) {
    total++;
    score += ok ? 1 : 0;
    console.log(`Test ${total} (${label}): ${ok ? '✅' : '❌'}${got !== undefined ? '  got ' + JSON.stringify(got) : ''}`);
  }

  // debounce: rapid calls collapse into one, using the LAST call's args.
  const debounceCalls = [];
  const debounced = debounce((x) => debounceCalls.push(x), 20);
  debounced(1);
  debounced(2);
  debounced(3);
  check('debounce: no call yet immediately after rapid calls', debounceCalls.length === 0, debounceCalls);
  await sleep(40);
  check('debounce: exactly one call, with the last args', JSON.stringify(debounceCalls) === JSON.stringify([3]), debounceCalls);

  // throttle: first call fires immediately; rapid follow-ups are ignored.
  const throttleCalls = [];
  const throttled = throttle((x) => throttleCalls.push(x), 20);
  throttled(1);
  throttled(2);
  throttled(3);
  check('throttle: only the first call fires immediately', JSON.stringify(throttleCalls) === JSON.stringify([1]), throttleCalls);
  await sleep(30);
  throttled(4);
  check('throttle: fires again after the cooldown passes', JSON.stringify(throttleCalls) === JSON.stringify([1, 4]), throttleCalls);

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { debounce, throttle };
