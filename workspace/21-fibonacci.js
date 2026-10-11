// ╔══════════════════════════════════════════════════════════╗
//   Problem 21: Fibonacci              [Medium]  [Recursion/Memo]
//   node coach.js problem 21  → guiding questions
//   node coach.js hint 21 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Return the nth Fibonacci number (0-indexed).
// fib(0) = 0, fib(1) = 1, fib(n) = fib(n-1) + fib(n-2)
//
// Input:   0  → 0
// Input:   1  → 1
// Input:   7  → 13
// Input:   10 → 55
//
// CHALLENGE — implement it THREE ways in order:
//   1. Pure recursion          (simple but slow — why?)
//   2. Recursion + memoization (fast — cache results in a Map/object)
//   3. Iterative bottom-up     (O(n) time, O(1) space)
//
// THINK BEFORE CODING ──────────────────────────────────────
// • Draw the call tree for fib(5). How many times is fib(2) called?
//   That repeated work is the problem with plain recursion.
// • Memoization: before computing, check if the answer is already cached.
//   After computing, store it. What is the cache key?
// • Iterative: you only ever need the last TWO values. Use two variables.

// ── YOUR SOLUTION ──────────────────────────────────────────

function fib(n) {
  // your code here
  // try all three approaches — comment out the ones you're not testing
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2)

  const cache = new Map();
  if (cache.has(n)) return cache.get(n);
  const result = fib(n-1) + fib(n-2);
  cache.set(n, result);
  return result;
  
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [0],  expected: 0  },
  { args: [1],  expected: 1  },
  { args: [2],  expected: 1  },
  { args: [5],  expected: 5  },
  { args: [7],  expected: 13 },
  { args: [10], expected: 55 },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = fib(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { fib, TESTS };
