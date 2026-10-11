-- ⚠️  SPOILERS — attempt workspace/18-lag-lead.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: LAG / LEAD — Comparing to the Previous Row
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

WITH daily_revenue AS (
  SELECT o.order_date, SUM(oi.quantity * oi.unit_price) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  WHERE o.order_date < DATE '2020-01-15'
  GROUP BY o.order_date
)
SELECT
  order_date,
  round(revenue) AS revenue,
  round(LAG(revenue) OVER (ORDER BY order_date)) AS prev_day_revenue,
  round(revenue - LAG(revenue) OVER (ORDER BY order_date)) AS change_from_prev
FROM daily_revenue
ORDER BY order_date;

-- ◀◀◀ END SOLUTION ◀◀◀
