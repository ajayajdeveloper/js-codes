// ╔══════════════════════════════════════════════════════════╗
//   Problem 2: Group Anagrams         [Medium]  [String/HashMap]
//   node coach.js problem 2  → guiding questions
//   node coach.js hint 2 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of strings, group the anagrams together.
// Return an array of groups (order of groups, and order within
// each group, doesn't matter).
//
// Input:   ["eat","tea","tan","ate","nat","bat"]
// Output:  [["eat","tea","ate"],["tan","nat"],["bat"]]
//
// Input:   ["a"]     → [["a"]]
// Input:   []        → []

// THINK BEFORE CODING ──────────────────────────────────────
// • Two words are anagrams if their sorted letters match, e.g.
//   "eat" and "tea" both sort to "aet".
// • What key could you compute per word so that all anagrams of
//   each other map to the SAME key?
// • Is sorting each word (O(k log k)) the only way to build that
//   key, or could a character-count signature work too?
// • Use a Map: key → array of words with that key. What do you
//   return at the end?

// ── YOUR SOLUTION ──────────────────────────────────────────

function groupAnagrams(words) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const sortGroups = (groups) =>
  groups.map(g => [...g].sort()).sort((a, b) => a[0] > b[0] ? 1 : -1);

const TESTS = [
  {
    args: [["eat", "tea", "tan", "ate", "nat", "bat"]],
    expected: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]],
  },
  { args: [["a"]], expected: [["a"]] },
  { args: [[]], expected: [] },
  { args: [["", ""]], expected: [["", ""]] },
  { args: [["abc", "bca", "cab", "xyz", "zyx", "foo"]], expected: [["abc", "bca", "cab"], ["xyz", "zyx"], ["foo"]] },
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
