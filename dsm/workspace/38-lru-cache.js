// ╔══════════════════════════════════════════════════════════╗
//   Problem 38: LRU Cache         [Medium]  [Design/HashMap+DLL]
//   node coach.js problem 38  → guiding questions
//   node coach.js hint 38 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Design a Least Recently Used (LRU) cache with a fixed capacity.
// It must support two operations, BOTH in O(1) average time:
//   - get(key): return the value if the key exists, else -1.
//               Accessing a key marks it as "recently used".
//   - put(key, value): insert or update the value. If this
//               causes the cache to exceed its capacity, evict
//               the LEAST recently used entry first.
//
// Example (classic LeetCode sequence), capacity = 2:
//   put(1,1)         → cache: {1=1}
//   put(2,2)         → cache: {1=1, 2=2}
//   get(1)   → 1     → cache: {2=2, 1=1}   (1 is now most recent)
//   put(3,3)         → evicts 2 (LRU)      → cache: {1=1, 3=3}
//   get(2)   → -1    (evicted)
//   put(4,4)         → evicts 1 (LRU)      → cache: {3=3, 4=4}
//   get(1)   → -1    (evicted)
//   get(3)   → 3
//   get(4)   → 4

// THINK BEFORE CODING ──────────────────────────────────────
// • What data structure gives O(1) key lookup? What additionally
//   gives you O(1) "move this entry to the most-recently-used end"?
// • JavaScript's Map preserves INSERTION order during iteration —
//   how could deleting-then-re-inserting a key exploit that to
//   track recency without a manual linked list?
// • On get(key): if present, how do you mark it as most recent
//   using only Map operations (no array indexOf/splice — those
//   aren't O(1))?
// • On put(key, value) when at capacity: which key is "least
//   recently used" if recency order = Map iteration order?
//   (Hint: Map's `.keys().next().value` gives the oldest entry.)

// ── YOUR SOLUTION ──────────────────────────────────────────

class LRUCache {
  constructor(capacity) {
    // your code here
  }

  get(key) {
    // your code here
  }

  put(key, value) {
    // your code here
  }
}

// ── TESTS ──────────────────────────────────────────────────
// Classic LeetCode sequence:
//   ["LRUCache","put","put","get","put","get","put","get","get","get"]
//   [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
//   → [null,null,null,1,null,-1,null,-1,3,4]

const TESTS = [
  { op: 'put', args: [1, 1], expected: null },
  { op: 'put', args: [2, 2], expected: null },
  { op: 'get', args: [1],    expected: 1 },
  { op: 'put', args: [3, 3], expected: null },
  { op: 'get', args: [2],    expected: -1 },
  { op: 'put', args: [4, 4], expected: null },
  { op: 'get', args: [1],    expected: -1 },
  { op: 'get', args: [3],    expected: 3 },
  { op: 'get', args: [4],    expected: 4 },
];

if (require.main === module) {
  const cache = new LRUCache(2);
  let score = 0;
  let totalGets = 0;

  TESTS.forEach(({ op, args, expected }, i) => {
    if (op === 'get') {
      const result = cache.get(...args);
      totalGets++;
      const ok = result === expected;
      score += ok ? 1 : 0;
      console.log(`Test ${i + 1} (get(${args[0]})): ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}, expected ${JSON.stringify(expected)}`);
    } else {
      cache.put(...args);
      console.log(`Test ${i + 1} (put(${args.join(', ')})): ⚪ (no check — void op)`);
    }
  });

  console.log(`\n${score}/${totalGets} passed${score === totalGets ? ' 🎉' : ''}`);
  if (score < totalGets) process.exit(1);
}

module.exports = { LRUCache, TESTS };
