// ⚠️  SPOILERS — Attempt workspace/30-combination-sum.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Combination Sum
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(2^target) time  O(target) space
// At every candidate, branch into "use it" (reuse allowed, stay
// at the same index) vs "skip it entirely" (move to the next
// index). This explores every subset of reuse-counts directly.
function combinationSumBrute(candidates, target) {
  const result = [];
  function helper(i, remaining, path) {
    if (remaining === 0) { result.push([...path]); return; }
    if (remaining < 0 || i === candidates.length) return;
    // include candidates[i] (may reuse it again later)
    path.push(candidates[i]);
    helper(i, remaining - candidates[i], path);
    path.pop();
    // exclude candidates[i] entirely from here on
    helper(i + 1, remaining, path);
  }
  helper(0, target, []);
  return result;
}

// ── OPTIMAL ──────────────────────────── O(2^target) time  O(target) space
// Same backtracking idea, expressed as a single loop over
// candidates from a moving `start` index instead of two explicit
// branches. Passing `i` (not `i + 1`) back into the recursion is
// what allows a candidate to be reused; only ever moving `start`
// forward is what prevents duplicate combinations like [2,3] and
// [3,2] from both appearing.
function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    if (remaining < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i], path);
      path.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Reuse vs. no-duplicate-combinations is controlled entirely by
// which index you pass into the recursive call: passing the SAME
// index (i) allows reusing that candidate; only ever moving the
// start index FORWARD (never backward) is what stops [2,3] and
// [3,2] from both being counted as separate results.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Both versions have the same worst-case branching factor. The
// loop-based version is the more common idiomatic form for
// "combination" backtracking problems and generalizes cleanly to
// variants like Combination Sum II (no reuse, has duplicates) by
// changing the recursive index and adding a skip-duplicates check.
