// ⚠️  SPOILERS — Attempt workspace/29-generate-parentheses.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Generate Parentheses
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(2^(2n) · n) time  O(2^(2n) · n) space
// Generate ALL 2^(2n) possible strings of '(' and ')' of length
// 2n, then filter down to the ones that are validly balanced.
// Wildly wasteful, but a clear starting point.
function generateParenthesisBrute(n) {
  const results = [];
  function isValid(str) {
    let balance = 0;
    for (const ch of str) {
      balance += ch === '(' ? 1 : -1;
      if (balance < 0) return false;
    }
    return balance === 0;
  }
  function build(current) {
    if (current.length === 2 * n) {
      if (isValid(current)) results.push(current);
      return;
    }
    build(current + '(');
    build(current + ')');
  }
  build('');
  return results;
}

// ── OPTIMAL ──────────────────────────── O(4^n / √n) time  O(n) space (excluding output)
// Backtracking that only ever builds VALID prefixes, so no
// filtering step is needed. Track how many '(' and ')' have been
// placed so far: add '(' whenever we haven't used all n yet; add
// ')' only when it wouldn't outnumber the '(' already placed
// (i.e., the string would still be a legal prefix).
function generateParenthesis(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) backtrack(current + '(', open + 1, close);
    if (close < open) backtrack(current + ')', open, close + 1);
  }

  backtrack('', 0, 0);
  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The constraint "close < open" is the whole trick: it guarantees
// every PREFIX we ever build is already balanced-so-far, so we
// never generate an invalid string in the first place — no need
// to validate after the fact.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Generate-then-filter is simple to reason about but wastes huge
// amounts of work on strings that can never be valid. Backtracking
// with the open/close guard only explores the (much smaller) space
// of valid prefixes, which is the standard interview-ready answer.
