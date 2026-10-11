// ⚠️  SPOILERS — Attempt B-interview-prep/drilling/12-promisify.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Implement promisify For A Callback-Style Function
// ════════════════════════════════════════════════════════════

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
}

module.exports = { promisify };
