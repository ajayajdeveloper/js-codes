-- ⚠️  SPOILERS — attempt workspace/08-delete-upsert.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: DELETE and UPSERT (ON CONFLICT)
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DML between the markers ▶▶▶

DELETE FROM sandbox.carts c
USING sandbox.expired_sessions e
WHERE c.customer_id = e.customer_id;

INSERT INTO sandbox.inventory (product_id, stock_qty)
VALUES (10, 3), (20, 8)
ON CONFLICT (product_id) DO UPDATE
SET stock_qty = sandbox.inventory.stock_qty + EXCLUDED.stock_qty;

-- ◀◀◀ END SOLUTION ◀◀◀
