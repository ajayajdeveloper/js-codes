// ╔══════════════════════════════════════════════════════════╗
//   Problem 24: Memoize                [Medium]  [Closures/HOF]
//   node coach.js problem 24  → guiding questions
//   node coach.js hint 24 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement a memoize(fn) function.
// It returns a NEW function that:
//   • On the first call with given arguments → runs fn, caches result
//   • On repeat calls with the SAME arguments → returns cached result
//     without calling fn again
//
// const slowDouble = (n) => { /* slow computation */ return n * 2; }
// const fastDouble = memoize(slowDouble);
//
// fastDouble(5)  → 10  (computed)
// fastDouble(5)  → 10  (from cache — fn NOT called again)
// fastDouble(3)  → 6   (computed, new argument)
//
// THINK BEFORE CODING ──────────────────────────────────────
// • memoize must RETURN a function — that means you'll use a closure.
//   Where does the cache live? Inside memoize, outside the returned fn.
// • The cache key must represent the arguments. For single-argument
//   functions, the argument itself works. For multiple: JSON.stringify(args).
// • What does the returned function do before calling the original fn?
// • This is a Higher-Order Function: a function that takes and returns
//   another function. Can you spot the HOF pattern?

// ── YOUR SOLUTION ──────────────────────────────────────────

function memoize(fn) {
  // your code here — return a new function
}

// ── TESTS ──────────────────────────────────────────────────

if (require.main === module) {
  let callCount = 0;

  const expensiveAdd = (a, b) => {
    callCount++;
    return a + b;
  };

  const memoAdd = memoize(expensiveAdd);

  const check = (label, got, expected) => {
    const ok = JSON.stringify(got) === JSON.stringify(expected);
    console.log(`${ok ? '✅' : '❌'}  ${label}  got=${JSON.stringify(got)}`);
    return ok ? 1 : 0;
  };

  let score = 0;
  const total = 5;

  callCount = 0;
  score += check("memoAdd(2,3) = 5",   memoAdd(2, 3), 5);
  score += check("callCount = 1",       callCount,     1);

  score += check("memoAdd(2,3) = 5 (cached)", memoAdd(2, 3), 5);
  score += check("callCount still 1",   callCount,     1);

  score += check("memoAdd(4,5) = 9",   memoAdd(4, 5), 9);

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

module.exports = { memoize };
