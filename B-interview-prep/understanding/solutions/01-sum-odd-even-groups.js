// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/01-sum-odd-even-groups.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Sum Of Odd And Even Numbers, Grouped
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: SINGLE-PASS REDUCE ─────────────── O(n) time  O(1) space
// Walk the array once, deciding per number which bucket it belongs
// to. The parity check must be `n % 2 !== 0`, NOT `n % 2 === 1` — in
// JS, `-1 % 2` evaluates to `-1`, not `1`, so the `=== 1` version
// silently misclassifies negative odd numbers as even.
function sumOddEven(nums) {
  return nums.reduce(
    (acc, n) => {
      if (n % 2 !== 0) acc.odd += n;
      else acc.even += n;
      return acc;
    },
    { odd: 0, even: 0 }
  );
}

// ── ALTERNATIVE: TWO FILTERS + TWO SUMS ─────── O(n) time  O(n) space
// Easier to read, but walks the array multiple times (filter, filter,
// then reduce, reduce) and allocates two intermediate arrays that the
// single-pass version never needs.
function sumOddEvenTwoPass(nums) {
  const odd = nums.filter((n) => n % 2 !== 0).reduce((a, b) => a + b, 0);
  const even = nums.filter((n) => n % 2 === 0).reduce((a, b) => a + b, 0);
  return { odd, even };
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The parity trap is the whole problem: `%` in JavaScript returns a
// result with the SAME SIGN as the dividend, not a true mathematical
// modulus. `-1 % 2 === -1`. Always compare against `!== 0`, never
// against `=== 1`, whenever negative numbers might be in play.

module.exports = { sumOddEven, sumOddEvenTwoPass };
