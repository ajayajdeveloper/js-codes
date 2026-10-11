// ╔══════════════════════════════════════════════════════════╗
//   05: Check If Two Strings Are Anagrams               [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given two strings, return true if one is an anagram of the other
// (same characters, same counts), ignoring case and spaces.
//
// Input:   isAnagram("listen", "silent")
// Output:  true

// ── YOUR SOLUTION ──────────────────────────────────────────

function isAnagram(a, b) {
  a = a.toLowerCase().replace(/ /g, "");
  b = b.toLowerCase().replace(/ /g, "");  
  if(a.length !== b.length){
    return false
  }

  let map = { };

  for(let i = 0; i < a.length; i++){
     if(!map[a[i]]){
      map[a[i]] = 1;
     }else{
      map[a[i]]++;
     }
  }

  for(let i = 0; i < b.length; i++){
    if(!map[b[i]]){
     return false
    }else{
     map[b[i]]--;
    }
  }

  return true;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ['listen', 'silent'], expected: true },
  { args: ['rat', 'car'], expected: false },
  { args: ['Dormitory', 'Dirty Room'], expected: true },  // case + space insensitive
  { args: ['', ''], expected: true },
  { args: ['a', 'ab'], expected: false },  // different lengths
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isAnagram(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isAnagram, TESTS };
