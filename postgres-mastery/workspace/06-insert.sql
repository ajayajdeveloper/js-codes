-- ╔══════════════════════════════════════════════════════════╗
--   Problem 6: INSERT — Single, Multi-Row, INSERT...SELECT
--   [DML]  [Easy]
--   node coach.js problem 6   → guiding questions
--   node coach.js hint 6 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- An empty table is waiting for you: sandbox.vip_customers
-- (customer_id, full_name).
--
-- The real `customers` table (public schema, 2,000 rows) is
-- still visible here. Populate sandbox.vip_customers with the
-- id and name of customers 1, 2, and 3 — using ONE statement
-- that reads from `customers`, not three manual INSERTs.
--
--   customers (public, 2,000 rows)      sandbox.vip_customers (target)
--   ┌─────────────┬──────────────┐      ┌─────────────┬──────────────┐
--   │ customer_id │ full_name    │      │ customer_id │ full_name    │
--   ├─────────────┼──────────────┤  →   ├─────────────┼──────────────┤
--   │ 1           │ Customer 1   │      │ 1           │ Customer 1   │
--   │ 2           │ Customer 2   │      │ 2           │ Customer 2   │
--   │ 3           │ Customer 3   │      │ 3           │ Customer 3   │
--   │ ... 1997 more rows ...     │      └─────────────┴──────────────┘
--   └─────────────┴──────────────┘
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • How do you insert rows into one table using the result of
--   a query on another table (INSERT ... SELECT)?

-- ▶▶▶ YOUR SOLUTION — write your DML between the markers ▶▶▶

-- your INSERT statement here

-- ◀◀◀ END SOLUTION ◀◀◀
