-- ╔══════════════════════════════════════════════════════════╗
--   Problem 9: INNER JOIN — Orders With Customer Names
--   [Joins]  [Easy]
--   node coach.js problem 9   → guiding questions
--   node coach.js hint 9 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Return every order with the customer's name and country
-- attached, ordered by order_id.
--
-- Columns: order_id, order_date, status, full_name, country
--
-- TABLES INVOLVED
--   orders                          customers
--   ┌──────────┬─────────────┬──────┐   ┌─────────────┬───────────┬─────────┐
--   │ order_id │ customer_id │ ...  │   │ customer_id │ full_name │ country │
--   ├──────────┼─────────────┼──────┤   ├─────────────┼───────────┼─────────┤
--   │ 101      │ 7           │ ...  │   │ 7           │ Alice     │ USA     │
--   │ 102      │ 9           │ ...  │   │ 9           │ Bob       │ UK      │
--   └──────────┴─────────────┴──────┘   └─────────────┴───────────┴─────────┘
--
-- EXAMPLE RESULT (illustrative — real tables have 50,000 orders)
--   ┌──────────┬────────────┬────────┬───────────┬─────────┐
--   │ order_id │ order_date │ status │ full_name │ country │
--   ├──────────┼────────────┼────────┼───────────┼─────────┤
--   │ 101      │ 2021-03-04 │ paid   │ Alice     │ USA     │
--   │ 102      │ 2021-03-05 │ shipped│ Bob       │ UK      │
--   └──────────┴────────────┴────────┴───────────┴─────────┘
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • Which column links orders to customers?
-- • INNER JOIN only keeps rows that match on both sides — what
--   does that exclude here?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
