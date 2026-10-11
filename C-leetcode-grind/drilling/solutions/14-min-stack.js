// ⚠️  SPOILERS — Attempt C-leetcode-grind/drilling/14-min-stack.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Min Stack
// ══════════════════════════════════════════════════════════════

// O(1) time for every operation  O(n) space
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// Each test runs a sequence of operations against a fresh MinStack,
// LeetCode-judge style: ops[0] is always "MinStack" (the constructor).

const TESTS = [
  {
    ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
    args: [[], [-2], [0], [-3], [], [], [], []],
    expected: [null, null, null, null, -3, null, 0, -2],
  },
  {
    ops: ['MinStack', 'push', 'push', 'getMin', 'pop', 'getMin'],
    args: [[], [1], [2], [], [], []],
    expected: [null, null, null, 1, null, 1],
  },
];

function runOps(ops, args) {
  let stack;
  return ops.map((op, i) => {
    if (op === 'MinStack') {
      stack = new MinStack();
      return null;
    }
    const result = stack[op](...args[i]);
    return result === undefined ? null : result;
  });
}

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ ops, args, expected }, i) => {
    const result = runOps(ops, args);
    const ok = JSON.stringify(result) === JSON.stringify(expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { MinStack, TESTS };
