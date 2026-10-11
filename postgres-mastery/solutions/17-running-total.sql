-- ⚠️  SPOILERS — attempt workspace/17-running-total.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Running Total With SUM() OVER
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
  round(SUM(revenue) OVER (ORDER BY order_date)) AS running_total
FROM daily_revenue
ORDER BY order_date;

-- ◀◀◀ END SOLUTION ◀◀◀
