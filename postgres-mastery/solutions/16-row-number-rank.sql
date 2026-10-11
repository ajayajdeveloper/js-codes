-- ⚠️  SPOILERS — attempt workspace/16-row-number-rank.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: ROW_NUMBER vs RANK vs DENSE_RANK
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT
  full_name,
  salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
  RANK()       OVER (ORDER BY salary DESC) AS rank_num,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank_num
FROM employees
ORDER BY salary DESC, full_name;

-- ◀◀◀ END SOLUTION ◀◀◀
