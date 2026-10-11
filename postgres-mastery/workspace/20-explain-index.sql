-- ╔══════════════════════════════════════════════════════════╗
--   Problem 20: Reading EXPLAIN ANALYZE — Fix a Seq Scan
--   [Performance]  [Medium]
--   node coach.js problem 20   → guiding questions
--   node coach.js hint 20 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- `orders` has 50,000 rows. This query has to check the WHOLE
-- table row by row, because customer_id has no index:
--
--   EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42;
--
--   QUERY PLAN
--   ┌────────────────────────────────────────────────────────┐
--   │ Seq Scan on orders  (cost=0.00..1027.00 rows=25 ...)    │  ← reads all 50,000 rows
--   │   Filter: (customer_id = 42)                            │     to find ~25 matches
--   │   Rows Removed by Filter: 49975                         │
--   │ Planning Time: 0.112 ms                                 │
--   │ Execution Time: 4.831 ms                                │
--   └────────────────────────────────────────────────────────┘
--
-- After adding the right index, the SAME query should instead
-- show an Index Scan / Bitmap Index Scan and touch only the
-- ~25 matching rows.
--
-- Create an index named exactly:  pgm_idx_orders_customer_id
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • What column needs an index to make this a fast point
--   lookup instead of a full scan?
-- • What is the basic CREATE INDEX syntax?

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

-- your CREATE INDEX statement here

-- ◀◀◀ END SOLUTION ◀◀◀
