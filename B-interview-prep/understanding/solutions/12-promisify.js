// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/12-promisify.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Implement promisify For A Callback-Style Function
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: REST PARAMS + SPREAD ───────────────────────────
// The returned function accepts any number of leading arguments via
// rest params (`...args`), then forwards them to the original `fn`
// via spread, appending ONE more argument: a callback that bridges
// Node's error-first convention into the Promise executor's
// resolve/reject. This works for ANY callback-style function
// regardless of how many leading arguments it takes, because `args`
// is never assumed to have a fixed length.
function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// promisify is a HIGHER-ORDER FUNCTION: it takes a function and
// returns a new function with a different calling convention, without
// knowing anything about what the wrapped function actually does.
// The pattern — "capture args, call the real thing, translate its
// callback into resolve/reject" — is the same shape used by Node's
// own `util.promisify`.

// ── TRADE-OFFS ───────────────────────────────────────────────
// This version assumes a single-value success callback,
// `(err, result)`. Node's real `util.promisify` also supports
// multi-value callbacks like `(err, a, b)` by resolving with an array
// or object — worth mentioning as a known limitation if asked "is
// this exactly what util.promisify does?"

module.exports = { promisify };
