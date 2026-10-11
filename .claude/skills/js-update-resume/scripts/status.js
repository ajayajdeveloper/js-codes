#!/usr/bin/env node
// Runs every self-testing problem file and prints a compact pass/stub/fail board.
// Usage: node .claude/skills/js-update-resume/scripts/status.js [track-filter]
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');
const TRACKS = [
  'workspace',
  'A-dsa',
  'B-interview-prep/drilling',
  'B-interview-prep/understanding',
  'C-leetcode-grind/drilling',
  'C-leetcode-grind/understanding',
  'dsm/workspace',
];
const filter = process.argv[2];

for (const t of TRACKS) {
  if (filter && !t.includes(filter)) continue;
  const dir = path.join(ROOT, t);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort();
  const pass = [], partial = [], err = [];
  for (const f of files) {
    const r = spawnSync('node', [path.join(dir, f)], { encoding: 'utf8', timeout: 8000 });
    const out = (r.stdout || '') + (r.stderr || '');
    const m = out.match(/(\d+)\s*\/\s*(\d+)\s*passed/);
    const id = f.replace(/\.js$/, '');
    if (m && m[1] === m[2]) pass.push(id.split('-')[0]);
    else if (m) partial.push(`${id} (${m[1]}/${m[2]})`);
    else err.push(id);
  }
  console.log(`\n## ${t}  —  ${pass.length}/${files.length} passing`);
  if (pass.length) console.log(`  PASS: ${pass.join(' ')}`);
  if (partial.length) console.log(`  PARTIAL/STUB: ${partial.join(', ')}`);
  if (err.length) console.log(`  ERROR/THROWS (usually untouched stub): ${err.join(', ')}`);
}
console.log('\nNote: an untouched stub can show 1/2 by accident (e.g. async concurrency, A-dsa 12).');
console.log('postgres-mastery needs Docker: cd postgres-mastery && npm run db:up && npm run db:reset && npm run test-all');
