// ⚠️  SPOILERS — Attempt workspace/38-lru-cache.js first!
// ════════════════════════════════════════════════════════════
//  Solution: LRU Cache
// ════════════════════════════════════════════════════════════

// ── OPTIMAL ──────────────────────────── O(1) average time  O(capacity) space
// JS Maps preserve INSERTION order during iteration, and re-inserting
// an existing key doesn't change its position unless you delete it
// first. We exploit that: every time a key is touched (get or put),
// delete it and re-insert it, pushing it to the "most recent" end
// of the Map's iteration order. The "least recently used" key is
// then always whatever key.next().value from map.keys() gives —
// the OLDEST entry still present.
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    // Refresh recency: delete + re-insert moves it to the end.
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      // Refresh recency before updating the value.
      this.map.delete(key);
    } else if (this.map.size >= this.capacity) {
      // Evict the least recently used entry — the first key
      // in iteration order.
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A Map's iteration order tracks insertion order, and JS
// guarantees O(1) average get/set/delete/has — so delete+re-insert
// is an O(1) way to "bump" a key to the most-recently-used position
// without maintaining pointers by hand. The classic textbook answer
// is a doubly linked list + hashmap, where each node holds prev/next
// pointers and the hashmap maps key → node — that gives TRUE O(1)
// worst-case operations without relying on any particular engine's
// Map iteration-order guarantee, and is what interviewers often want
// you to implement from scratch to prove you understand the mechanics.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Map-based:     concise, correct, and O(1) in practice in JS — but
//   leans on the language guaranteeing insertion-order iteration.
// Doubly linked list + hashmap: more code (manual node management,
//   prev/next rewiring on every access), but is the "from scratch"
//   approach that doesn't depend on any collection's iteration order,
//   and is usually what's expected in a rigorous interview setting.
