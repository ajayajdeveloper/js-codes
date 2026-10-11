-- ╔══════════════════════════════════════════════════════════╗
--   Problem 17: Running Total With SUM() OVER
--   [Window Functions]  [Medium]
--   node coach.js problem 17   → guiding questions
--   node coach.js hint 17 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- For orders placed before 2020-01-15, compute each day's total
-- revenue AND a running (cumulative) total across days, in one
-- query, using a CTE + a window function.
--
--   order_date | revenue | running_total
--   -----------+---------+---------------
--   2020-01-02 | 12000   | 12000          ← first day: running = daily
--   2020-01-03 | 9500    | 21500          ← 12000 + 9500
--   2020-01-04 | 15000   | 36500          ← 21500 + 15000
--
-- Steps:
--   1. CTE: SUM(quantity * unit_price) revenue per order_date
--      (join orders → order_items, filter by date, GROUP BY date).
--   2. Outer query: SUM(revenue) OVER (ORDER BY order_date) turns
--      each day's revenue into a running total.
--
-- Return: order_date, revenue (rounded), running_total (rounded),
-- ordered by order_date. Row order matters here — it IS the answer.
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • What does PARTITION BY do inside OVER() versus ORDER BY?
-- • What frame does SUM() OVER (ORDER BY d) use by default —
--   why is that exactly what a running total needs?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
