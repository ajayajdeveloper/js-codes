-- ⚠️  SPOILERS — attempt workspace/14-filter-clause.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Conditional Aggregation (FILTER)
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT
  count(*) AS total_orders,
  count(*) FILTER (WHERE status = 'paid') AS paid_orders,
  count(*) FILTER (WHERE status = 'cancelled') AS cancelled_orders
FROM orders;

-- ◀◀◀ END SOLUTION ◀◀◀
