// ╔════════════════════════════════════════════════════════════╗
//  04: Best Time to Buy and Sell Stock                   [Easy]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// prices[i] is the stock price on day i. Choose a single day to buy
// and a later day to sell to maximize profit. Return 0 if no profit
// is possible.
//
// Input:   maxProfit([7, 1, 5, 3, 6, 4])
// Output:  5  (buy at 1, sell at 6)

// YOUR SOLUTION ─────────────────────────────────────────────

function maxProfit(prices) {

  let min = prices[0];
  let max = 0

  for(let i = 1; i < prices.length; i++){
    if((prices[i] - min) > max ){
      max = Math.max(max, prices[i]- min)
    }else if(min > prices[i]){
      min = prices[i]
    }
        
  }

 return max
}

// TESTS ─────────────────────────────────────────────────────

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
