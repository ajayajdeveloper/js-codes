-- ⚠️  SPOILERS — attempt workspace/20-explain-index.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Reading EXPLAIN ANALYZE — Fix a Seq Scan
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

CREATE INDEX pgm_idx_orders_customer_id ON orders (customer_id);

-- ◀◀◀ END SOLUTION ◀◀◀
