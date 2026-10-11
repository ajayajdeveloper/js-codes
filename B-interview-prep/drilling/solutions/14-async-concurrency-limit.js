// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/14-async-concurrency-limit.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Process An Array Of Async Tasks With A Concurrency Limit
// ════════════════════════════════════════════════════════════

// O(n) time  O(n) space
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

module.exports = { runWithLimit };
