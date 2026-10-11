-- ╔══════════════════════════════════════════════════════════╗
--   Problem 15: CTEs — Revenue Per Category, Ranked
--   [Aggregate Queries]  [Medium]
--   node coach.js problem 15   → guiding questions
--   node coach.js hint 15 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Using a WITH clause (CTE), compute total revenue
-- (quantity * unit_price) per category via
-- categories → products → order_items, then select from that
-- CTE ordered by total_revenue descending.
--
--   Result (shape — your actual values will differ):
--   ┌────────────────┬───────────────┐
--   │ name            │ total_revenue │
--   ├─────────────────┼───────────────┤
--   │ Electronics     │ 9123456       │
--   │ Sports          │ 7654321       │
--   │ ...             │ ...           │
--   └─────────────────┴───────────────┘
--
-- Round total_revenue.
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • Why break a query into a WITH (CTE) instead of nesting
--   subqueries?
-- • What does the CTE need to GROUP BY?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
