-- ⚠️  SPOILERS — attempt workspace/02-add-constraints.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Constrain an Under-Constrained Schema
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

ALTER TABLE sandbox.accounts ADD CONSTRAINT accounts_pkey PRIMARY KEY (account_id);
ALTER TABLE sandbox.accounts ADD CONSTRAINT accounts_email_key UNIQUE (email);
ALTER TABLE sandbox.accounts ALTER COLUMN email SET NOT NULL;
ALTER TABLE sandbox.accounts ADD CONSTRAINT accounts_balance_check CHECK (balance >= 0);
ALTER TABLE sandbox.accounts ADD CONSTRAINT accounts_status_check CHECK (status IN ('active', 'suspended', 'closed'));

-- ◀◀◀ END SOLUTION ◀◀◀
