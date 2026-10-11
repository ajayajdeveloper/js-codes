-- ╔══════════════════════════════════════════════════════════╗
--   Problem 18: LAG / LEAD — Comparing to the Previous Row
--   [Window Functions]  [Medium]
--   node coach.js problem 18   → guiding questions
--   node coach.js hint 18 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Reuse the same daily-revenue CTE as Problem 17 (orders before
-- 2020-01-15), but this time compare each day to the day BEFORE
-- it using LAG — no self-join needed.
--
--   order_date | revenue | prev_day_revenue | change_from_prev
--   -----------+---------+-------------------+-------------------
--   2020-01-02 | 12000   | NULL              | NULL              ← no previous day
--   2020-01-03 | 9500    | 12000             | -2500
--   2020-01-04 | 15000   | 9500              | 5500
--
-- Return: order_date, revenue (rounded), prev_day_revenue
-- (rounded), change_from_prev (rounded = revenue - prev_day),
-- ordered by order_date.
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • How would you compute "this row vs the previous row"
--   without a self-join?
-- • What does LAG return for the very first row?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
