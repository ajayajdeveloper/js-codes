-- ⚠️  SPOILERS — attempt workspace/22-avoid-n-plus-1.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Avoiding N+1 — One Query Instead of Many
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT c.customer_id, c.full_name, count(o.order_id) AS order_count
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
WHERE c.customer_id BETWEEN 1795 AND 1805
GROUP BY c.customer_id, c.full_name
ORDER BY c.customer_id;

-- ◀◀◀ END SOLUTION ◀◀◀
