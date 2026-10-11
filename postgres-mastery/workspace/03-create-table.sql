-- ╔══════════════════════════════════════════════════════════╗
--   Problem 3: CREATE TABLE From Scratch   [DDL]  [Easy]
--   node coach.js problem 3   → guiding questions
--   node coach.js hint 3 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Create a table named `reviews` with these columns:
--   review_id   auto-incrementing primary key
--   product_id  integer, required
--   rating      integer, required, must be between 1 and 5
--   body        text, optional
--   created_at  date, required, defaults to today
--
-- This runs in the `sandbox` schema, which pg-coach.js wipes
-- clean before every test run — CREATE/DROP freely.
--
-- EXAMPLE — after your CREATE TABLE, this should work:
--   INSERT INTO reviews (product_id, rating, body) VALUES (7, 5, 'Great!');
--   SELECT * FROM reviews;
--   ┌───────────┬────────────┬────────┬─────────┬────────────┐
--   │ review_id │ product_id │ rating │ body    │ created_at │
--   ├───────────┼────────────┼────────┼─────────┼────────────┤
--   │ 1         │ 7          │ 5      │ Great!  │ 2026-08-09 │
--   └───────────┴────────────┴────────┴─────────┴────────────┘
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • What is the primary key, and should it auto-increment?
-- • Which columns must always have a value?
-- • What data type fits a rating limited to 1-5?

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

-- your CREATE TABLE statement here

-- ◀◀◀ END SOLUTION ◀◀◀
