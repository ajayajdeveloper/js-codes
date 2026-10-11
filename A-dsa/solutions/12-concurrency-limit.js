// ⚠️  SPOILERS — Attempt A-dsa/12-concurrency-limit.js first!
// ════════════════════════════════════════════════════════════
//  Solution: N Tasks With A Concurrency Limit Of 3
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: WORKER POOL WITH A SHARED CURSOR ──── O(n) time  O(n) space
// Promise.all(taskFns.map(fn => fn())) starts every task the instant
// it's called — there's no limit at all. Instead, spin up exactly
// `limit` "workers". Each worker is a loop: grab the next unclaimed
// task index off a SHARED cursor, run it, store the result at that
// index, then go grab another — until the cursor runs out.
// Storing by INDEX (not by push order) is what guarantees the output
// matches input order even though tasks may finish in any order —
// a fast task 3 slots later can finish before a slow task 1 slot
// earlier, but each writes only to its own index.
async function runWithLimit(taskFns, limit) {
  const results = new Array(taskFns.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < taskFns.length) {
      const currentIndex = nextIndex;
      nextIndex++;
      results[currentIndex] = await taskFns[currentIndex]();
    }
  }

  const workerCount = Math.min(limit, taskFns.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);

  return results;
}

// ── ALTERNATIVE: FIXED BATCHES ─────────────────── O(n) time  O(n) space
// Split tasks into chunks of `limit` and run each chunk fully before
// starting the next. Simpler to write, but NOT the same as a true
// concurrency limit: if one task in a batch is slow, the other
// `limit - 1` slots sit idle waiting for the whole batch to finish
// instead of immediately picking up the next queued task. This is
// the version worth recognizing as a common but imperfect shortcut.
async function runWithLimitBatched(taskFns, limit) {
  const results = [];
  for (let start = 0; start < taskFns.length; start += limit) {
    const batch = taskFns.slice(start, start + limit);
    const batchResults = await Promise.all(batch.map((fn) => fn()));
    results.push(...batchResults);
  }
  return results;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A true concurrency limit needs a shared, mutable sense of "what's
// next" (the cursor) that all workers pull from — that's what lets
// a free worker immediately pick up new work the moment it finishes,
// regardless of what any other worker is doing. Fixed batching fakes
// the limit but couples unrelated tasks' start times together.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Worker pool:    correctly keeps exactly `limit` tasks in flight at
//                 all times — the right answer to what the problem
//                 actually asks.
// Fixed batches:  simpler mental model, but wastes concurrency
//                 whenever task durations within a batch are uneven;
//                 also handles `limit > taskFns.length` for free
//                 since Math.min-equivalent falls out of slice().

module.exports = {
  runWithLimit,
  runWithLimitBatched,
};
