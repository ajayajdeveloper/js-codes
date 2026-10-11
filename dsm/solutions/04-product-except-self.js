// ⚠️  SPOILERS — Attempt workspace/04-product-except-self.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Product of Array Except Self
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(n²) time  O(n) space
// For each index, multiply every other element.
function productExceptSelfBrute(nums) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    let product = 1;
    for (let j = 0; j < nums.length; j++) {
      if (j !== i) product *= nums[j];
    }
    result.push(product);
  }
  return result;
}

// ── BETTER ───────────────────────────── O(n) time  O(n) space
// Build separate prefix and suffix product arrays, then multiply
// them pairwise.
function productExceptSelfBetter(nums) {
  const n = nums.length;
  const prefix = new Array(n);
  const suffix = new Array(n);

  prefix[0] = 1;
  for (let i = 1; i < n; i++) prefix[i] = prefix[i - 1] * nums[i - 1];

  suffix[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) suffix[i] = suffix[i + 1] * nums[i + 1];

  return prefix.map((p, i) => p * suffix[i]);
}

// ── OPTIMAL ──────────────────────────── O(n) time  O(1) extra space
// Build prefixes directly into result, then fold suffixes in with
// one running variable — no separate suffix array needed.
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// result[i] is just (product of everything left of i) * (product
// of everything right of i). You can accumulate both directions
// with a single running variable each, reusing the output array
// as scratch space for the prefix pass.

// ── TRADE-OFFS ───────────────────────────────────────────────
// Brute force: O(n²), trivial to write, too slow for large n.
// Prefix+suffix arrays: O(n) time, O(n) extra space, easy to explain.
// Single-pass fold: same O(n) time, only O(1) extra space (excluding
// the required output array) — the strongest answer.
