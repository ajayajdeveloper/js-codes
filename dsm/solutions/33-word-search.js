// ⚠️  SPOILERS — Attempt workspace/33-word-search.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Word Search
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(rows·cols·4^L) time  O(rows·cols) space
// Same DFS idea, but track visited cells with a separate boolean
// grid instead of mutating the board. Conceptually identical to
// the optimal solution, just with extra memory allocated up front.
function existBrute(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));

  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (visited[r][c] || board[r][c] !== word[i]) return false;

    visited[r][c] = true;
    const found =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);
    visited[r][c] = false;

    return found;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

// ── OPTIMAL ──────────────────────────── O(rows·cols·4^L) time  O(L) space (recursion stack)
// Same DFS/backtracking, but instead of a separate visited grid,
// temporarily overwrite the current cell with a sentinel character
// ('#') that can never match a letter, then restore it on the way
// back out. Saves the O(rows·cols) visited-grid allocation.
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[i]) return false;

    const original = board[r][c];
    board[r][c] = '#';
    const found =
      dfs(r + 1, c, i + 1) ||
      dfs(r - 1, c, i + 1) ||
      dfs(r, c + 1, i + 1) ||
      dfs(r, c - 1, i + 1);
    board[r][c] = original;

    return found;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The board itself can double as the "visited" tracker: mark a
// cell with a sentinel that can't equal any letter, recurse, then
// restore the original character on the way back out. This is the
// classic backtracking pattern — mutate, explore, undo — applied
// to a grid instead of an array path.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Visited grid:   clearer separation of concerns, costs O(rows·cols)
//                 extra memory that persists across the whole search.
// In-place marker: no extra grid, but mutates the input during the
//                 search (must restore correctly, and isn't safe if
//                 the search runs concurrently on the same board).
