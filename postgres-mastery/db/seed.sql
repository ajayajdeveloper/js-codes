-- ════════════════════════════════════════════════════════════
--  pgmastery — deterministic seed data
--  Everything here is generated with generate_series + modulo
--  arithmetic (never random() or now()) so re-seeding always
--  produces byte-identical data — required for pg-coach.js to
--  grade your queries against fixed expected output.
-- ════════════════════════════════════════════════════════════

TRUNCATE order_items, orders, customers, products, categories,
         employees, departments RESTART IDENTITY CASCADE;

-- ── departments (5) ──────────────────────────────────────────
INSERT INTO departments (name, budget) VALUES
  ('Engineering', 1200000),
  ('Sales',        450000),
  ('Marketing',    300000),
  ('Support',      250000),
  ('Finance',      200000);

-- ── employees (25) — a small org chart for self-join practice ─
-- employee 1 = CEO (no manager)
-- employees 2-6  report to employee 1
-- employees 7-25 report to one of employees 2-6
-- salary pairs up consecutive employees (1&2, 3&4, ...) so
-- RANK/DENSE_RANK/ROW_NUMBER tie-breaking has real ties to show.
INSERT INTO employees (full_name, department_id, manager_id, salary, hire_date)
SELECT
  'Employee ' || n,
  ((n - 1) % 5) + 1,
  CASE
    WHEN n = 1 THEN NULL
    WHEN n BETWEEN 2 AND 6 THEN 1
    ELSE 2 + ((n - 7) % 5)
  END,
  50000 + (((n - 1) / 2) * 1500),
  DATE '2015-01-01' + (n * 45)
FROM generate_series(1, 25) AS n;

-- ── categories (6) ───────────────────────────────────────────
INSERT INTO categories (name) VALUES
  ('Electronics'), ('Books'), ('Home & Kitchen'),
  ('Toys'), ('Clothing'), ('Sports');

-- ── products (50) ────────────────────────────────────────────
INSERT INTO products (name, category_id, price, stock_qty)
SELECT
  'Product ' || n,
  ((n - 1) % 6) + 1,
  ROUND((9.99 + (n * 3.37))::numeric, 2),
  ((n * 7) % 100) + 10
FROM generate_series(1, 50) AS n;

-- ── customers (2,000) ────────────────────────────────────────
INSERT INTO customers (full_name, email, country, signup_date)
SELECT
  'Customer ' || n,
  'customer' || n || '@example.com',
  (ARRAY['USA','UK','India','Germany','Canada','Australia','France','Japan'])[((n - 1) % 8) + 1],
  DATE '2018-01-01' + (n % 2000)
FROM generate_series(1, 2000) AS n;

-- ── orders (50,000) ──────────────────────────────────────────
-- status cycles pending/paid/shipped/cancelled; order_date spread
-- across ~4 years so date-range and time-series queries have shape.
-- Only customers 1-1800 get orders (of 2000 total) — customers
-- 1801-2000 are deliberately left order-less for LEFT JOIN /
-- anti-join practice.
INSERT INTO orders (customer_id, order_date, status)
SELECT
  ((n - 1) % 1800) + 1,
  DATE '2020-01-01' + (n % 1460),
  (ARRAY['pending','paid','shipped','cancelled'])[((n - 1) % 4) + 1]
FROM generate_series(1, 50000) AS n;

-- ── order_items (~125,000) ───────────────────────────────────
-- each order gets 1-4 line items; unit_price is copied from the
-- product's price at seed time (a realistic order-history snapshot).
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT
  o.order_id,
  p.product_id,
  ((o.order_id + gs) % 5) + 1,
  p.price
FROM orders o
CROSS JOIN LATERAL generate_series(1, (o.order_id % 4) + 1) AS gs
JOIN products p ON p.product_id = ((o.order_id + gs) % 50) + 1;

ANALYZE;
