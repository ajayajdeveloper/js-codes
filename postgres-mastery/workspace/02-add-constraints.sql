-- ╔══════════════════════════════════════════════════════════╗
--   Problem 2: Constrain an Under-Constrained Schema
--   [Schema Design]  [Easy]
--   node coach.js problem 2   → guiding questions
--   node coach.js hint 2 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- This table exists but has NO constraints at all — anything
-- can be inserted into it, which is how bad data gets in:
--
--   sandbox.accounts
--   ┌────────────┬───────┬─────────┬─────────┐
--   │ account_id │ email │ balance │ status  │
--   ├────────────┼───────┼─────────┼─────────┤
--   │  (int)     │ (text)│ (numeric)│ (text) │
--   └────────────┴───────┴─────────┴─────────┘
--
-- Add constraints so that:
--   • account_id is the PRIMARY KEY
--   • email is required (NOT NULL) and UNIQUE
--   • balance can never be negative
--   • status can only be 'active', 'suspended', or 'closed'
--
-- EXAMPLE — after your constraints, these should now be REJECTED:
--   INSERT INTO sandbox.accounts VALUES (1, NULL, 100, 'active');       -- email required
--   INSERT INTO sandbox.accounts VALUES (1, 'a@x.com', -50, 'active');  -- balance >= 0
--   INSERT INTO sandbox.accounts VALUES (1, 'a@x.com', 100, 'vip');     -- bad status
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • Which column should never be duplicated across rows?
-- • Which column should never be negative?
-- • Which column can only take one of a fixed set of values?

-- ▶▶▶ YOUR SOLUTION — write your ALTER TABLE statements between the markers ▶▶▶

-- your ALTER TABLE statements here

-- ◀◀◀ END SOLUTION ◀◀◀
