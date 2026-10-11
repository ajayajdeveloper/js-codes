// ⚠️  SPOILERS — Attempt workspace/39-spiral-matrix.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Spiral Matrix
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(rows·cols) time  O(rows·cols) space
// Simulate a "walker" with a direction vector and a visited grid,
// turning clockwise whenever the next cell would be out of bounds
// or already visited. Same result as the boundary approach, but
// costs an extra full grid of booleans to track visited state.
function spiralOrderBrute(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // right, down, left, up
  const result = [];

  let r = 0, c = 0, dir = 0;
  for (let i = 0; i < rows * cols; i++) {
    result.push(matrix[r][c]);
    visited[r][c] = true;

    const [dr, dc] = directions[dir];
    let nr = r + dr, nc = c + dc;
    if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc]) {
      dir = (dir + 1) % 4;
      nr = r + directions[dir][0];
      nc = c + directions[dir][1];
    }
    r = nr;
    c = nc;
  }

  return result;
}

// ── OPTIMAL ──────────────────────────── O(rows·cols) time  O(1) extra space (excl. output)
// Track four shrinking boundaries (top, bottom, left, right).
// Walk each side in order — right along top, down along right,
// left along bottom (if a row remains), up along left (if a
// column remains) — then shrink all four boundaries inward.
function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0 || matrix[0].length === 0) return result;

  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;

    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;

    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }

    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }

  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The two guard checks (`if (top <= bottom)` before walking the
// bottom row, `if (left <= right)` before walking the left column)
// are what prevent a single remaining row or column from being
// traversed twice — without them, a 1×n or n×1 matrix would
// double-count its only row/column.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Direction-vector walker: intuitive "turn when blocked" simulation,
//   but needs a full visited grid — O(rows·cols) extra space.
// Four boundaries: no extra grid, O(1) auxiliary space, but the
//   edge-case guards for degenerate (single row/column) matrices
//   need careful attention.
