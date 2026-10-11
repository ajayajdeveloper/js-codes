// ⚠️  SPOILERS — Attempt C-leetcode-grind/understanding/09-valid-palindrome.js first!
// ══════════════════════════════════════════════════════════════
//  Solution: Valid Palindrome
// ══════════════════════════════════════════════════════════════

// O(n) time  O(1) space
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  const isAlnum = (c) => /[a-z0-9]/i.test(c);
  while (left < right) {
    if (!isAlnum(s[left])) { left++; continue; }
    if (!isAlnum(s[right])) { right--; continue; }
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}

const TESTS = [
  { args: ['A man, a plan, a canal: Panama'], expected: true },
  { args: ['race a car'], expected: false },
  { args: [' '], expected: true },
  { args: [''], expected: true },
  { args: ['0P'], expected: false },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isPalindrome(...args);
    const ok = result === expected;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isPalindrome, TESTS };
