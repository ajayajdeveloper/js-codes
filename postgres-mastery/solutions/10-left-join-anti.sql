-- ⚠️  SPOILERS — attempt workspace/10-left-join-anti.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: LEFT JOIN — Customers With Zero Orders
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT c.customer_id, c.full_name, c.country
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL
ORDER BY c.customer_id;

-- ◀◀◀ END SOLUTION ◀◀◀
