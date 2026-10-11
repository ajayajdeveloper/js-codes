-- ⚠️  SPOILERS — attempt workspace/12-multi-join.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Multi-Table JOIN — Full Order Detail
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT o.order_id, p.name AS product_name, cat.name AS category_name,
       oi.quantity, oi.unit_price
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id
JOIN products p ON p.product_id = oi.product_id
JOIN categories cat ON cat.category_id = p.category_id
WHERE o.order_id IN (1, 2, 3)
ORDER BY o.order_id, p.name;

-- ◀◀◀ END SOLUTION ◀◀◀
