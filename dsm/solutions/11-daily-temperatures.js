// ⚠️  SPOILERS — Attempt workspace/11-daily-temperatures.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Daily Temperatures
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(n) space
// For each day, scan forward until a warmer temperature appears.
function dailyTemperaturesBrute(temps) {
  const result = new Array(temps.length).fill(0);
  for (let i = 0; i < temps.length; i++) {
    for (let j = i + 1; j < temps.length; j++) {
      if (temps[j] > temps[i]) {
        result[i] = j - i;
        break;
      }
    }
  }
  return result;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(n) space
// Monotonic decreasing stack of INDICES. Walk left to right; while
// the current temp is warmer than the temp at the index on top of
// the stack, pop it and record the day-distance. Push current index.
function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = []; // indices, temps[stack] strictly decreasing

  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const j = stack.pop();
      result[j] = i - j;
    }
    stack.push(i);
  }
  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Each index is pushed once and popped at most once, so the stack
// approach is O(n) total even though it looks nested. The stack
// always holds indices "waiting" for a warmer future day, kept in
// decreasing temperature order from bottom to top.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force is easy to explain but O(n²) — painful for large inputs.
// The monotonic stack trades a bit of conceptual overhead for true
// O(n), since every element is pushed/popped at most once.
