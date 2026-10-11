// ⚠️  SPOILERS — Attempt A-dsa/04-set-dedupe.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Dedupe An Array, Preserving First-Occurrence Order
// ════════════════════════════════════════════════════════════

// ── YOUR APPROACH: NESTED LOOPS ─────────── O(n²) time  O(n) space
// For each element, scan everything already collected so far and
// only push it if it isn't in there yet. Correct, and it's the
// approach that generalizes furthest (see the "seen" alternative
// below) — but it's O(n²) because `includes` re-walks the result
// array on every single element.
function dedupeYourApproach(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) result.push(arr[i]);
  }
  return result;
}

// ── OPTIMAL: SPREAD A SET ─────────────────── O(n) time  O(n) space
// `new Set(arr)` already throws away duplicates, and — the detail
// you asked about — a JS Set iterates in INSERTION order, so the
// first occurrence of each value is exactly where it ends up. No
// sort needed; sorting-then-comparing-neighbors would actually
// destroy the ordering this problem asks you to preserve.
// Caveat: Set uses SameValueZero equality, so this only works for
// primitives — two different objects are never "equal" to a Set
// even if they have identical fields (that's what the "seen" version
// below is for).
function dedupe(arr) {
  return [...new Set(arr)];
}

// ── ALTERNATIVE: MANUAL "SEEN" TRACKER ────── O(n) time  O(n) space
// Same idea as your nested loop, but the "have I seen this?" check
// is a Set.has() (O(1)) instead of re-scanning the result array
// (O(n)). This is the version worth reaching for when the values
// aren't primitives — pass a keyFn (e.g. JSON.stringify, or a
// specific field like person.id) to dedupe by SHAPE or by a chosen
// field instead of by reference.
function dedupeSeen(arr, keyFn = (x) => x) {
  const seen = new Set();
  const result = [];
  for (const item of arr) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

function dedupeSeen1(arr) {
  const seen = new Set();
  const result = [];
  for(let i = 0; i < arr.length;i++){
    if(!seen.has(arr[i])){
      seen.add(arr[i]);
      result.push(arr[i]);
    }
  }
  return result;
}

// ── ALTERNATIVE: FILTER + INDEXOF ─────────── O(n²) time  O(n) space
// A common one-liner: keep an element only if its first occurrence
// index matches its current index. Reads nicely, but indexOf does a
// linear scan for every element, so it's really the nested-loop
// approach wearing a disguise — same complexity as YOUR APPROACH.
function dedupeFilterIndexOf(arr) {
  return arr.filter((value, index) => arr.indexOf(value) === index);
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Every version preserves first-occurrence order by construction —
// none of them sort. The only thing that changes between versions
// is HOW "have I seen this value before?" gets answered: rescanning
// an array (O(n) per check, nested loop / indexOf) vs. a hash-based
// lookup (O(1) per check, Set.has). That single difference is what
// takes the whole algorithm from O(n²) to O(n).

// ── TRADE-OFFS ───────────────────────────────────────────────
// Your approach:  correct, easy to trace by hand, and the one that
//                 generalizes to "dedupe by custom equality" most
//                 naturally — just swap === for your own check.
//                 O(n²) because of the repeated array scan.
// Optimal:        shortest, fastest, correct-by-construction — the
//                 right default whenever the array holds primitives.
// Seen-tracker:   same O(n) speed as Optimal, but works on objects
//                 too via keyFn — reach for this the moment "unique"
//                 needs to mean "unique by some field", not "unique
//                 by ===".
// filter+indexOf: concise but a trap — looks O(n), is actually O(n²).
//                 Fine for small arrays, worth knowing NOT to reach
//                 for on large ones.

module.exports = {
  dedupeYourApproach,
  dedupe,
  dedupeSeen,
  dedupeFilterIndexOf,
};
