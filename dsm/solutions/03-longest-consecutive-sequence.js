// ⚠️  SPOILERS — Attempt workspace/03-longest-consecutive-sequence.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Longest Consecutive Sequence
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n log n) time  O(n) space
// Sort, then walk once counting consecutive runs (skipping duplicates).
function longestConsecutiveBrute(nums) {
  if (nums.length === 0) return 0;
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  let best = 1, current = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) {
      current++;
    } else {
      current = 1;
    }
    best = Math.max(best, current);
  }
  return best;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Put everything in a Set. Only start counting from numbers that
// are the START of a sequence (n - 1 is not in the set).
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;

  for (const n of set) {
    if (set.has(n - 1)) continue; // not a sequence start, skip

    let length = 1;
    let current = n;
    while (set.has(current + 1)) {
      current++;
      length++;
    }
    best = Math.max(best, length);
  }

  return best;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The "only count from sequence starts" trick is what makes this
// O(n) instead of O(n²): each number is visited by the inner while
// loop at most once across the entire run, because it will only be
// walked from its true sequence start.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Sort-based: simpler to reason about, O(n log n) — fine if sorting
// is already "free" (e.g. data arrives sorted).
// Set-based:  true O(n), the expected answer for this problem.
