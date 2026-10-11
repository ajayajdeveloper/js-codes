// ╔══════════════════════════════════════════════════════════╗
//   Problem 25: Compose Functions      [Medium]  [Functional/HOF]
//   node coach.js problem 25  → guiding questions
//   node coach.js hint 25 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Implement compose(...fns) — a function that takes any number
// of functions and returns a NEW function that applies them
// RIGHT TO LEFT (last function runs first).
//
// compose(f, g, h)(x) === f(g(h(x)))
//
// const double   = x => x * 2;
// const addOne   = x => x + 1;
// const square   = x => x * x;
//
// compose(double, addOne)(3) → double(addOne(3)) → double(4) → 8
// compose(addOne, double)(3) → addOne(double(3)) → addOne(6) → 7
// compose(square, addOne, double)(3)
//   → square(addOne(double(3)))
//   → square(addOne(6))
//   → square(7)
//   → 49
//
// THINK BEFORE CODING ──────────────────────────────────────
// • You receive functions as ...fns (rest parameters). It's an array.
// • The returned function takes an initial value x.
// • You need to apply fns right-to-left. Which array method
//   processes from right to left? (hint: reduceRight)
// • What is the accumulator in your reduce? What is the initial value?
// • What is pipe(f, g, h)? (left-to-right compose — just reverse the array!)

// ── YOUR SOLUTION ──────────────────────────────────────────

function compose(...fns) {
  // your code here — return a function
}

// BONUS: implement pipe — same idea but LEFT to RIGHT
function pipe(...fns) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  {
    label: "compose(double, addOne)(3) = 8",
    fn: () => {
      const double = x => x * 2;
      const addOne = x => x + 1;
      return compose(double, addOne)(3);
    },
    expected: 8,
  },
  {
    label: "compose(addOne, double)(3) = 7",
    fn: () => {
      const double = x => x * 2;
      const addOne = x => x + 1;
      return compose(addOne, double)(3);
    },
    expected: 7,
  },
  {
    label: "compose(square, addOne, double)(3) = 49",
    fn: () => {
      const double = x => x * 2;
      const addOne = x => x + 1;
      const square = x => x * x;
      return compose(square, addOne, double)(3);
    },
    expected: 49,
  },
  {
    label: "compose single fn: compose(addOne)(5) = 6",
    fn: () => compose(x => x + 1)(5),
    expected: 6,
  },
  {
    label: "pipe(double, addOne)(3) = 7",
    fn: () => {
      const double = x => x * 2;
      const addOne = x => x + 1;
      return pipe(double, addOne)(3);
    },
    expected: 7,
  },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ label, fn, expected }, i) => {
    const result = fn();
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  ${label}  got=${result}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { compose, pipe, TESTS };
