-- ╔══════════════════════════════════════════════════════════╗
--   Problem 16: ROW_NUMBER vs RANK vs DENSE_RANK
--   [Window Functions]  [Medium]
--   node coach.js problem 16   → guiding questions
--   node coach.js hint 16 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Several employees have the SAME salary. Rank all 25 employees
-- by salary (highest first) THREE different ways, side by side,
-- to see exactly how ties are handled:
--
--   full_name    | salary | row_num | rank_num | dense_rank_num
--   -------------+--------+---------+----------+----------------
--   Employee 25  | 68000  | 1       | 1        | 1
--   Employee 24  | 66500  | 2       | 2        | 2
--   Employee 23  | 66500  | 3       | 2        | 2               ← tie!
--   Employee 21  | 65000  | 4       | 4        | 3               ← RANK skips to 4, DENSE_RANK doesn't
--   Employee 22  | 65000  | 5       | 4        | 3
--
-- Return: full_name, salary, row_num, rank_num, dense_rank_num
-- for all employees, ordered by salary DESC then full_name (for
-- a stable, reproducible tiebreak in the final ORDER BY only —
-- not inside the window functions themselves).
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • If two employees tie on salary, do ROW_NUMBER, RANK, and
--   DENSE_RANK agree on their position?
-- • After a tie, does RANK or DENSE_RANK skip the next number?

-- ▶▶▶ YOUR SOLUTION — write your query between the markers ▶▶▶

-- your query here

-- ◀◀◀ END SOLUTION ◀◀◀
