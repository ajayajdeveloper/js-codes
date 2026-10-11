-- ╔══════════════════════════════════════════════════════════╗
--   Problem 13: GROUP BY + HAVING — Big-Spending Countries
--   [Aggregate Queries]  [Easy]
--   node coach.js problem 13   → guiding questions
--   node coach.js hint 13 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Join customers → orders → order_items, compute each country's
-- TOTAL revenue (SUM of quantity * unit_price), then keep only
-- countries whose total revenue exceeds 4,000,000.
--
--   (illustrative — real data has 8 countries, ~50,000 orders)
--   country   | total_revenue
--   ----------+---------------
--   Japan     | 1,872,313      ← below threshold, excluded
--   Australia | 5,553,750      ← above threshold, kept
--   India     | 7,362,875      ← above threshold, kept
--
-- Return: country, total_revenue (rounded), ordered by country.
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • What is the difference between filtering with WHERE and
--   filtering with HAVING?
-- • Why can you not write WHERE sum(...) > 4000000 directly?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
