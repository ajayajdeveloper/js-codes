// ╔══════════════════════════════════════════════════════════╗
//   Problem 17: Is Palindrome        [Easy]  [String/Two-pointer]
//   node coach.js problem 17  → guiding questions
//   node coach.js hint 17 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a string, return true if it reads the same forwards
// and backwards (case-insensitive, letters and digits only).
//
// Input:   "racecar"       → true
// Input:   "A man a plan a canal Panama"  → true
// Input:   "hello"         → false
// Input:   "Was it a car or a cat I saw?"  → true
//
// THINK BEFORE CODING ──────────────────────────────────────
// • First clean the string: lowercase + remove non-alphanumeric.
//   What regex removes everything except letters and digits?
// • Approach 1 (simple): reverse the cleaned string and compare.
// • Approach 2 (two-pointer): use index left=0, right=end.
//   Move them toward each other. What is your stopping condition?
// • Which approach uses O(1) extra space?

// ── YOUR SOLUTION ──────────────────────────────────────────

function isPalindrome(s) {
  // your code here
  // const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  // let left = 0;
  // let right = cleaned.length - 1;
  // while(left < right){
  //   if(cleaned[left] !== cleaned[right]){
  //     return false;
  //   }
  // }

  // const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  // let left = 0;
  // let right = cleaned.length - 1;
  // while(left < right){
  //   if(cleaned[left] !== cleaned[right]){
  //     return false;
  //   }
  //   left++;
  //   right--;
  // }
  // return true;

  s = s.toLowerCase();

  let left = 0;
  let right = s.length - 1;
  while(left < right){
    if(s[left].match(/[a-z0-9]/) && s[right].match(/[a-z0-9]/)){
      if(s[left] !== s[right]){
        return false;
      }
      left++;
      right--;
    }
    if(!s[left].match(/[a-z0-9]/)){
      left++;
    }
    if(!s[right].match(/[a-z0-9]/)){
      right--;
    }
  }
  return true;
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: ["racecar"],                          expected: true  },
  { args: ["hello"],                            expected: false },
  { args: ["A man a plan a canal Panama"],      expected: true  },
  { args: ["Was it a car or a cat I saw?"],     expected: true  },
  { args: [""],                                 expected: true  },
  { args: ["a"],                                expected: true  },
  { args: ["ab"],                               expected: false },
  { args: ["0P"],                               expected: false },
];

if (require.main === module) {
  const pass = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const result = isPalindrome(...args);
    const ok = pass(result, expected);
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(result)}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { isPalindrome, TESTS };
