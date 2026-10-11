// ⚠️  SPOILERS — Attempt A-dsa/11-promise-parallel.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Three Promises In Parallel, Handle Partial Failure
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: PROMISE.ALLSETTLED ────────────────── O(n) time  O(n) space
// taskFns holds FUNCTIONS, not promises, so that calling fn() for
// each one is what kicks off the async work — building an array of
// already-created promises would start them all instantly with no
// control over the moment they launch. Map to promises, THEN await
// them together.
// Promise.allSettled waits for every promise to settle (success or
// failure) — unlike Promise.all, one rejection doesn't short-circuit
// the rest. Each result comes back tagged: { status: 'fulfilled',
// value } or { status: 'rejected', reason }. Walking that array in
// order and bucketing by status naturally preserves each bucket's
// original relative order.
async function runInParallel(taskFns) {
  const settled = await Promise.allSettled(taskFns.map((fn) => fn()));

  const fulfilled = [];
  const rejected = [];
  for (const result of settled) {
    if (result.status === 'fulfilled') {
      fulfilled.push(result.value);
    } else {
      rejected.push(result.reason.message);
    }
  }

  return { fulfilled, rejected };
}

// ── ALTERNATIVE: PROMISE.ALL + PER-TASK CATCH ──── O(n) time  O(n) space
// Without allSettled, you can get the same "don't stop on failure"
// behavior by catching each promise individually and tagging its
// outcome yourself before handing the whole batch to Promise.all —
// by the time Promise.all sees them, every promise already resolves
// (never rejects), so nothing short-circuits.
async function runInParallelManualCatch(taskFns) {
  const tagged = await Promise.all(
    taskFns.map((fn) =>
      fn()
        .then((value) => ({ ok: true, value }))
        .catch((err) => ({ ok: false, error: err.message }))
    )
  );

  const fulfilled = [];
  const rejected = [];
  for (const outcome of tagged) {
    if (outcome.ok) {
      fulfilled.push(outcome.value);
    } else {
      rejected.push(outcome.error);
    }
  }

  return { fulfilled, rejected };
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// "Run in parallel but tolerate individual failures" always comes
// down to the same shape: make sure NOTHING you hand to the final
// aggregator (Promise.all/allSettled) can reject on its own — either
// by using a settle-and-tag primitive (allSettled) or by tagging
// outcomes yourself with .then/.catch before aggregating.

// ── TRADE-OFFS ───────────────────────────────────────────────
// allSettled:      built-in, least code, the tagging is done for you.
// Manual catch:    more code, but the pattern generalizes — e.g. you
//                  could attach per-task metadata (which task index
//                  failed, timing, retries) to the tagged object,
//                  which allSettled's fixed shape doesn't give you.

module.exports = {
  runInParallel,
  runInParallelManualCatch,
};
