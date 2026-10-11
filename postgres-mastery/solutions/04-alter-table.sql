-- ⚠️  SPOILERS — attempt workspace/04-alter-table.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: ALTER an Existing Table
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

ALTER TABLE sandbox.subscriptions ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE sandbox.subscriptions RENAME COLUMN user_email TO email;
ALTER TABLE sandbox.subscriptions ADD CONSTRAINT fk_subscriptions_plan FOREIGN KEY (plan) REFERENCES sandbox.plans(plan_id);

-- ◀◀◀ END SOLUTION ◀◀◀
