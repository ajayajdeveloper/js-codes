// ⚠️  SPOILERS — Attempt workspace/28-decode-ways.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Decode Ways
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(2^n) time  O(n) space
// Recursively try decoding one digit, then two digits, from each
// position. Exponential — the same suffix gets re-explored via
// many different earlier decoding choices.
function numDecodingsBrute(s) {
  function helper(i) {
    if (i === s.length) return 1;
    if (s[i] === '0') return 0;
    let ways = helper(i + 1);
    if (i + 1 < s.length) {
      const twoDigit = Number(s.slice(i, i + 2));
      if (twoDigit <= 26) ways += helper(i + 2);
    }
    return ways;
  }
  return helper(0);
}

// ── BETTER ───────────────────────────── O(n) time  O(n) space
// Bottom-up DP array. dp[i] = number of ways to decode the prefix
// of length i. dp[0] = 1 (the empty prefix has exactly one, trivial,
// decoding) which is what makes the very first character's
// recurrence work without a special case.
function numDecodingsBetter(s) {
  const n = s.length;
  if (n === 0) return 0;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] !== '0' ? 1 : 0;
  for (let i = 2; i <= n; i++) {
    if (s[i - 1] !== '0') dp[i] += dp[i - 1];
    const twoDigit = Number(s.slice(i - 2, i));
    if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i - 2];
  }
  return dp[n];
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Only the previous two dp values are ever needed, so collapse
// the array into two rolling variables — same trick as House
// Robber and Coin Change's space optimization.
function numDecodings(s) {
  if (!s || s[0] === '0') return 0;
  const n = s.length;
  let prev2 = 1; // dp[i-2], starts as dp[0]
  let prev1 = 1; // dp[i-1], starts as dp[1] (valid since s[0] !== '0')
  for (let i = 1; i < n; i++) {
    let curr = 0;
    if (s[i] !== '0') curr += prev1;
    const twoDigit = Number(s.slice(i - 1, i + 1));
    if (twoDigit >= 10 && twoDigit <= 26) curr += prev2;
    if (curr === 0) return 0; // dead end — no valid decoding continues from here
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// A '0' can NEVER stand alone (no letter maps to it) but CAN be
// the second digit of a valid two-digit code (10 or 20). Treating
// dp[0] = 1 as the "empty prefix has one way" base case is what
// lets the one-digit and two-digit branches share one uniform
// recurrence without special-casing the string's start.

// ── TRADE-OFFS ───────────────────────────────────────────────
// The recursive version mirrors the decision tree directly but is
// exponential. The full dp array fixes that in O(n) time/space;
// collapsing to two rolling variables keeps O(n) time but drops to
// O(1) space, with an early-exit the moment a position becomes
// undecodable.
