-- ════════════════════════════════════════════════════════════
--  pgmastery — base practice schema
--  Domain: a small store (customers/products/orders) plus an
--  HR side table (departments/employees) for self-join practice.
--  Used by the Joins / Aggregates / Window Functions / Performance
--  problems, which are read-only (SELECT) so this schema never
--  needs to be reset between attempts.
-- ════════════════════════════════════════════════════════════

DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

-- A separate scratch schema that Schema Design / DDL / DML problems
-- write into. pg-coach.js wipes and rebuilds this schema before each
-- of those tests, so it's always safe to CREATE/ALTER/DROP in there.
DROP SCHEMA IF EXISTS sandbox CASCADE;
CREATE SCHEMA sandbox;

-- ── departments / employees (self-join, org-chart style data) ──

CREATE TABLE departments (
  department_id SERIAL PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  budget        NUMERIC(12,2) NOT NULL
);

CREATE TABLE employees (
  employee_id   SERIAL PRIMARY KEY,
  full_name     TEXT NOT NULL,
  department_id INT REFERENCES departments(department_id),
  manager_id    INT REFERENCES employees(employee_id),
  salary        NUMERIC(10,2) NOT NULL,
  hire_date     DATE NOT NULL
);

-- ── store domain ─────────────────────────────────────────────

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name        TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
  product_id  SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category_id INT REFERENCES categories(category_id),
  price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  stock_qty   INT NOT NULL DEFAULT 0
);

CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  country     TEXT NOT NULL,
  signup_date DATE NOT NULL
);

CREATE TABLE orders (
  order_id    SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(customer_id),
  order_date  DATE NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled'))
);

CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id      INT NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id    INT NOT NULL REFERENCES products(product_id),
  quantity      INT NOT NULL CHECK (quantity > 0),
  unit_price    NUMERIC(10,2) NOT NULL
);

-- Deliberately NO index on order_items.order_id / orders.customer_id yet —
-- the Performance problems have you discover this with EXPLAIN ANALYZE
-- and add the index yourselves.
