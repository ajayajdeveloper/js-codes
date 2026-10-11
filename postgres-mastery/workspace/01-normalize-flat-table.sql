-- ╔══════════════════════════════════════════════════════════╗
--   Problem 1: Normalize a Flat Table   [Schema Design]  [Medium]
--   node coach.js problem 1   → guiding questions
--   node coach.js hint 1 1    → first hint (up to 3)
-- ╚══════════════════════════════════════════════════════════╝

-- PROBLEM ──────────────────────────────────────────────────
-- You're given one flat, denormalized table `sandbox.flat_orders`
-- that mixes THREE different entities into every row:
--
--   sandbox.flat_orders
--   ┌──────────┬───────────────┬────────────────────┬──────────────┬───────────────┬──────────┐
--   │ order_id │ customer_name │ customer_email      │ name │ product_price │ quantity │
--   ├──────────┼───────────────┼────────────────────┼──────────────┼───────────────┼──────────┤
--   │ 1        │ Alice         │ alice@example.com  │ Widget       │ 9.99          │ 2        │
--   │ 2        │ Alice         │ alice@example.com  │ Gadget       │ 19.99         │ 1        │
--   │ 3        │ Bob           │ bob@example.com    │ Widget       │ 9.99          │ 5        │
--   └──────────┴───────────────┴────────────────────┴──────────────┴───────────────┴──────────┘
--
-- Notice "Alice" and her email are repeated for every order she
-- has, and "Widget" and its price are repeated for every order
-- that contains it. That repetition is the smell of a table that
-- needs to be split up.
--
-- YOUR TASK: create four normalized tables in the `sandbox` schema
-- and populate them FROM flat_orders:
--
--   sandbox.customers    (customer_id PK, full_name, email UNIQUE)
--   sandbox.products     (product_id PK, name, price)
--   sandbox.orders       (order_id PK — reuse flat_orders.order_id, customer_id FK)
--   sandbox.order_items  (order_item_id PK, order_id FK, product_id FK, quantity)
--
-- CORRECTNESS CHECK — joining your 4 new tables back together
-- must reproduce the original rows:
--   ┌───────────────────┬──────────┬──────────┐
--   │ email              │ name     │ quantity │
--   ├───────────────────┼──────────┼──────────┤
--   │ alice@example.com │ Widget   │ 2        │
--   │ alice@example.com │ Gadget   │ 1        │
--   │ bob@example.com   │ Widget   │ 5        │
--   └───────────────────┴──────────┴──────────┘
--
-- THINK BEFORE CODING ──────────────────────────────────────
-- • What repeating groups exist in the flat table? Each one is
--   a candidate for its own table.
-- • What should the primary key of each new table be?
-- • Where do foreign keys need to go, and in which direction?

-- ▶▶▶ YOUR SOLUTION — write your DDL + DML between the markers ▶▶▶

-- your CREATE TABLE + INSERT statements here

  CREATE TABLE sandbox.customers(customer_id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE);
  INSERT INTO sandbox.customers (full_name, email)
  SELECT DISTINCT customer_name, customer_email FROM sandbox.flat_orders;

  CREATE TABLE sandbox.products(product_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  product_price NUMERIC(10,2) NOT NULL CHECK (product_price >= 0)
  );
  INSERT INTO sandbox.products(name, product_price)
  SELECT DISTINCT product_name, product_price FROM sandbox.flat_orders;

  CREATE TABLE sandbox.orders (
  order_id    INT PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES sandbox.customers(customer_id)
);
    INSERT INTO sandbox.orders (order_id, customer_id)
    SELECT DISTINCT fo.order_id, c.customer_id
    FROM sandbox.flat_orders fo
    JOIN sandbox.customers c ON c.email = fo.customer_email;

    CREATE TABLE sandbox.order_items (
    order_item_id    SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES sandbox.orders(order_id),
    product_id INT NOT NULL REFERENCES sandbox.products(product_id),
    quantity  INT NOT NULL CHECK (quantity > 0)
    );
     INSERT INTO sandbox.order_items ( order_id, product_id, quantity)
     SELECT DISTINCT fo.order_id, p.product_id, fo.quantity
     FROM sandbox.flat_orders fo
     JOIN sandbox.products p ON p.name = fo.product_name;

-- ◀◀◀ END SOLUTION ◀◀◀
