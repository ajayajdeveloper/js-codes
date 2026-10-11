-- ⚠️  SPOILERS — attempt workspace/03-create-table.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: CREATE TABLE From Scratch
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

CREATE TABLE reviews (
  review_id  SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  rating     INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body       TEXT,
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ◀◀◀ END SOLUTION ◀◀◀
