-- ⚠️  SPOILERS — attempt workspace/05-views-and-indexes.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Views and Expression Indexes
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

CREATE VIEW sandbox.people_lower_email AS
SELECT id, lower(email) AS email_lower
FROM sandbox.people;

CREATE INDEX ON sandbox.people (lower(email));

-- ◀◀◀ END SOLUTION ◀◀◀
