// ⚠️  SPOILERS — Attempt workspace/22-number-of-islands.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Number of Islands
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(rows·cols) time  O(rows·cols) space
// DFS flood-fill, but track visited cells in a separate Set
// instead of mutating the grid. Functionally identical to the
// optimal approach — just avoids touching the input.
function numIslandsBrute(grid) {
  if (!grid || !grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  const visited = new Set();
  let count = 0;

  function dfs(r, c) {
    const key = `${r},${c}`;
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    if (grid[r][c] !== '1' || visited.has(key)) return;
    visited.add(key);
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1' && !visited.has(`${r},${c}`)) {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}

// ── OPTIMAL ──────────────────────────── O(rows·cols) time  O(rows·cols) space (call stack)
// Same flood-fill, but mutate the grid in place (sink '1's to
// '0's as we visit them) instead of a separate visited Set —
// saves the extra hash-set bookkeeping.
function numIslands(grid) {
  if (!grid || !grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Every unvisited '1' you scan starts exactly one NEW island —
// flood-fill immediately marks its entire connected component so
// it's never counted twice. The scan order doesn't matter; only
// that visited land is never revisited.

// ── TRADE-OFFS ───────────────────────────────────────────────
// A visited Set keeps the input grid untouched (safer if the
// caller needs the original data afterward) at the cost of extra
// space and hashing overhead. Mutating the grid directly is
// simpler and avoids that overhead when mutation is acceptable.
