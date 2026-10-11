-- ⚠️  SPOILERS — attempt workspace/21-sargable-rewrite.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Sargable Rewrite — Function-on-Column Anti-Pattern
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT customer_id, full_name, signup_date
FROM customers
WHERE signup_date >= DATE '2019-01-01' AND signup_date < DATE '2020-01-01'
ORDER BY customer_id;

-- ◀◀◀ END SOLUTION ◀◀◀
