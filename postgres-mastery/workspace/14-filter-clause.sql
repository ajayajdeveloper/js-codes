-- ╔══════════════════════════════════════════════════════════╗
--   Problem 14: Conditional Aggregation (FILTER)
--   [Aggregate Queries]  [Medium]
--   node coach.js problem 14   → guiding questions
--   node coach.js hint 14 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- From ONE pass over `orders`, return three numbers in a single
-- row: the total order count, how many are 'paid', and how many
-- are 'cancelled'.
--
--   orders                        Result:
--   ┌──────────┬───────────┐      ┌──────────────┬─────────────┬──────────────────┐
--   │ order_id │ status    │      │ total_orders │ paid_orders │ cancelled_orders │
--   ├──────────┼───────────┤      ├──────────────┼─────────────┼──────────────────┤
--   │ 1        │ pending   │  →   │ 50000        │ 12500       │ 12500             │
--   │ 2        │ paid      │      └──────────────┴─────────────┴──────────────────┘
--   │ 3        │ shipped   │
--   │ 4        │ cancelled │
--   └──────────┴───────────┘
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • How do you compute two different counts (paid vs cancelled)
--   in the SAME row, from the same table, without two separate
--   queries?
-- • What is the FILTER clause, and how does it compare to
--   CASE WHEN inside an aggregate?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
