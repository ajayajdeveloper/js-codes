-- ╔══════════════════════════════════════════════════════════╗
--   Problem 7: UPDATE With a JOIN   [DML]  [Medium]
--   node coach.js problem 7   → guiding questions
--   node coach.js hint 7 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
--   sandbox.products                    sandbox.price_hikes
--   ┌────────────┬────────┬───────┐     ┌────────────┬───────────┐
--   │ product_id │ name   │ price │     │ product_id │ new_price │
--   ├────────────┼────────┼───────┤     ├────────────┼───────────┤
--   │ 1          │ Widget │ 9.99  │     │ 1          │ 12.99     │
--   │ 2          │ Gadget │ 19.99 │     │ 3          │ 34.99     │
--   │ 3          │ Gizmo  │ 29.99 │     └────────────┴───────────┘
--   └────────────┴────────┴───────┘
--
-- Apply every price hike: for each product_id that appears in
-- price_hikes, set products.price to the new_price. Product 2
-- has no hike row, so it keeps its current price (19.99).
--
--   Result (sandbox.products after your UPDATE):
--   ┌────────────┬────────┬───────┐
--   │ product_id │ name   │ price │
--   ├────────────┼────────┼───────┤
--   │ 1          │ Widget │ 12.99 │  ← updated
--   │ 2          │ Gadget │ 19.99 │  ← unchanged, no hike row
--   │ 3          │ Gizmo  │ 34.99 │  ← updated
--   └────────────┴────────┴───────┘
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • Postgres has no UPDATE ... JOIN syntax like MySQL — what
--   clause does it use instead?
-- • How do you make sure the UPDATE only touches matching rows,
--   not the whole table?

-- ▶▶▶ YOUR SOLUTION — write your DML between the markers ▶▶▶

-- your UPDATE statement here

-- ◀◀◀ END SOLUTION ◀◀◀
