// ⚠️  SPOILERS — Attempt workspace/08-container-most-water.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Container With Most Water
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(1) space
// Check every pair of lines.
function maxAreaBrute(heights) {
  let best = 0;
  for (let i = 0; i < heights.length; i++) {
    for (let j = i + 1; j < heights.length; j++) {
      const area = Math.min(heights[i], heights[j]) * (j - i);
      best = Math.max(best, area);
    }
  }
  return best;
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) space
// Two pointers starting at both ends. Always move the pointer at
// the SHORTER line inward — moving the taller one can never help,
// since width only shrinks and the shorter side still caps the area.
function maxArea(heights) {
  let left = 0;
  let right = heights.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const area = Math.min(heights[left], heights[right]) * width;
    best = Math.max(best, area);

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return best;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Start at maximum width. Moving the taller pointer inward keeps
// (or lowers) the limiting height while shrinking width — area can
// only get worse or stay the same. Moving the shorter pointer is
// the only move that has a CHANCE of finding a taller limiting
// height that offsets the reduced width.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: O(n²), easy to verify by hand for small inputs.
// Two pointers: O(n), the expected optimal — each step provably
// eliminates one candidate pair from consideration.
