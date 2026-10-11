// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/13-debounce-throttle.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Write A Debounce And A Throttle
// ════════════════════════════════════════════════════════════

function debounce(fn, wait) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}

function throttle(fn, wait) {
  let onCooldown = false;
  return (...args) => {
    if (onCooldown) return;
    fn(...args);
    onCooldown = true;
    setTimeout(() => {
      onCooldown = false;
    }, wait);
  };
}

module.exports = { debounce, throttle };
