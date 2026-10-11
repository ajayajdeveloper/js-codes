// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/11-promise-sleep-retry-backoff.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Promise-Based Sleep + Retry With Backoff
// ════════════════════════════════════════════════════════════

// ── sleep: WRAP setTimeout IN A PROMISE ─────────────────────
// No reject path needed — a timer never "fails", it just eventually
// fires, so `resolve` is the only callback `setTimeout` needs.
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── retryWithBackoff: LOOP, CATCH, WAIT, RETRY ──────────────
// Try `fn()` up to `retries` times total (attempt indices 0..retries-1).
// On success, return immediately — no further attempts, no wait.
// On failure, record the error and, ONLY IF another attempt remains,
// sleep for `baseDelay * 2 ** attempt` before looping again — doubling
// each time is what makes it "exponential" backoff. If the loop
// finishes without ever returning, every attempt failed, so the LAST
// recorded error is thrown.
async function retryWithBackoff(fn, retries, baseDelay) {
  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries - 1) {
        await sleep(baseDelay * 2 ** attempt);
      }
    }
  }

  throw lastError;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The "don't sleep after the last failed attempt" guard
// (`attempt < retries - 1`) is easy to skip in a first draft — it
// doesn't break correctness, but it silently adds a pointless final
// wait before giving up, which matters a lot in a real system where
// that wait is user-facing latency for a request that was going to
// fail anyway.

// ── TRADE-OFFS ───────────────────────────────────────────────
// This shape (try/catch in a bounded loop, await a growing delay
// between attempts) is the standard pattern for network calls, flaky
// external APIs, and rate-limited endpoints — worth having memorized
// verbatim, since it comes up in real code as often as in interviews.

module.exports = { sleep, retryWithBackoff };
