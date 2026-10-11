// ⚠️  SPOILERS — Attempt A-dsa/10-deep-clone.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Deep Clone Without structuredClone
// ════════════════════════════════════════════════════════════

// ── OPTIMAL: RECURSIVE CLONE ───────────────────── O(n) time  O(n) space
// Base case: anything that ISN'T an object (number, string, boolean,
// null, undefined, function) is returned as-is — primitives are
// already "copied" by value, there's nothing to clone.
// Otherwise, tell array from plain object with Array.isArray, make a
// fresh container of the matching kind, and recurse into EVERY
// element/property so nested structures get their own new
// object/array too, not just the top level.
function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  const result = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}

// ── ALTERNATIVE: OBJECT.ENTRIES + REDUCE ───────── O(n) time  O(n) space
// Same recursion, but builds the object copy via entries/reduce
// instead of a for...in loop — skips the hasOwnProperty check since
// Object.entries only ever returns the object's own enumerable
// properties in the first place.
function deepCloneEntries(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepCloneEntries(item));
  }

  return Object.entries(value).reduce((acc, [key, val]) => {
    acc[key] = deepCloneEntries(val);
    return acc;
  }, {});
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// "Deep" just means: don't stop recursing until you hit a primitive.
// JSON.parse(JSON.stringify(x)) fakes this by round-tripping through
// a string — which is why it silently drops functions and undefined
// (JSON has no representation for them), turns Dates into strings,
// and throws on circular references. Writing the recursion yourself
// means you control exactly what counts as a "leaf" and what doesn't.

// ── TRADE-OFFS ───────────────────────────────────────────────
// for...in version:     needs the hasOwnProperty guard to avoid
//                        copying inherited/prototype properties.
// entries/reduce:        no guard needed (entries is own-properties
//                        only), slightly more functional style, same
//                        complexity either way.
// Neither handles circular references, Dates, Maps/Sets, or class
// instances — this problem's scope is plain objects and arrays only.

module.exports = {
  deepClone,
  deepCloneEntries,
};
