-- ╔══════════════════════════════════════════════════════════╗
--   Problem 5: Views and Expression Indexes   [DDL]  [Medium]
--   node coach.js problem 5   → guiding questions
--   node coach.js hint 5 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
--   sandbox.people
--   ┌────┬────────────────────┐
--   │ id │ email               │
--   ├────┼────────────────────┤
--   │ 1  │ Alice@Example.com  │
--   │ 2  │ bob@example.com    │
--   └────┴────────────────────┘
--
-- Do TWO things:
--   1. Create a VIEW named `sandbox.people_lower_email` that
--      exposes (id, email_lower) — email lower-cased.
--   2. Create an INDEX on sandbox.people that would actually get
--      used by a query filtering on lower(email) — a plain index
--      on the raw `email` column would NOT be used for that.
--
-- WHY IT MATTERS:
--   WHERE lower(email) = 'alice@example.com'
--   ...can't use a normal B-tree index on `email`, because the
--   index stores the RAW values ('Alice@Example.com'), not the
--   lower-cased ones the query is comparing against.
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • A VIEW does not store data — what does it store instead?
-- • What kind of index lets Postgres use an index for a query
--   wrapped in a function?

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

-- your CREATE VIEW and CREATE INDEX statements here

-- ◀◀◀ END SOLUTION ◀◀◀
