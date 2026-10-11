// ⚠️  SPOILERS — Attempt workspace/10-valid-parentheses.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Valid Parentheses
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(n) space
// Repeatedly remove any adjacent matching pair until no more
// removals are possible; valid if the string empties out.
function isValidParenthesesBrute(s) {
  const pairs = ['()', '[]', '{}'];
  let str = s;
  let changed = true;

  while (changed) {
    changed = false;
    for (const pair of pairs) {
      if (str.includes(pair)) {
        str = str.replace(pair, '');
        changed = true;
      }
    }
  }

  return str.length === 0;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Stack-based matching: push openers, and on a closer, check that
// the top of the stack is the matching opener.
function isValidParentheses(s) {
  const closerToOpener = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else if (ch === ')' || ch === ']' || ch === '}') {
      if (stack.pop() !== closerToOpener[ch]) return false;
    }
  }

  return stack.length === 0;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Brackets nest in LIFO order — the most recently opened bracket
// must be the next one closed — which is exactly what a stack
// models. Two failure modes to remember: a closer that doesn't
// match the top of the stack (or the stack is empty), and leftover
// unclosed openers at the end (stack not empty when done).

// ── TRADE-OFFS ───────────────────────────────────────────────
// String-replace brute force: O(n²) from repeated scans/replaces,
// only worth mentioning to show why it's inferior.
// Stack: O(n) single pass — the correct, expected interview answer.
