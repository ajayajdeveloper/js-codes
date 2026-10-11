// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/11-promise-sleep-retry-backoff.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Promise-Based Sleep + Retry With Backoff
// ════════════════════════════════════════════════════════════

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

module.exports = { sleep, retryWithBackoff };
