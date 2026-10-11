-- ⚠️  SPOILERS — attempt workspace/01-normalize-flat-table.sql first!
-- ════════════════════════════════════════════════════════════
--  Solution: Normalize a Flat Table
-- ════════════════════════════════════════════════════════════

-- ▶▶▶ YOUR SOLUTION — write your DDL between the markers ▶▶▶

CREATE TABLE sandbox.customers (
  customer_id SERIAL PRIMARY KEY,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE
);
INSERT INTO sandbox.customers (full_name, email)
SELECT DISTINCT customer_name, customer_email FROM sandbox.flat_orders;

CREATE TABLE sandbox.products (
  product_id SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  price      NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);
INSERT INTO sandbox.products (name, price)
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
  order_item_id SERIAL PRIMARY KEY,
  order_id      INT NOT NULL REFERENCES sandbox.orders(order_id),
  product_id    INT NOT NULL REFERENCES sandbox.products(product_id),
  quantity      INT NOT NULL CHECK (quantity > 0)
);
INSERT INTO sandbox.order_items (order_id, product_id, quantity)
SELECT fo.order_id, p.product_id, fo.quantity
FROM sandbox.flat_orders fo
JOIN sandbox.products p ON p.name = fo.product_name;

-- ◀◀◀ END SOLUTION ◀◀◀
