// ⚠️  SPOILERS — Attempt A-dsa/06-char-frequency.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Character Frequency Count
// ════════════════════════════════════════════════════════════

// ── YOUR APPROACH: MAP ──────────────────────── O(n) time  O(k) space
// Exactly what you wrote, once the two bugs were fixed:
//   - `new Map()` (capital M — `map` isn't a constructor)
//   - `map.set(str[i], map.get(str[i]) + 1)` — get the CURRENT count,
//     THEN add 1, then set it back. (Your first attempt had the `+ 1`
//     trapped inside the `.get(...)` call, which looks up the wrong
//     key instead of incrementing the result.)
// This is O(n) and correct — but it returns a Map, and the problem
// asks for a plain object ({ a: 2, b: 2, c: 1 }), so on its own it
// doesn't match the expected shape.
function charFrequencyYourApproach(str) {
  const map = new Map();
  for (let i = 0; i < str.length; i++) {
    if (map.has(str[i])) {
      map.set(str[i], map.get(str[i]) + 1);
    } else {
      map.set(str[i], 1);
    }
  }
  return map;
}

// ── OPTIMAL: PLAIN OBJECT ─────────────────────── O(n) time  O(k) space
// Same "default to 0, then increment" idea, but a plain object instead
// of a Map — matches the expected output directly with no conversion
// step. `str[i] in counts` (or `counts[str[i]] !== undefined`) plays
// the role of `map.has()`.
function charFrequency(str) {
  const counts = {};
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    counts[ch] = (counts[ch] || 0) + 1;
  }
  return counts;
}

// ── ALTERNATIVE: REDUCE ───────────────────────── O(n) time  O(k) space
// Same object-accumulator pattern, expressed as a reduce. Note this
// mutates `acc` in place rather than spreading a new object each
// iteration (`{ ...acc, [ch]: ... }`) — that spread version is a
// trap flagged in the problem comments: it's O(k) per iteration just
// to copy the accumulator, making the whole reduce O(n·k) instead of
// O(n).
function charFrequencyReduce(str) {
  return [...str].reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The counting logic — "have I seen this key, if so bump it, else
// start at 1" — is identical across all three versions. The only
// thing that changes is the container: Map vs plain object vs a
// reduce accumulator. Pick the container based on what the caller
// expects back, not the other way around.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Your approach (Map):  correct and O(n); Maps are the better choice
//                        when keys aren't strings, when insertion
//                        order or key type matters, or when you need
//                        Map-specific methods (.size, iteration as
//                        entries). Wrong shape for THIS spec though.
// Optimal (object):      matches the expected `{ a: 2, ... }` output
//                        directly, reads naturally with bracket
//                        notation, and is the right default when
//                        keys are strings and a plain object is what
//                        downstream code expects.
// Reduce:                same complexity as Optimal, more "functional"
//                        style; only a trap if you spread a new
//                        object every iteration instead of mutating
//                        the accumulator.

module.exports = {
  charFrequencyYourApproach,
  charFrequency,
  charFrequencyReduce,
};
