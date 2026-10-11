// ⚠️  SPOILERS — Attempt workspace/40-rotate-image.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Rotate Image
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(n²) space
// Build a brand new matrix where new[c][n-1-r] = old[r][c], then
// copy the new values back into the original matrix (to still
// satisfy "mutate in place" from the caller's point of view, even
// though we used auxiliary space internally — this violates the
// strict O(1)-space constraint, which is exactly what the optimal
// solution fixes).
function rotateBrute(matrix) {
  const n = matrix.length;
  const copy = matrix.map(row => [...row]);

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      matrix[c][n - 1 - r] = copy[r][c];
    }
  }
}

// ── OPTIMAL ──────────────────────────── O(n²) time  O(1) extra space
// Two in-place passes: (1) transpose the matrix — swap matrix[i][j]
// with matrix[j][i] for i < j — then (2) reverse each row. Transpose
// flips the matrix across its main diagonal; reversing each row then
// completes the clockwise rotation.
function rotate(matrix) {
  const n = matrix.length;

  // 1. Transpose (swap across the main diagonal, upper triangle only).
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 2. Reverse each row in place.
  for (let i = 0; i < n; i++) {
    let left = 0, right = n - 1;
    while (left < right) {
      [matrix[i][left], matrix[i][right]] = [matrix[i][right], matrix[i][left]];
      left++;
      right--;
    }
  }
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Transpose + reverse-each-row is a well-known decomposition of a
// 90° clockwise rotation. Transposing alone reflects the matrix
// over its main diagonal; reversing each row afterward turns that
// reflection into a proper clockwise turn. Both steps run in place
// using simple destructured swaps — no auxiliary matrix needed.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Copy-then-overwrite: easiest to get right first try, but uses
//   O(n²) auxiliary space — disqualified if the interviewer enforces
//   the in-place constraint strictly.
// Transpose + reverse: true O(1) extra space, the expected answer;
//   requires being comfortable with the geometric intuition (or the
//   layer-by-layer 4-way swap as an equally valid O(1)-space alternative).
