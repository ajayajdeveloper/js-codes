-- ⚠️  SPOILERS — attempt workspace/09-inner-join.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: INNER JOIN — Orders With Customer Names
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT o.order_id, o.order_date, o.status, c.full_name, c.country
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id
ORDER BY o.order_id;

-- ◀◀◀ END SOLUTION ◀◀◀
