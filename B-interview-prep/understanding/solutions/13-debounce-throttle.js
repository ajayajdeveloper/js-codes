// ⚠️  SPOILERS — Attempt B-interview-prep/understanding/13-debounce-throttle.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Write A Debounce And A Throttle
// ════════════════════════════════════════════════════════════

// ── debounce: CANCEL-AND-RESCHEDULE ─────────────────────────
// A closure holds the pending timer's id. Every call clears whatever
// timer is currently pending, then schedules a fresh one. If calls
// keep arriving faster than `wait`, the scheduled `fn` never actually
// gets to fire — only once `wait` ms pass with NO new call does the
// most recently scheduled timer survive to run, using that last
// call's `args`.
function debounce(fn, wait) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}

// ── throttle: LEADING-EDGE COOLDOWN FLAG ────────────────────
// A closure holds a boolean "on cooldown?" flag instead of a timer id.
// The first call (flag is false) runs `fn` immediately and flips the
// flag on; every call while the flag is true is simply dropped. A
// timer flips the flag back off after `wait` ms, opening the door for
// the NEXT call to fire immediately again.
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

// ── KEY INSIGHT ──────────────────────────────────────────────
// debounce answers "has activity gone quiet?" — useful for the FINAL
// state of a burst of events (search-box input, window resize
// settling). throttle answers "has enough time passed since the last
// action?" — useful for getting PERIODIC updates DURING a continuous
// stream of events (scroll position, mouse-move tracking), where you
// still want feedback while the activity is ongoing, just not on
// every single event.

// ── TRADE-OFFS ───────────────────────────────────────────────
// This throttle is leading-edge only (fires immediately, then cools
// down). A trailing-edge variant also fires once more after the
// cooldown if a call arrived during it — more faithful to some UI
// needs (e.g. "final scroll position after the user stops"), at the
// cost of needing to track one more piece of state (whether a call
// was missed during cooldown).

module.exports = { debounce, throttle };
