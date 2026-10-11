// ╔══════════════════════════════════════════════════════════╗
//   01: Sort Numbers Ascending, Then Descending      [Easy]
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given an array of numbers, write two functions:
//   sortAscending(nums)   → new array sorted low → high
//   sortDescending(nums)  → new array sorted high → low
// Neither should mutate the original array.
//
// Input:   [5, 1, 4, 2, 8]
// Output:  ascending  → [1, 2, 4, 5, 8]
//          descending → [8, 5, 4, 2, 1]

// THINK BEFORE CODING ──────────────────────────────────────
// • What does Array.prototype.sort() do with NO compare function
//   on an array of numbers like [10, 2, 33]? Try it — the result
//   is surprising (string sort).
// • What compare function makes sort() go ascending? Descending?
// • sort() mutates in place — how do you avoid mutating the
//   caller's array? (hint: copy first)

// ── ALL VERSIONS, WORST → BEST ──────────────────────────────
// Every version below copies the input first ([...nums]) so the
// caller's array is never mutated — that requirement is separate
// from *which sorting algorithm* you use underneath.

// ── VERSION 1: BUBBLE SORT ──────────────── O(n²) time  O(n) space
// Repeatedly walk the array, comparing each adjacent PAIR. If
// they're in the wrong order, swap them. After one full pass, the
// largest (or smallest, for descending) value has "bubbled" to the
// end. Repeat n times, each time ignoring the already-placed tail.
//
// This is what your original attempt was going for — the bug was
// comparing nums[i]/nums[i+1] every time instead of nums[j]/nums[j+1]
// as j sweeps across the unsorted region.
function bubbleSortAscending(nums) {
  const arr = [...nums];
  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted — stop early
  }
  return arr;
}

function bubbleSortDescending(nums) {
  const arr = [...nums];
  for (let i = 0; i < arr.length; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

// ── VERSION 2: SELECTION SORT ───────────── O(n²) time  O(n) space
// For each position i, scan the REST of the array to find the
// smallest (or largest) remaining value, then swap it into place
// at i. Unlike bubble sort, this does at most ONE swap per pass —
// fewer writes, same number of comparisons.
function selectionSortAscending(nums) {
  const arr = [...nums];
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

function selectionSortDescending(nums) {
  const arr = [...nums];
  for (let i = 0; i < arr.length; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[maxIndex]) maxIndex = j;
    }
    if (maxIndex !== i) [arr[i], arr[maxIndex]] = [arr[maxIndex], arr[i]];
  }
  return arr;
}

// ── VERSION 3: INSERTION SORT ───────────── O(n²) worst  O(n) best  O(n) space
// Build up a sorted region at the front, one element at a time.
// Take the next unsorted element and shift it LEFT through the
// sorted region until it lands in the right spot. Worst case is
// still O(n²), but if the input is already nearly sorted, each
// element only shifts a few positions — close to O(n) in practice.
// This is the algorithm most people do by hand when sorting cards.
function insertionSortAscending(nums) {
  const arr = [...nums];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

function insertionSortDescending(nums) {
  const arr = [...nums];
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] < current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// ── VERSION 4: NATIVE SORT (recommended) ── O(n log n) time  O(log n)-O(n) space
// V8 (Node/Chrome) uses TimSort for arrays over 10 elements — a
// hybrid merge/insertion sort. You get O(n log n) for free by
// handing the comparison logic to the engine instead of hand-
// rolling an O(n²) algorithm. This is what you should reach for
// in real code; the three versions above are for understanding
// how sorting works underneath, not for production use.
function sortAscending(nums) {
  return [...nums].sort((a, b) => a - b);
}

function sortDescending(nums) {
  return [...nums].sort((a, b) => b - a);
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// Bubble, selection, and insertion sort are all O(n²) — the
// difference between them is HOW MANY writes/comparisons they do,
// not their asymptotic ceiling. None of the three should be used
// over the native sort() in real code; they exist so you can
// explain "how does sorting work" in an interview.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Bubble:    simplest to explain, but does the most swaps; the
//            "swapped" early-exit is the only thing saving it on
//            already-sorted input.
// Selection: same O(n²) comparisons as bubble, but only n swaps
//            total (one per outer pass) — better when writes are
//            expensive (e.g. writing to flash memory).
// Insertion: shines on NEARLY-sorted data (~O(n)) and on small
//            arrays — some engines' sort() even falls back to
//            insertion sort for tiny sub-arrays internally.
// Native:    O(n log n) worst case, battle-tested, handles edge
//            cases (NaN, mixed types) — always the right default.

// ── TESTS ──────────────────────────────────────────────────

const IMPLS = {
  bubbleSortAscending, bubbleSortDescending,
  selectionSortAscending, selectionSortDescending,
  insertionSortAscending, insertionSortDescending,
  sortAscending, sortDescending,
};

const TESTS = [
  { fn: 'sortAscending',  args: [[5, 1, 4, 2, 8]],     expected: [1, 2, 4, 5, 8] },
  { fn: 'sortAscending',  args: [[-3, 0, 5, -1]],      expected: [-3, -1, 0, 5] },
  { fn: 'sortDescending', args: [[5, 1, 4, 2, 8]],     expected: [8, 5, 4, 2, 1] },
  { fn: 'sortDescending', args: [[-3, 0, 5, -1]],      expected: [5, 0, -1, -3] },
];

if (require.main === module) {
  let score = 0;
  let total = 0;

  console.log('── Testing all 4 versions against each case ──\n');
  ['bubbleSort', 'selectionSort', 'insertionSort', 'sort'].forEach((prefix) => {
    console.log(`${prefix}Ascending / ${prefix}Descending:`);
    TESTS.forEach(({ fn, args, expected }) => {
      const implName = fn.replace(/^(sort)/, prefix);
      const original = JSON.stringify(args[0]);
      const result = IMPLS[implName](...args);
      const ok = JSON.stringify(result) === JSON.stringify(expected);
      const mutated = JSON.stringify(args[0]) !== original;
      total++;
      score += ok && !mutated ? 1 : 0;
      console.log(
        `  ${ok && !mutated ? '✅' : '❌'}  ${implName}(${JSON.stringify(args[0])}) → ${JSON.stringify(result)}` +
        (mutated ? '  ⚠️  mutated the input array!' : '')
      );
    });
  });

  console.log(`\n${score}/${total} passed${score === total ? ' 🎉' : ''}`);
  if (score < total) process.exit(1);
}

module.exports = { sortAscending, sortDescending, TESTS, ...IMPLS };
