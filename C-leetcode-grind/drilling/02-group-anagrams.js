// ╔════════════════════════════════════════════════════════════╗
//  02: Group Anagrams                                  [Medium]
// ╚════════════════════════════════════════════════════════════╝

// PROBLEM ───────────────────────────────────────────────────
// Given an array of strings, group the anagrams together. Return the
// groups in any order — the tests below compare results as sets of
// sets, so grouping order and order within a group don't matter.
//
// Input:   groupAnagrams(["eat","tea","tan","ate","nat","bat"])
// Output:  [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// YOUR SOLUTION ─────────────────────────────────────────────

function groupAnagrams(strs) {

 
  let mapped = {};

  for(let i = 0 ; i <  strs.length; i++){
    let sortedString = strs[i].split("").sort().join(" ");
    let curr = strs[i]

    if(!mapped[sortedString]){
      mapped[sortedString] = [curr]
    }else{
      mapped[sortedString].push(curr)
    }
  }

  return [...Object.values(mapped)]


  
}

// TESTS ─────────────────────────────────────────────────────

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
