-- ⚠️  SPOILERS — attempt workspace/06-insert.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: INSERT — Single, Multi-Row, and INSERT...SELECT
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DML between the markers ▶▶▶

INSERT INTO sandbox.vip_customers (customer_id, full_name)
SELECT customer_id, full_name
FROM customers
WHERE customer_id IN (1, 2, 3);

-- ◀◀◀ END SOLUTION ◀◀◀
