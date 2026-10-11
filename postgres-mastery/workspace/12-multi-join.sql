-- ╔══════════════════════════════════════════════════════════╗
--   Problem 12: Multi-Table JOIN — Full Order Detail
--   [Joins]  [Medium]
--   node coach.js problem 12   → guiding questions
--   node coach.js hint 12 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Going from an order to its product's category takes FOUR
-- tables:
--
--   orders → order_items → products → categories
--   (order_id)  (product_id)  (category_id)
--
-- For orders 1, 2, and 3 only, return: order_id, product_name,
-- category_name, quantity, unit_price — one row per order item,
-- ordered by order_id then product_name.
--
--   Result (shape — your actual values will differ):
--   ┌──────────┬──────────────┬────────────────┬──────────┬────────────┐
--   │ order_id │ product_name │ category_name  │ quantity │ unit_price │
--   ├──────────┼──────────────┼────────────────┼──────────┼────────────┤
--   │ 1        │ Product 12   │ Books          │ 3        │ 52.43      │
--   │ 1        │ Product 33   │ Toys           │ 1        │ 121.10     │
--   │ 2        │ Product  7   │ Electronics    │ 2        │ 33.58      │
--   └──────────┴──────────────┴────────────────┴──────────┴────────────┘
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • How many tables do you need to go from an order to a
--   product's category?
-- • Does join order change the result?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
