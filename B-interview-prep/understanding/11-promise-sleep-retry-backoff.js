// ╔══════════════════════════════════════════════════════════╗
//   11: Promise-Based Sleep + Retry With Backoff        [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Part A — sleep(ms): return a promise that resolves after `ms`
// milliseconds.
//
// Part B — retryWithBackoff(fn, retries, baseDelay): call fn() (which
// returns a promise). If it rejects, wait, then retry — doubling the
// wait each time (exponential backoff) — up to `retries` total
// attempts. If every attempt fails, throw the last error. If any
// attempt succeeds, resolve with its value immediately.
//
// Input:   retryWithBackoff(fetchThatFailsTwice, 5, 100)
// Output:  resolves with the successful result on the 3rd attempt

// THINK BEFORE CODING ──────────────────────────────────────
// • `sleep` is the classic "wrap setTimeout in a Promise" pattern —
//   what's the executor callback, and does it need a reject path?
// • `retryWithBackoff` needs a loop that: tries `fn()`, and on success
//   returns immediately; on failure, decides whether to wait-and-retry
//   or give up. What's the loop bound — how many TOTAL attempts does
//   `retries` mean (is the first try attempt 1, or is it a "retry"
//   separate from the first try)?
// • "Exponential backoff" means the wait DOUBLES each failed attempt.
//   If `baseDelay` is 100ms, what should the wait be before attempt 2,
//   attempt 3, attempt 4? (100, 200, 400 — `baseDelay * 2 ** attemptIndex`)
// • Should you sleep AFTER the final failed attempt, right before
//   giving up? (no — there's no point waiting if you're not going to
//   try again)
// • What should the function do once all attempts are exhausted —
//   swallow the error, or propagate it? What should it propagate,
//   the first error or the last?

// ── YOUR SOLUTION ──────────────────────────────────────────

function sleep(ms) {
  // your code here
}

async function retryWithBackoff(fn, retries, baseDelay) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

async function main() {
  let score = 0;
  let total = 0;

  function check(label, ok, got) {
    total++;
    score += ok ? 1 : 0;
    console.log(`Test ${total} (${label}): ${ok ? '✅' : '❌'}${got !== undefined ? '  got ' + JSON.stringify(got) : ''}`);
  }

  // Succeeds on the 3rd attempt.
  let attempts1 = 0;
  const flaky = async () => {
    attempts1++;
    if (attempts1 < 3) throw new Error('transient failure');
    return 'ok';
  };
  const result1 = await retryWithBackoff(flaky, 5, 5);
  check('resolves after transient failures', result1 === 'ok' && attempts1 === 3, { result1, attempts1 });

  // Always fails — exhausts retries and rejects.
  let attempts2 = 0;
  const alwaysFails = async () => {
    attempts2++;
    throw new Error('permanent failure');
  };
  let threw = false;
  try {
    await retryWithBackoff(alwaysFails, 3, 5);
  } catch (err) {
    threw = true;
  }
  check('rejects with last error after exhausting retries', threw && attempts2 === 3, attempts2);

  // Succeeds on the first attempt — no retries needed.
  let attempts3 = 0;
  const succeedsImmediately = async () => {
    attempts3++;
    return 'instant';
  };
  const result3 = await retryWithBackoff(succeedsImmediately, 5, 5);
  check('resolves immediately without retrying', result3 === 'instant' && attempts3 === 1, attempts3);

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { sleep, retryWithBackoff };
