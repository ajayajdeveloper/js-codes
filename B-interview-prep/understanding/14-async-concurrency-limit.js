// ╔══════════════════════════════════════════════════════════╗
//   14: Process An Array Of Async Tasks With A Concurrency Limit  [Medium-Hard]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement runWithLimit(taskFns, limit), where taskFns is an array
// of zero-arg functions that each return a promise. Run them so that
// AT MOST `limit` are in flight at any given moment — as soon as one
// finishes, the next queued task starts. Return an array of results
// in the SAME ORDER as the input tasks (not completion order).
//
// Input:  10 tasks, limit = 3
// Output: array of 10 results, order matching input, never more than
//         3 running concurrently.

// THINK BEFORE CODING ──────────────────────────────────────
// • Why doesn't `Promise.all(taskFns.map(fn => fn()))` satisfy the
//   requirement? (it starts every task the instant it's called —
//   there's no limit at all)
// • A common approach: spin up exactly `limit` "worker" loops. Each
//   worker repeatedly grabs the next unclaimed task index off a
//   SHARED cursor, runs it, stores the result at that index, and
//   repeats until no tasks remain. Then `Promise.all` the workers.
// • Why does storing results by INDEX (not by push order) guarantee
//   the output order matches input order, even though tasks may
//   finish in a different order than they started?
// • What happens if `limit` is greater than `taskFns.length`? Does
//   your worker-count calculation handle that without spinning up
//   pointless idle workers?

// ── YOUR SOLUTION ──────────────────────────────────────────

async function runWithLimit(taskFns, limit) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function main() {
  let score = 0;
  let total = 0;

  function check(label, ok, got) {
    total++;
    score += ok ? 1 : 0;
    console.log(`Test ${total} (${label}): ${ok ? '✅' : '❌'}${got !== undefined ? '  got ' + JSON.stringify(got) : ''}`);
  }

  const tasks1 = [
    () => delay(30, 'A'),
    () => delay(10, 'B'),
    () => delay(20, 'C'),
    () => delay(5, 'D'),
  ];
  const result1 = await runWithLimit(tasks1, 2);
  check('results in input order', JSON.stringify(result1) === JSON.stringify(['A', 'B', 'C', 'D']), result1);

  let active = 0;
  let maxActive = 0;
  const makeTrackedTask = (ms) => async () => {
    active++;
    maxActive = Math.max(maxActive, active);
    await delay(ms, null);
    active--;
    return ms;
  };
  const tasks2 = Array.from({ length: 8 }, (_, i) => makeTrackedTask(5 + (i % 3) * 5));
  await runWithLimit(tasks2, 3);
  check('never exceeds concurrency limit of 3', maxActive <= 3, maxActive);

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { runWithLimit };
