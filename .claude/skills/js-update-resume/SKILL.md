---
name: js-update-resume
description: Full context for Ajay's js-update interview-prep repo — every track, how each is run, the coaching rules, what's solved, where each track left off, and what's next. Use at the START of any session in this repo, or whenever the user says resume / continue / "where did I leave off" / "check this" / "next problem", so you pick up immediately without re-analyzing the repo or old transcripts.
---

# js-update — resume context

Personal interview-prep repo (JavaScript, DSA, React, Postgres). Personal GitHub: `git@github-personal:ajayajdeveloper/js-codes.git` (public — never commit secrets). Commit identity is handled automatically (repos under `~/Documents/in/` = personal).

**Do not re-explore the repo or read old transcripts.** Everything needed is here. To refresh the progress numbers, run:
```bash
node .claude/skills/js-update-resume/scripts/status.js          # all tracks
node .claude/skills/js-update-resume/scripts/status.js C-leet   # one track
```

## Coaching rules (set by the user — follow them)
1. **The user writes the code.** Don't write or rewrite their solution, and don't edit their workspace file unless asked.
2. On **"check this" / "check now"**: run `node <file>.js`, report the pass count, trace the *first failing case* to show why it fails, and ask **one leading question**.
3. Give a direct minimal fix **only** when asked "what's the fix" / "is X right".
4. Give a full solution only on an explicit override ("code pls", "show best code", "solution mode"). If they ask for one mid-drill, remind them of their rule once, then do it if they insist.
5. Keep explanations tight. Use trace tables or visualizations when they say "teach from scratch" or "explain".
6. **Re-run before declaring a failure.** Files were often read mid-save.
7. **Their recurring bugs:** `return` inside the loop (early exit), typos like `spilt` or `numsSet`, `split()` with no separator, undeclared variables, a `reduce` callback that doesn't return `acc`. Check these first.

## Tracks and how to run them
Every JS problem file is self-testing: a `TESTS` array plus `if (require.main === module)`, which prints `X/Y passed`. Run it with `node <file>`.

| Track | What it is | Run |
|---|---|---|
| `workspace/` + `solutions/` + `coach.js` (root) | 25 JS fundamentals + 1 bonus. `coach.js` only knows #1–16 | `node coach.js list \| problem N \| hint N 1-3 \| test N \| solution N \| test-all` (16–25 have no solutions/ files; run them directly) |
| `A-dsa/` (+`solutions/`) | 14 basics: sorts, Map/Set, reduce, two-pointer, sliding window, deep clone, promises, quick/merge sort | `node A-dsa/NN-*.js` |
| `B-interview-prep/` | 14 likely interview Qs (Accenture-style), made Sep 6 | `drilling/` = bare stubs; `understanding/` = same stubs + "THINK BEFORE CODING" hints; each has its own `solutions/` (drilling = short, understanding = alternatives + trade-offs) |
| `C-leetcode-grind/` | 17 LeetCode Tier 1/2 problems, same drilling/understanding layout, made Sep 14 | `node C-leetcode-grind/drilling/NN-*.js` |
| `dsm/` | 40 classic DSA patterns (hashing → LRU/matrix), `workspace/` + `solutions/` | `node dsm/workspace/NN-*.js` (headers mention coach.js, but dsm has no runner) |
| `postgres-mastery/` | 22 SQL problems (DDL → window functions → EXPLAIN/N+1) | `npm run db:up && npm run db:reset`, then `npm run problem N \| hint N k \| test N \| test-all`. Docker `postgres:16`, container `pgmastery-db`, port 5544. Answer goes between the `▶▶▶ YOUR SOLUTION` / `◀◀◀ END SOLUTION` markers |
| `react-fundamentals/` | 7-day React course (Vite + React 18). Each day has `README.md`, `example.jsx`, `exercise.jsx`, `interview-qs.md` | `npm run dev`. `src/App.jsx` imports each day's exercise. Status lives in `react-fundamentals/PROGRESS.md`; `interview-checklist.md` is for self-rating |

## Progress snapshot (2026-10-11)
The user has worked through **drilling** folders only. Every `understanding/` file is untouched.

- **root workspace — 17/26 pass.** Done: 01–04, 08–13, 15–21.
  - Attempted but failing: **05 reverse-each-word** (1/5; reverses word order instead of the letters in each word), **14 flatten-one-level** (2/5; appends sub-arrays but never removes the originals).
  - Untouched: 06, 07, 22–25, bonus.
- **A-dsa — 4/14.** Done: 01, 05, 07, 08.
  - Failing: **06 char-frequency** (1/3; returns a Map instead of a plain object).
  - Untouched: 02–04, 09–14.
- **B drilling — 8/14.** Done: 01–06, 08, 10.
  - Untouched: 07, 09, 11–14.
  - **10 merge-intervals is flagged "redo blind under a timer"** (a past interview miss at Platform Science).
- **C drilling — 9/17.** Done: 01–05, 07, 09, 12, 13.
  - **05 product-except-self was written by Claude** on a "code pls" override, not by the user. Worth redoing solo.
  - **Open:** **10 longest-substring** (sliding-window approach explained, code not written), **17 jump-game-ii** (earlier attempt returned true/false instead of a jump count; user watched the visualizer artifact https://claude.ai/artifact/1RAe9bp65s7Q68ZpBo7G2w, never re-attempted).
  - Untouched: 06, 08, 11, 14–16.
- **dsm — 2/40.** Done: 01 two-sum, 04 product-except-self.
  - **03 longest-consecutive is a broken attempt** (`numsSet` typo, `longest` undeclared, Set overwritten by the result of forEach).
  - Rest untouched.
- **postgres — 1/22 attempted.** 01 normalize-flat-table is written into `sandbox.*` but untested; it may fail because the column is named `product_price` and the spec wants `price`. 02–22 untouched.
- **React — Days 1–6 done by hand** (Day 4's stale-request `cancelled` guard bonus was skipped).
  - **Day 7 Performance & Patterns not started.** `App.jsx` still imports its `example.jsx`.
  - Checklist not yet self-rated.

## Session history (brief)
- **Before Sep 6:** root workspace/coach.js, A-dsa, dsm, postgres-mastery and react-fundamentals were created; the user worked root workspace and React Days 1–6.
- **Sep 6:** built B-interview-prep; drilled B 01–08.
- **Sep 9:** wrote react-fundamentals/PROGRESS.md.
- **Sep 14–20:** built C-leetcode-grind (#17 added later); drilled C 01–04 and 07.
- **Sep 21–22:** restarted from a handoff prompt that set the coaching rules; solved C 09 and 13; started C 10.
- **Sep 23:** C 12 string-compression solved by the user after 4 bug fixes.
- **Sep 24:** C 05 taught from scratch, then coded by Claude.
- **Sep 29:** Jump Game II visualizer artifact.
- **Oct 11:** pushed the repo to personal GitHub `js-codes`, set up the personal/work git identity split, and created this skill.

## Suggested next steps (offer these; let the user pick)
1. **Finish C drilling:** 10 longest-substring, then 17 jump-game-ii (solo, no visualizer), then 06, 08, 11, 14–16.
2. **Redo blind:** B-10 merge-intervals under a timer; C-05 product-except-self solo.
3. **Fix the half-done ones:** workspace 05 and 14, A-dsa 06, dsm 03.
4. **Finish B drilling:** 07, 09, then the async set 11–14 (sleep/retry, promisify, debounce/throttle, concurrency).
5. **React Day 7**, then self-rate `interview-checklist.md`.
6. **dsm** patterns in order (from 02) and **postgres** (start Docker, test 01, continue).

## Keep this skill current
At the end of any session where progress changed, update **Progress snapshot**, **Session history** and **Suggested next steps** in this file (with the date). Re-run `status.js` to get the numbers. Keep it short.
