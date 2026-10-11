-- ╔══════════════════════════════════════════════════════════╗
--   Problem 4: ALTER an Existing Table   [DDL]  [Easy]
--   node coach.js problem 4   → guiding questions
--   node coach.js hint 4 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- Two tables already exist with data in them:
--
--   sandbox.plans                      sandbox.subscriptions
--   ┌─────────┬───────────────┐        ┌────────┬───────────┬──────┐
--   │ plan_id │ monthly_price │        │ sub_id │ user_email│ plan │
--   ├─────────┼───────────────┤        ├────────┼───────────┼──────┤
--   │ pro     │ 29.99         │        │ 1      │ a@x.com   │ pro  │
--   │ free    │ 0             │        │ 2      │ b@x.com   │ free │
--   └─────────┴───────────────┘        └────────┴───────────┴──────┘
--
-- Make THREE changes to sandbox.subscriptions:
--   1. Add a column `is_active` (boolean, NOT NULL, defaulting
--      to true) — existing rows must end up with true.
--   2. Rename the column `user_email` to `email`.
--   3. Add a FOREIGN KEY from `plan` to sandbox.plans(plan_id),
--      now that the plans table exists to reference.
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • How do you add a column with a default value applied to
--   existing rows?
-- • How do you rename a column without losing its data?
-- • How do you add a foreign key to a table that already has
--   data in it?

-- ▶▶▶ YOUR SOLUTION — write your ALTER TABLE statements between the markers ▶▶▶

-- your ALTER TABLE statements here

-- ◀◀◀ END SOLUTION ◀◀◀
