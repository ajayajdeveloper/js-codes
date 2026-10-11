-- ⚠️  SPOILERS — attempt workspace/11-self-join.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Self JOIN — Employees and Their Managers
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

SELECT e.employee_id, e.full_name AS employee_name, m.full_name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id
ORDER BY e.employee_id;

-- ◀◀◀ END SOLUTION ◀◀◀
