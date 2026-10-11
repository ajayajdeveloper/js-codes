-- ⚠️  SPOILERS — attempt workspace/07-update-join.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: UPDATE With a JOIN
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DML between the markers ▶▶▶

UPDATE sandbox.products p
SET price = h.new_price
FROM sandbox.price_hikes h
WHERE p.product_id = h.product_id;

-- ◀◀◀ END SOLUTION ◀◀◀
