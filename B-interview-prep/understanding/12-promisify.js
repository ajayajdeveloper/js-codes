// ╔══════════════════════════════════════════════════════════╗
//   12: Implement promisify For A Callback-Style Function  [Medium]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement promisify(fn), where fn is a Node-style callback function
// — its LAST argument is a callback shaped (err, result) => {}.
// promisify(fn) returns a new function that takes the same leading
// arguments (without the callback) and returns a Promise: it resolves
// with `result` if err is falsy, or rejects with `err` otherwise.
//
// Input:   const getUser = promisify(getUserCb);
//          await getUser(1)
// Output:  { id: 1, name: 'User1' }

// THINK BEFORE CODING ──────────────────────────────────────
// • promisify returns a NEW function — what does that returned
//   function need to do when it's called: build a Promise, call the
//   ORIGINAL fn with the original args PLUS a new callback, and
//   resolve/reject from inside that callback.
// • The returned function must accept a variable number of leading
//   arguments (`getUserCb` takes 1, another callback-style fn might
//   take 3) — how do you forward "however many args were passed" plus
//   one more (the callback) to the original fn? (rest params + spread)
// • Node's callback convention is "error-first": `(err, result) => {}`.
//   How do you branch on that inside the executor?
// • Why does the returned function need to be declared with `(...args)`
//   rather than a fixed parameter list, given it has to work for ANY
//   callback-style function, not just one specific signature?

// ── YOUR SOLUTION ──────────────────────────────────────────

function promisify(fn) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

function getUserCb(id, callback) {
  setTimeout(() => {
    if (id < 0) callback(new Error('invalid id'));
    else callback(null, { id, name: `User${id}` });
  }, 5);
}

async function main() {
  let score = 0;
  let total = 0;

  function check(label, ok, got) {
    total++;
    score += ok ? 1 : 0;
    console.log(`Test ${total} (${label}): ${ok ? '✅' : '❌'}  got ${JSON.stringify(got)}`);
  }

  const getUser = promisify(getUserCb);

  const result1 = await getUser(1);
  check('resolves with the callback result', JSON.stringify(result1) === JSON.stringify({ id: 1, name: 'User1' }), result1);

  let threw = false;
  let errorMessage;
  try {
    await getUser(-1);
  } catch (err) {
    threw = true;
    errorMessage = err.message;
  }
  check('rejects with the callback error', threw && errorMessage === 'invalid id', errorMessage);

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { promisify };
