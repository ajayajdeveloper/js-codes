-- ⚠️  SPOILERS — attempt workspace/19-top-n-per-group.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Top-N Per Group With PARTITION BY
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

WITH product_revenue AS (
  SELECT p.product_id, p.name, cat.name AS category_name,
         SUM(oi.quantity * oi.unit_price) AS revenue,
         ROW_NUMBER() OVER (
           PARTITION BY p.category_id ORDER BY SUM(oi.quantity * oi.unit_price) DESC, p.product_id
         ) AS rn
  FROM products p
  JOIN categories cat ON cat.category_id = p.category_id
  JOIN order_items oi ON oi.product_id = p.product_id
  GROUP BY p.product_id, p.name, cat.name, p.category_id
)
SELECT category_name, name AS product_name, round(revenue) AS revenue, rn
FROM product_revenue
WHERE rn <= 3
ORDER BY category_name, rn;

-- ◀◀◀ END SOLUTION ◀◀◀
