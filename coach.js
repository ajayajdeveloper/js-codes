#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── ANSI helpers (no external deps) ──────────────────────
const R   = '\x1b[0m';
const B   = '\x1b[1m';
const DIM = '\x1b[2m';
const red   = s => `\x1b[31m${s}${R}`;
const green = s => `\x1b[32m${s}${R}`;
const yel   = s => `\x1b[33m${s}${R}`;
const cyan  = s => `\x1b[36m${s}${R}`;
const mag   = s => `\x1b[35m${s}${R}`;
const bold  = s => `${B}${s}${R}`;
const dim   = s => `${DIM}${s}${R}`;
const hr    = (ch = '─', n = 58) => dim(ch.repeat(n));

// ── Problem metadata ──────────────────────────────────────
const PROBLEMS = {
  1: {
    title: 'Remove Duplicates',
    file:  '01-remove-duplicates',
    category: 'Array / Set',
    difficulty: 'Easy',
    description: 'Given an array, return a new array with duplicate values removed, preserving original order.',
    example: { input: '[1, 2, 2, 3, 4, 4, 5]', output: '[1, 2, 3, 4, 5]' },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'What does "unique" mean algorithmically?',
      'Which JS data structure was designed to store only unique values?',
      'How would you solve this WITHOUT using Set?',
      'What is the time cost of Array.includes()? How does it affect overall complexity?',
      'What edge cases should you handle? (empty array, all same, single element)',
    ],
    hints: [
      'JavaScript has a built-in Set — new Set([1,2,2,3]) creates {1,2,3}. It only stores unique values.',
      'To convert a Set back to an array: [...new Set(arr)] or Array.from(new Set(arr)).',
      'Without Set: iterate the array and use a plain object {} as a "seen" map. For each item, skip if already seen.',
    ],
    followUps: [
      'How would you deduplicate a SORTED array in O(1) extra space using two pointers?',
      'How would you deduplicate an array of objects where equality is based on an "id" property?',
      'What if you needed to keep only the LAST occurrence instead of the first?',
    ],
  },
  2: {
    title: 'Find Duplicates',
    file:  '02-find-duplicates',
    category: 'Array / Frequency Counter',
    difficulty: 'Easy',
    description: 'Given an array, return a new array containing only values that appear more than once.',
    example: { input: '[1, 2, 3, 2, 4, 5, 4]', output: '[2, 4]' },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'How is this different from Problem 1 (Remove Duplicates)?',
      'What information must you track per element to determine if it is a duplicate?',
      'How do you then extract the duplicates from that tracked data?',
      'Is a one-pass or two-pass solution cleaner here?',
      'If an element appears 3 times, should it appear once or three times in the output?',
    ],
    hints: [
      'Build a frequency map first: { 1:1, 2:2, 3:1, 4:2, 5:1 }. Then filter entries with value > 1.',
      'Use two Sets: one for "seen", one for "duplicates". If seen already has x, add x to duplicates.',
      'With reduce: arr.reduce((acc, x) => { acc[x] = (acc[x] || 0) + 1; return acc; }, {}), then filter.',
    ],
    followUps: [
      'How would you find duplicates in O(1) space if the array is already sorted?',
      'What if you needed elements that appear EXACTLY k times?',
      'How would you find duplicates in an array of strings?',
    ],
  },
  3: {
    title: 'First Non-Repeating Character',
    file:  '03-first-non-repeating',
    category: 'String / Map',
    difficulty: 'Easy',
    description: 'Given a string, return the first character that does not repeat anywhere in the string.',
    example: { input: '"aabbccddefg"', output: '"e"' },
    time: 'O(n)', space: 'O(k) — k = unique chars',
    questions: [
      'What two things do you need to know about each character?',
      'Why might a Map be better than a plain object here? (think: order guarantees)',
      'Can you solve this in a single pass? Or do you need two?',
      'What should you return if ALL characters repeat?',
      'Does the order you iterate the frequency counter matter?',
    ],
    hints: [
      'Two-pass approach: 1) build frequency map, 2) scan original string and return first char with count 1.',
      'indexOf vs lastIndexOf: if str.indexOf(ch) === str.lastIndexOf(ch), the char appears exactly once. But this is O(n²).',
      'Map preserves insertion order — [...map.entries()].find(([, count]) => count === 1)?.[0] returns the answer.',
    ],
    followUps: [
      'How would you solve this for a STREAM where you can only see each character once?',
      'How would you find ALL non-repeating characters (not just the first)?',
      'What if the input is case-insensitive ("aAbBc" → "c")?',
    ],
  },
  4: {
    title: 'Character Frequency Counter',
    file:  '04-char-frequency',
    category: 'String / Hash Map',
    difficulty: 'Easy',
    description: 'Given a string, return an object mapping each character to its frequency count.',
    example: { input: '"javascript"', output: '{ j:1, a:2, v:1, s:1, c:1, r:1, i:1, p:1, t:1 }' },
    time: 'O(n)', space: 'O(k)',
    questions: [
      'What is the "accumulator" pattern in reduce, and how does it apply here?',
      'What is the default value for a key not yet in the counter?',
      'Can you write this with a for...of loop? With reduce? Which is cleaner?',
      'What happens with spaces or punctuation — include or ignore?',
      'How would you sort the result by frequency?',
    ],
    hints: [
      'Loop: for (const ch of str) freq[ch] = (freq[ch] || 0) + 1;',
      'Reduce: str.split("").reduce((acc, ch) => { acc[ch] = (acc[ch] || 0) + 1; return acc; }, {})',
      'Watch out: { ...acc, [ch]: ... } inside reduce is O(n²) because it copies the object each iteration. Prefer mutating the accumulator.',
    ],
    followUps: [
      'How would you find the most frequent character?',
      'How would you build a word frequency counter for a sentence?',
      'Given two frequency counters, how would you check if one is a subset of the other?',
    ],
  },
  5: {
    title: 'Reverse Each Word',
    file:  '05-reverse-each-word',
    category: 'String / Array',
    difficulty: 'Easy',
    description: 'Given a sentence, reverse each word individually while preserving word positions.',
    example: { input: '"Hello World"', output: '"olleH dlroW"' },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'What steps would you take if doing this on paper?',
      'How do you reverse a single string in JavaScript without a built-in?',
      'Which array method applies a transformation to each element?',
      'What should happen with single-character words?',
      'Can you do this in a functional one-liner?',
    ],
    hints: [
      'Split the sentence by spaces to get words, map over each word to reverse it, then join back.',
      'To reverse a string: str.split("").reverse().join("") — or use spread: [...str].reverse().join("").',
      'One-liner: str.split(" ").map(w => [...w].reverse().join("")).join(" ")',
    ],
    followUps: [
      'How would you reverse the ORDER of words in a sentence (not the chars in each word)?',
      'How would you reverse a string in O(1) extra space?',
      'What if the input has multiple consecutive spaces between words?',
    ],
  },
  6: {
    title: 'Valid Anagram',
    file:  '06-valid-anagram',
    category: 'String / Frequency Counter',
    difficulty: 'Easy',
    description: 'Given two strings, return true if they are anagrams of each other.',
    example: { input: '"listen", "silent"', output: 'true' },
    time: 'O(n)', space: 'O(k)',
    questions: [
      'What is the very first check you should do before any processing?',
      'What precisely defines an anagram? (same characters, same counts, different order)',
      'Problem 4 built a character frequency — how does that help here?',
      'Sort approach vs frequency counter — what are the trade-offs?',
      'How would you handle case ("Listen" vs "Silent")?',
    ],
    hints: [
      'Early exit: if s.length !== t.length, return false immediately.',
      'Build a frequency map for s, then for each char in t, decrement it. If any count hits < 0, return false.',
      'Sort approach (simpler but O(n log n)): s.split("").sort().join("") === t.split("").sort().join("")',
    ],
    followUps: [
      'How would you group all anagrams together from an array of words?',
      'How would you check if one string is a permutation of a substring of another?',
      'Design a data structure that checks anagrams in O(1) after preprocessing.',
    ],
  },
  7: {
    title: 'Missing Number',
    file:  '07-missing-number',
    category: 'Array / Math',
    difficulty: 'Easy',
    description: 'Given an array of n integers from 1 to n+1 with exactly one missing, return the missing number.',
    example: { input: '[1, 2, 3, 5]', output: '4' },
    time: 'O(n)', space: 'O(1) optimal',
    questions: [
      'What is the range of numbers you expect?',
      'What formula gives the sum of integers from 1 to n?',
      'If you know what the sum SHOULD be vs what it IS, what does the difference tell you?',
      'Can you solve it with a Set? What is the space trade-off?',
      'What is the Gauss summation formula and how does it apply?',
    ],
    hints: [
      'Set approach O(n) space: add all elements to a Set, then scan 1..n+1 to find the missing one.',
      'Math trick O(1) space: expected sum = (n+1)*(n+2)/2 where n = arr.length. Missing = expected - actual.',
      'The sum formula for 1..n is n*(n+1)/2. Here n = arr.length + 1 because one value is missing.',
    ],
    followUps: [
      'What if there were TWO missing numbers?',
      'What if numbers could repeat and multiple numbers might be missing?',
      'How would you solve this using XOR bitwise operations?',
    ],
  },
  8: {
    title: 'Move Zeros To End',
    file:  '08-move-zeros',
    category: 'Array / Two Pointers',
    difficulty: 'Easy-Medium',
    description: 'Move all zeros to the end of the array, preserving the order of non-zero elements.',
    example: { input: '[1, 0, 2, 0, 3, 4]', output: '[1, 2, 3, 4, 0, 0]' },
    time: 'O(n)', space: 'O(1) for in-place',
    questions: [
      'Can you solve this without creating a new array (in-place)?',
      'What is the "write pointer" technique?',
      'If you use filter to collect non-zeros, how many zeros do you append?',
      'In the two-pointer approach, what does the write pointer track?',
      'What should happen with negative numbers?',
    ],
    hints: [
      'Simple O(n) space: filter non-zeros, then push zeros to fill the rest.',
      'In-place: let write = 0. Scan with i. When arr[i] !== 0, set arr[write++] = arr[i]. Then fill positions write..end with 0.',
      'The write pointer is always ≤ the read pointer, so you never overwrite an unread value.',
    ],
    followUps: [
      'How would you move zeros to the FRONT instead?',
      'How would you sort an array of 0s, 1s, and 2s in one pass (Dutch National Flag)?',
      'What if you also needed to maintain relative order of the zeros (trivially satisfied here)?',
    ],
  },
  9: {
    title: 'Second Largest Number',
    file:  '09-second-largest',
    category: 'Array / Single Pass',
    difficulty: 'Easy-Medium',
    description: 'Given an array of numbers, return the second largest unique value.',
    example: { input: '[10, 5, 8, 20, 15]', output: '15' },
    time: 'O(n)', space: 'O(1)',
    questions: [
      'Is sorting a valid approach? What is its time complexity?',
      'How can you track BOTH the largest AND second largest in a single pass?',
      'What are the two conditions that update your tracked values?',
      'What should you return if the array has fewer than 2 unique values?',
      'How do duplicates affect the logic? ([5, 5, 3] — is 3 the second largest?)',
    ],
    hints: [
      'Sort descending and return the second element — valid but O(n log n).',
      'Track two variables: first = -Infinity, second = -Infinity. Update as you scan.',
      'If n > first: second = first, first = n. Else if n > second AND n !== first: second = n.',
    ],
    followUps: [
      'How would you find the kth largest element in O(n) average time?',
      'What if the array contains negative numbers?',
      'How would you find the second smallest?',
    ],
  },
  10: {
    title: 'Group By Type',
    file:  '10-group-by-type',
    category: 'Array / Reduce',
    difficulty: 'Easy',
    description: 'Given a mixed array, group elements by their JavaScript typeof type.',
    example: {
      input: '[1, "hello", true, 5, false, "world"]',
      output: '{ number: [1,5], string: ["hello","world"], boolean: [true,false] }',
    },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'What operator returns the type of a value in JavaScript?',
      'What reduce pattern builds an object from an array?',
      'How do you initialize a new type bucket when it doesn\'t exist yet?',
      'What are all the types typeof can return? (name at least 5)',
      'How would you extend this to group by a custom property?',
    ],
    hints: [
      'typeof value returns "number", "string", "boolean", "object", "undefined", "function", "symbol", "bigint".',
      'In reduce: const key = typeof x; if (!acc[key]) acc[key] = []; acc[key].push(x); return acc;',
      'Or with nullish coalescing: acc[key] ??= []; acc[key].push(x); — cleaner in ES2021+.',
    ],
    followUps: [
      'How would you group an array of objects by a specific property (e.g., group users by role)?',
      'How would you implement a generic groupBy(arr, fn) utility?',
      'What is Object.groupBy() in modern JavaScript?',
    ],
  },
  11: {
    title: 'Unique Words',
    file:  '11-unique-words',
    category: 'String / Set',
    difficulty: 'Easy',
    description: 'Given a sentence, return an array of unique words preserving first-occurrence order.',
    example: { input: '"apple banana apple orange banana"', output: '["apple", "banana", "orange"]' },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'How is this different from Problem 1?',
      'What do you need to do with the string first before applying array techniques?',
      'Does Set preserve insertion order in JavaScript?',
      'How would you handle mixed case ("Apple" vs "apple")?',
      'What if the input contains punctuation ("hello, world")?',
    ],
    hints: [
      'Split the sentence by spaces: str.split(" "). Then deduplicate with Set.',
      '[...new Set(str.split(" "))] — combines split, deduplication, and array conversion.',
      'For case-insensitive: str.toLowerCase().split(" ") before applying Set.',
    ],
    followUps: [
      'How would you count word frequency instead?',
      'How would you return only words that appear exactly once?',
      'How would you find the most common word?',
    ],
  },
  12: {
    title: 'Array Intersection',
    file:  '12-array-intersection',
    category: 'Array / Set',
    difficulty: 'Easy-Medium',
    description: 'Given two arrays, return a new array of elements present in both.',
    example: { input: '[1,2,3,4] and [3,4,5,6]', output: '[3, 4]' },
    time: 'O(n + m)', space: 'O(n)',
    questions: [
      'What is "intersection" mathematically?',
      'What is the naive O(n*m) approach? Why is it slow?',
      'How can you speed up element lookups from O(n) to O(1)?',
      'If you convert the first array to a Set, what operation do you run on the second array?',
      'What happens with duplicates? ([1,1,2] ∩ [1,2,2] = ?)',
    ],
    hints: [
      'Build a Set from array a. Then filter array b to only elements the Set contains.',
      'const setA = new Set(a); return b.filter(x => setA.has(x));',
      'To remove duplicates from the result too: [...new Set(b.filter(x => setA.has(x)))]',
    ],
    followUps: [
      'How would you find the UNION of two arrays?',
      'How would you find the DIFFERENCE (elements in a but not b)?',
      'How would you find the SYMMETRIC DIFFERENCE (in a or b, but not both)?',
    ],
  },
  13: {
    title: 'Longest Word',
    file:  '13-longest-word',
    category: 'String / Reduce',
    difficulty: 'Easy',
    description: 'Given a sentence, return the longest word. On a tie, return the first one encountered.',
    example: { input: '"I love JavaScript programming"', output: '"programming"' },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'Do you need to sort? Or can you find the maximum in one pass?',
      'What does reduce track as the "running maximum"?',
      'What should you return for an empty string or single-word input?',
      'What about words with trailing punctuation ("world.")?',
      'What does Array.prototype.sort return for equal-length words?',
    ],
    hints: [
      'Split by spaces, then reduce: words.reduce((max, w) => w.length > max.length ? w : max).',
      'Sort approach (O(n log n)): str.split(" ").sort((a, b) => b.length - a.length)[0].',
      'The reduce approach automatically returns the FIRST word in case of a tie (no update on equal length).',
    ],
    followUps: [
      'What if you needed ALL words tied for the longest?',
      'How would you find the shortest word?',
      'How would you handle punctuation attached to words?',
    ],
  },
  14: {
    title: 'Flatten One Level',
    file:  '14-flatten-one-level',
    category: 'Array / Spread',
    difficulty: 'Easy',
    description: 'Given an array nested one level deep, return a completely flat array.',
    example: { input: '[1, [2, 3], [4, 5]]', output: '[1, 2, 3, 4, 5]' },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'What is the difference between flat(1) and flat(Infinity)?',
      'How would you implement this WITHOUT flat()?',
      'What does reduce with concat do to a nested array?',
      'What if some elements are already non-arrays? Do they pass through correctly?',
      'What does [].concat(...arr) do?',
    ],
    hints: [
      'Simplest: arr.flat() — flat() with no argument defaults to depth 1.',
      'With reduce: arr.reduce((acc, x) => acc.concat(x), []) — concat flattens one level per element.',
      'With spread: [].concat(...arr) — passes each sub-array as individual arguments to concat.',
    ],
    followUps: [
      'How would you flatten to arbitrary depth without flat()?',
      'How would you write a recursive flatDeep(arr, depth) function?',
      'How would you flatten only array elements but leave nested objects intact?',
    ],
  },
  15: {
    title: 'Number Frequency Counter',
    file:  '15-number-frequency',
    category: 'Array / Hash Map',
    difficulty: 'Easy',
    description: 'Given an array of numbers, return an object mapping each number to its occurrence count.',
    example: { input: '[1, 2, 2, 3, 1, 1, 4]', output: '{ 1: 3, 2: 2, 3: 1, 4: 1 }' },
    time: 'O(n)', space: 'O(k)',
    questions: [
      'How is this different from Problem 4 (Character Frequency)?',
      'What pattern do you use when building a frequency counter?',
      'What does (acc[x] || 0) + 1 evaluate to when x is not yet in acc?',
      'How would you then find the most frequent number?',
      'How would you find numbers that appear more than once?',
    ],
    hints: [
      'Same pattern as charFrequency: freq[x] = (freq[x] || 0) + 1.',
      'With reduce (mutating accumulator): arr.reduce((acc, x) => { acc[x] = (acc[x] || 0) + 1; return acc; }, {})',
      'To find the mode: Object.entries(freq).reduce((max, entry) => entry[1] > max[1] ? entry : max)[0]',
    ],
    followUps: [
      'How would you find the mode (most frequent element)?',
      'How would you find a majority element (appears more than n/2 times)?',
      'How would you verify if two arrays are permutations of each other using frequency counters?',
    ],
  },
  16: {
    title: 'Unique Once (Bonus — no Set)',
    file:  'bonus-unique-once',
    category: 'Array / Frequency Counter',
    difficulty: 'Easy-Medium',
    description: 'WITHOUT using Set, return only elements that appear exactly once.',
    example: { input: '[1, 2, 3, 2, 4, 1, 5]', output: '[3, 4, 5]' },
    time: 'O(n)', space: 'O(n)',
    questions: [
      'Why is Set restricted? What are you being forced to think about instead?',
      'What data structure gives you frequency counts without Set?',
      'What is the two-step process: count frequencies, then ___?',
      'How do you filter an array to only elements satisfying a condition?',
      'Does arr.filter(x => freq[x] === 1) produce duplicates? Why or why not?',
    ],
    hints: [
      'Build a frequency counter object: { 1:2, 2:2, 3:1, 4:1, 5:1 }.',
      'Then filter: arr.filter(x => freq[x] === 1). Elements with freq > 1 are excluded automatically.',
      'No duplicates in output: if x appears twice, freq[x] === 2, so both occurrences are filtered out.',
    ],
    followUps: [
      'Now solve it using Set — what changes?',
      'How would you return elements appearing EXACTLY k times?',
      'How would you return elements appearing MORE than k times?',
    ],
  },
};

// ── CLI commands ──────────────────────────────────────────

const [,, command, ...args] = process.argv;

function main() {
  switch (command) {
    case 'list':     listProblems();           break;
    case 'problem':  showProblem(+args[0]);    break;
    case 'hint':     showHint(+args[0], +args[1]); break;
    case 'test':     testSolution(+args[0]);   break;
    case 'solution': showSolution(+args[0]);   break;
    case 'test-all': testAll();                break;
    default:         showHelp();               break;
  }
}

function listProblems() {
  console.log('\n' + bold('JavaScript Interview Practice') + '  —  16 problems\n');
  console.log(hr());
  Object.entries(PROBLEMS).forEach(([id, p]) => {
    const diff = {
      'Easy':        green('Easy       '),
      'Easy-Medium': yel('Easy-Med  '),
      'Medium':      mag('Medium    '),
    }[p.difficulty] || p.difficulty;
    console.log(`  ${cyan('#' + String(id).padStart(2, '0'))}  ${bold(p.title.padEnd(32))} ${diff} ${dim(p.category)}`);
  });
  console.log(hr());
  console.log('\n' + dim('Commands:'));
  console.log('  node coach.js problem <n>       Show problem + guiding questions');
  console.log('  node coach.js hint <n> <1-3>    Reveal a progressive hint');
  console.log('  node coach.js test <n>          Run your solution against tests');
  console.log('  node coach.js solution <n>      Reveal solution (try first!)');
  console.log('  node coach.js test-all          Run all workspace solutions\n');
}

function showProblem(n) {
  const p = PROBLEMS[n];
  if (!p) return console.log(red(`Problem ${n} not found. Run: node coach.js list`));

  console.log('\n' + bold(cyan(`Problem ${n}: ${p.title}`)));
  console.log(dim(`${p.category}  ·  ${p.difficulty}`));
  console.log(hr());
  console.log('\n' + bold('PROBLEM'));
  console.log('  ' + p.description);
  console.log('\n' + bold('EXAMPLE'));
  console.log('  Input:  ' + cyan(p.example.input));
  console.log('  Output: ' + green(p.example.output));
  console.log('\n' + bold('EXPECTED COMPLEXITY'));
  console.log('  Time:  ' + yel(p.time));
  console.log('  Space: ' + yel(p.space));
  console.log('\n' + bold('GUIDING QUESTIONS') + dim(' — think before coding'));
  p.questions.forEach((q, i) => console.log(`  ${cyan((i + 1) + '.')} ${q}`));
  console.log('\n' + hr('─'));
  console.log(dim(`  Hints:    node coach.js hint ${n} 1   (up to 3)`));
  console.log(dim(`  Test:     node coach.js test ${n}`));
  console.log(dim(`  Workspace: workspace/${p.file}.js\n`));
}

function showHint(n, hintNum) {
  const p = PROBLEMS[n];
  if (!p) return console.log(red(`Problem ${n} not found.`));
  if (!hintNum || hintNum < 1 || hintNum > 3) {
    return console.log(yel(`Usage: node coach.js hint ${n} <1|2|3>`));
  }
  const hint = p.hints[hintNum - 1];
  if (!hint) return console.log(yel(`No hint ${hintNum} for problem ${n}.`));

  console.log('\n' + bold(mag(`Hint ${hintNum}/3  —  Problem ${n}: ${p.title}`)));
  console.log(hr('·'));
  console.log('  ' + hint + '\n');
}

function testSolution(n) {
  const p = PROBLEMS[n];
  if (!p) return console.log(red(`Problem ${n} not found.`));

  const filePath = path.join(__dirname, 'workspace', `${p.file}.js`);
  if (!fs.existsSync(filePath)) {
    return console.log(red(`Not found: workspace/${p.file}.js`));
  }

  console.log('\n' + bold(`Testing Problem ${n}: ${p.title}`) + '\n');
  try {
    execSync(`node "${filePath}"`, { stdio: 'inherit' });
  } catch {
    console.log(red('\nSome tests failed or your solution threw an error.'));
  }
}

function showSolution(n) {
  const p = PROBLEMS[n];
  if (!p) return console.log(red(`Problem ${n} not found.`));

  const filePath = path.join(__dirname, 'solutions', `${p.file}.js`);
  if (!fs.existsSync(filePath)) {
    return console.log(red(`Solution file not found: solutions/${p.file}.js`));
  }

  console.log('\n' + yel(`⚠  Revealing solution for Problem ${n}: ${p.title}`));
  console.log(hr('═'));
  console.log(fs.readFileSync(filePath, 'utf8'));
  console.log(hr('═'));
  console.log(bold('FOLLOW-UP INTERVIEW QUESTIONS:'));
  p.followUps.forEach((q, i) => console.log(`  ${cyan((i + 1) + '.')} ${q}`));
  console.log();
}

function testAll() {
  console.log('\n' + bold('Running all workspace solutions...\n'));
  let solved = 0;
  const total = Object.keys(PROBLEMS).length;

  Object.entries(PROBLEMS).forEach(([id, p]) => {
    const filePath = path.join(__dirname, 'workspace', `${p.file}.js`);
    if (!fs.existsSync(filePath)) {
      console.log(`  ${dim('○')}  ${cyan('#' + String(id).padStart(2, '0'))}  ${p.title.padEnd(36)} ${dim('not found')}`);
      return;
    }
    try {
      const out = execSync(`node "${filePath}"`, { stdio: 'pipe' }).toString();
      const match = out.match(/(\d+)\/(\d+) passed/);
      const passed = match ? +match[1] : 0;
      const total  = match ? +match[2] : '?';
      const ok = match && passed === +total;
      if (ok) solved++;
      const icon = ok ? green('✅') : red('❌');
      const score = match ? (ok ? green(match[0]) : red(match[0])) : yel('no tests?');
      console.log(`  ${icon}  ${cyan('#' + String(id).padStart(2, '0'))}  ${p.title.padEnd(36)} ${score}`);
    } catch (e) {
      const out = e.stdout?.toString() || '';
      const match = out.match(/(\d+)\/(\d+) passed/);
      const score = match ? red(match[0]) : red('error');
      console.log(`  ${'❌'}  ${cyan('#' + String(id).padStart(2, '0'))}  ${p.title.padEnd(36)} ${score}`);
    }
  });

  const icon = solved === total ? green('🎉') : yel('⏳');
  console.log(`\n  ${icon}  ${bold(solved + '/' + total)} problems solved\n`);
}

function showHelp() {
  console.log(`
${bold('JS Interview Coach')}  —  16 problems, progressive hints, brute→optimal solutions

${bold('Usage:')}  node coach.js <command> [args]

${bold('Commands:')}
  ${cyan('list')}                     List all 16 problems
  ${cyan('problem')} ${yel('<n>')}             Show problem N + guiding questions
  ${cyan('hint')} ${yel('<n> <1-3>')}          Reveal hint 1, 2, or 3 for problem N
  ${cyan('test')} ${yel('<n>')}                Run tests against your workspace solution
  ${cyan('solution')} ${yel('<n>')}            Reveal solution for problem N (try first!)
  ${cyan('test-all')}                Run tests for all 16 problems

${bold('Recommended workflow:')}
  1. ${dim('node coach.js list')}               see all problems
  2. ${dim('node coach.js problem N')}          get coached: questions + complexity
  3. ${dim('edit workspace/<file>.js')}         write your solution in the stub
  4. ${dim('node workspace/<file>.js')}         run tests inline (fast feedback)
  5. ${dim('node coach.js hint N 1')}           stuck? unlock hint 1 (then 2, then 3)
  6. ${dim('node coach.js test N')}             formal test run
  7. ${dim('node coach.js solution N')}         review brute → better → optimal
  8. ${dim('node coach.js test-all')}           track your total progress
`);
}

main();
