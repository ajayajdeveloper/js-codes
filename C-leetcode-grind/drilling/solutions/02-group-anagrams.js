// ⚠️  SPOILERS — Attempt C-leetcode-grind/drilling/02-group-anagrams.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Group Anagrams
// ══════════════════════════════════════════════════════════════

// O(n * k log k) time (k = avg string length)  O(n * k) space
function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}

const TESTS = [
  { args: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']], expected: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']] },
  { args: [['']], expected: [['']] },
  { args: [['a']], expected: [['a']] },
  { args: [[]], expected: [] },
];

// Groups can come out in any order, and strings within a group can
// too — normalize both before comparing.
function normalize(groups) {
  return groups.map((g) => [...g].sort()).sort((a, b) => (a[0] || '').localeCompare(b[0] || ''));
}

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = groupAnagrams(...args);
    const ok = JSON.stringify(normalize(result)) === JSON.stringify(normalize(expected));
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { groupAnagrams, TESTS };
