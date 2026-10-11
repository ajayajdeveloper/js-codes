-- ⚠️  SPOILERS — attempt workspace/15-cte-aggregate.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: CTEs — Revenue Per Category, Ranked
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

WITH revenue_per_category AS (
  SELECT cat.category_id, cat.name,
         SUM(oi.quantity * oi.unit_price) AS total_revenue
  FROM categories cat
  JOIN products p ON p.category_id = cat.category_id
  JOIN order_items oi ON oi.product_id = p.product_id
  GROUP BY cat.category_id, cat.name
)
SELECT name, round(total_revenue) AS total_revenue
FROM revenue_per_category
ORDER BY total_revenue DESC;

-- ◀◀◀ END SOLUTION ◀◀◀
