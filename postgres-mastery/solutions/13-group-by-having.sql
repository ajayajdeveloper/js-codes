-- ⚠️  SPOILERS — attempt workspace/13-group-by-having.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: GROUP BY + HAVING — Big-Spending Countries
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT c.country, round(SUM(oi.quantity * oi.unit_price)) AS total_revenue
FROM customers c
JOIN orders o ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY c.country
HAVING SUM(oi.quantity * oi.unit_price) > 4000000
ORDER BY c.country;

-- ◀◀◀ END SOLUTION ◀◀◀
