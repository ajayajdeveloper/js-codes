// ⚠️  SPOILERS — Attempt C-leetcode-grind/drilling/04-best-time-to-buy-sell-stock.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Best Time to Buy and Sell Stock
// ══════════════════════════════════════════════════════════════

// O(n) time  O(1) space
function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const p of prices) {
    minPrice = Math.min(minPrice, p);
    best = Math.max(best, p - minPrice);
  }
  return best;
}

const TESTS = [
  { args: [[7, 1, 5, 3, 6, 4]], expected: 5 },
  { args: [[7, 6, 4, 3, 1]], expected: 0 },
  { args: [[2, 4, 1]], expected: 2 },
  { args: [[1]], expected: 0 },
  { args: [[]], expected: 0 },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = maxProfit(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { maxProfit, TESTS };
