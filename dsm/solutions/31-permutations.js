// ⚠️  SPOILERS — Attempt workspace/31-permutations.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Permutations
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n! · n²) time  O(n! · n) space
// Backtrack, but build "remaining" as a filtered array copy at
// every recursive call — simple to reason about, but wasteful
// (filtering is O(n) per call, and happens n! · n times overall).
function permuteBrute(nums) {
  const result = [];
  if (nums.length === 0) return [[]];

  const backtrack = (remaining, path) => {
    if (remaining.length === 0) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      const next = remaining.filter((_, idx) => idx !== i);
      path.push(remaining[i]);
      backtrack(next, path);
      path.pop();
    }
  };

  backtrack(nums, []);
  return result;
}

// ── OPTIMAL ──────────────────────────── O(n! · n) time  O(n) extra space (excl. output)
// Use a `used` boolean array instead of rebuilding arrays each
// call. Same backtracking shape, but O(1) work to pick/unpick
// a candidate instead of O(n) filtering.
function permute(nums) {
  const result = [];
  if (nums.length === 0) return [[]];
  const used = new Array(nums.length).fill(false);
  const path = [];

  const backtrack = () => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack();
      path.pop();
      used[i] = false;
    }
  };

  backtrack();
  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Backtracking = choose → explore → un-choose. The `used` array
// (or in-place swapping) lets you avoid rebuilding the candidate
// pool on every recursive call, trading a filter/copy for an O(1)
// flag flip. Always push a COPY of `path` into the result — arrays
// are passed by reference, and `path` keeps mutating after you record it.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Filter-based:  intuitive, but O(n) overhead per branch — slower in practice.
// used[] array:  O(1) per branch, same asymptotic call count (n!).
// In-place swap: avoids the `used` array entirely (O(1) space beyond
//                recursion stack) but mutates `nums` during recursion,
//                so you must swap back exactly, and it's less readable.
