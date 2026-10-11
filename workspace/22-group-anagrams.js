// ╔══════════════════════════════════════════════════════════╗
//   Problem 22: Group Anagrams         [Medium]  [HashMap/Sort]
//   node coach.js problem 22  → guiding questions
//   node coach.js hint 22 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of strings, group the anagrams together.
// Return an array of groups (order within each group and
// order of groups doesn't matter).
//
// Input:   ["eat","tea","tan","ate","nat","bat"]
// Output:  [["eat","tea","ate"],["tan","nat"],["bat"]]
//
// Input:   ["a"]        → [["a"]]
// Input:   ["",""]      → [["",""]]
//
// THINK BEFORE CODING ──────────────────────────────────────
// • Two words are anagrams if their sorted letters are identical.
//   "eat".split('').sort().join('') === "aet"
//   "tea".split('').sort().join('') === "aet"
// • Use a Map where the KEY is the sorted string,
//   and the VALUE is the array of words with that key.
// • After building the map, how do you extract all the groups?
// • This builds on Problem 6 (Valid Anagram) — what's the
//   extra step here?

// ── YOUR SOLUTION ──────────────────────────────────────────

function groupAnagrams(words) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortGroups = (groups) =>
  groups.map(g => [...g].sort()).sort((a, b) => a[0] > b[0] ? 1 : -1);

const TESTS = [
  {
    args: [["eat","tea","tan","ate","nat","bat"]],
    expected: [["ate","eat","tea"],["bat"],["nat","tan"]],
  },
  {
    args: [["a"]],
    expected: [["a"]],
  },
  {
    args: [["", ""]],
    expected: [["", ""]],
  },
  {
    args: [["abc", "bca", "cab", "xyz", "zyx"]],
    expected: [["abc","bca","cab"],["xyz","zyx"]],
  },
];

if (require.main === module) {
  const pass = (a, b) =>
    JSON.stringify(sortGroups(a)) === JSON.stringify(sortGroups(b));
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = groupAnagrams(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { groupAnagrams, TESTS };
