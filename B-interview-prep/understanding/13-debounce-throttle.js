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

// THINK BEFORE CODING ──────────────────────────────────────
// • debounce needs to remember ONE thing across calls: the current
//   pending timer id, in a closure variable. What must EVERY call do
//   to that timer before starting a new one? (clear it — that's what
//   makes rapid calls "reset the clock" instead of stacking up)
// • Why does only the LAST call's arguments end up being used, given
//   every call schedules its own `fn(...args)`? (each new call cancels
//   the previous pending one before it ever fires)
// • throttle needs a boolean flag ("am I on cooldown?") in closure
//   state instead of a timer id. What does a call do when the flag is
//   true vs false? When does the flag get reset?
// • debounce vs throttle — which one is right for a search-box
//   autocomplete that shouldn't fire a request on every keystroke?
//   Which one is right for a scroll-position handler that should
//   still fire periodically WHILE the user keeps scrolling?

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
