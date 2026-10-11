// ╔══════════════════════════════════════════════════════════╗
//   11: Three Promises In Parallel, Handle Partial Failure  [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement runInParallel(taskFns), where taskFns is an array of
// zero-arg functions that each RETURN a promise. Run them all in
// parallel and, once every one has settled (whether it resolved or
// rejected), return:
//   { fulfilled: [...values in original order], rejected: [...error messages in original order] }
// A single failing task must NOT stop the others from completing.
//
// Input:  three tasks — one resolves 'A', one rejects Error('B failed'), one resolves 'C'
// Output: { fulfilled: ['A', 'C'], rejected: ['B failed'] }

// THINK BEFORE CODING ──────────────────────────────────────
// • Promise.all vs Promise.allSettled — which one keeps going even
//   if one promise rejects? What does each resolve to?
// • What shape does Promise.allSettled give you per-promise?
//   ({ status: 'fulfilled', value } or { status: 'rejected', reason })
// • Given that array of settled results, how do you split it into
//   the two buckets, preserving original order within each bucket?
// • Why does taskFns hold FUNCTIONS that return promises, rather
//   than promises directly? (so the tasks don't all start executing
//   the instant the array is built)

// ── YOUR SOLUTION ──────────────────────────────────────────

async function runInParallel(taskFns) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const delay = (ms, value, shouldReject) =>
  new Promise((resolve, reject) =>
    setTimeout(() => (shouldReject ? reject(new Error(value)) : resolve(value)), ms)
  );

async function main() {
  let score = 0;
  let total = 0;

  function check(label, ok, got) {
    total++;
    score += ok ? 1 : 0;
    console.log(`Test ${total} (${label}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(got)}`);
  }

  const result1 = await runInParallel([
    () => delay(10, 'A', false),
    () => delay(5, 'B failed', true),
    () => delay(1, 'C', false),
  ]);
  check(
    'mixed success/failure, order preserved',
    JSON.stringify(result1) === JSON.stringify({ fulfilled: ['A', 'C'], rejected: ['B failed'] }),
    result1
  );

  const result2 = await runInParallel([
    () => delay(1, 'X', false),
    () => delay(1, 'Y', false),
  ]);
  check(
    'all succeed',
    JSON.stringify(result2) === JSON.stringify({ fulfilled: ['X', 'Y'], rejected: [] }),
    result2
  );

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { runInParallel };
