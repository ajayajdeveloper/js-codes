#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// ── ANSI helpers (no external deps) ──────────────────────
const R = '\x1b[0m';
const B = '\x1b[1m';
const DIM = '\x1b[2m';
const red = (s) => `\x1b[31m${s}${R}`;
const green = (s) => `\x1b[32m${s}${R}`;
const yel = (s) => `\x1b[33m${s}${R}`;
const cyan = (s) => `\x1b[36m${s}${R}`;
const mag = (s) => `\x1b[35m${s}${R}`;
const bold = (s) => `${B}${s}${R}`;
const dim = (s) => `${DIM}${s}${R}`;
const hr = (ch = '─', n = 60) => dim(ch.repeat(n));

const NULL_TOKEN = '<<NULL>>';
const FIELD_SEP = '\x1f'; // ASCII unit separator — never appears in real data

// ── Postgres connection (isolated docker container) ──────
const CONTAINER = 'pgmastery-db';
const PG_USER = 'pgmastery';
const PG_DB = 'pgmastery';

function ensureDbUp() {
  try {
    execFileSync('docker', ['exec', CONTAINER, 'pg_isready', '-U', PG_USER], { stdio: 'ignore' });
  } catch {
    console.error(red(bold('\nPostgres container is not running.')));
    console.error(`Start it first:\n\n  ${cyan('npm run db:up')}\n`);
    process.exit(1);
  }
}

// Runs a block of SQL via psql over stdin. Returns { rows, error }.
// rows: string[][]  (NULL_TOKEN marks SQL NULL, distinct from empty string)
// error: string|null — psql's stderr if the script failed (ON_ERROR_STOP)
function runSql(sql, { schema = 'public' } = {}) {
  const script = `SET search_path TO ${schema};\n${sql}`;
  try {
    const out = execFileSync(
      'docker',
      [
        'exec', '-i', CONTAINER,
        'psql', '-U', PG_USER, '-d', PG_DB,
        '-X', '-q', '-t', '-A',
        '-F', FIELD_SEP,
        '-P', `null=${NULL_TOKEN}`,
        '-v', 'ON_ERROR_STOP=1',
      ],
      { input: script, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], maxBuffer: 1024 * 1024 * 200 }
    );
    const rows = out
      .split('\n')
      .filter((line) => line.length > 0)
      .map((line) => line.split(FIELD_SEP));
    return { rows, error: null };
  } catch (e) {
    return { rows: null, error: (e.stderr || e.message || String(e)).toString().trim() };
  }
}

function resetSandbox() {
  const r = runSql('DROP SCHEMA IF EXISTS sandbox CASCADE; CREATE SCHEMA sandbox;');
  if (r.error) throw new Error('Could not reset sandbox schema: ' + r.error);
}

// Extracts the SQL written between the marker comments in a workspace/solutions file.
function extractSolutionBlock(fileText) {
  const start = fileText.indexOf('-- ▶▶▶');
  const end = fileText.indexOf('-- ◀◀◀');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Could not find ▶▶▶ / ◀◀◀ solution markers in file.');
  }
  const startOfLine = fileText.indexOf('\n', start) + 1;
  return fileText.slice(startOfLine, end).trim();
}

function readBlock(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  return extractSolutionBlock(text);
}

// Row-set equality. Order-sensitive unless orderMatters === false.
function rowsEqual(a, b, orderMatters) {
  if (a.length !== b.length) return false;
  const norm = (rows) => {
    const copy = rows.map((r) => r.join(FIELD_SEP));
    return orderMatters === false ? copy.sort() : copy;
  };
  const na = norm(a);
  const nb = norm(b);
  return na.every((v, i) => v === nb[i]);
}

function printRows(rows, limit = 8) {
  if (!rows || rows.length === 0) return console.log(dim('  (no rows)'));
  rows.slice(0, limit).forEach((r) => console.log('  ' + r.join(' | ')));
  if (rows.length > limit) console.log(dim(`  ... (${rows.length - limit} more rows)`));
}

// ══════════════════════════════════════════════════════════
//  PROBLEM METADATA
// ══════════════════════════════════════════════════════════
// mode: 'select' — read-only query against the public schema.
//                  Graded by diffing your query's result against
//                  solutions/NN-*.sql's result.
// mode: 'mutate' — DDL/DML against the sandbox schema (reset
//                  before every run). Graded by diffing checkSql's
//                  result after your code vs after the reference.
// mode: 'index'  — a CREATE INDEX statement against the public
//                  schema. Graded by inspecting EXPLAIN (FORMAT JSON)
//                  of checkQuery for the plan shape you're expected
//                  to produce.

const CATEGORIES = [
  'Schema Design',
  'DDL',
  'DML',
  'Joins',
  'Aggregate Queries',
  'Window Functions',
  'Performance',
];

const PROBLEMS = {
  1: {
    title: 'Normalize a Flat Table',
    file: '01-normalize-flat-table',
    category: 'Schema Design',
    difficulty: 'Medium',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'What repeating groups exist in the flat table? Each one is a candidate for its own table.',
      'What should the primary key of each new table be?',
      'Where do foreign keys need to go, and in which direction?',
      'Is there any column whose value is fully determined by a non-key column (a transitive dependency)?',
    ],
    hints: [
      'A row like (order_id, customer_name, customer_email, product_name, product_price) mixes THREE entities: orders, customers, products. Each becomes its own table.',
      'The "many" side of a relationship holds the foreign key. One customer -> many orders, so orders.customer_id references customers.',
      'After splitting, the original flat rows should be reconstructable with a JOIN across your new tables — that is your correctness check.',
    ],
    followUps: [
      'What normal form does your result satisfy — 2NF or 3NF? What would violate it?',
      'When would you deliberately denormalize (e.g. a reporting table) despite knowing this?',
    ],
    setupSql: `
      CREATE TABLE sandbox.flat_orders (
        order_id        INT,
        customer_name   TEXT,
        customer_email  TEXT,
        product_name    TEXT,
        product_price   NUMERIC(10,2),
        quantity        INT
      );
      INSERT INTO sandbox.flat_orders VALUES
        (1, 'Alice', 'alice@example.com', 'Widget',  9.99, 2),
        (2, 'Alice', 'alice@example.com', 'Gadget', 19.99, 1),
        (3, 'Bob',   'bob@example.com',   'Widget',  9.99, 5);
    `,
    checkSql: `
      SELECT c.email, p.name, oi.quantity
      FROM sandbox.orders o
      JOIN sandbox.customers c ON c.customer_id = o.customer_id
      JOIN sandbox.order_items oi ON oi.order_id = o.order_id
      JOIN sandbox.products p ON p.product_id = oi.product_id
      ORDER BY o.order_id;
    `,
  },
  2: {
    title: 'Constrain an Under-Constrained Schema',
    file: '02-add-constraints',
    category: 'Schema Design',
    difficulty: 'Easy',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'Which column should never be duplicated across rows?',
      'Which column should never be negative?',
      'Which column should never be NULL?',
      'Which column can only take one of a fixed set of values?',
    ],
    hints: [
      'ALTER TABLE sandbox.accounts ADD CONSTRAINT ... — you can add PRIMARY KEY, UNIQUE, CHECK, and NOT NULL after the fact.',
      'NOT NULL is added with: ALTER TABLE t ALTER COLUMN col SET NOT NULL.',
      "A fixed set of allowed values is a CHECK (col IN ('a','b','c')) constraint.",
    ],
    followUps: [
      'What happens if you try to add a NOT NULL constraint to a column that already has NULLs in it?',
      'Why prefer a CHECK constraint over enforcing the rule only in application code?',
    ],
    setupSql: `
      CREATE TABLE sandbox.accounts (
        account_id INT,
        email      TEXT,
        balance    NUMERIC(10,2),
        status     TEXT
      );
    `,
    checkSql: `
      SELECT 'constraint' AS kind, conname AS name, contype::text AS detail
      FROM pg_constraint WHERE conrelid = 'sandbox.accounts'::regclass
      UNION ALL
      SELECT 'nullable', column_name, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'sandbox' AND table_name = 'accounts'
      ORDER BY 1, 2;
    `,
  },

  3: {
    title: 'CREATE TABLE From Scratch',
    file: '03-create-table',
    category: 'DDL',
    difficulty: 'Easy',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'What is the primary key, and should it auto-increment?',
      'Which columns must always have a value?',
      'What data type fits a price? Why not FLOAT?',
    ],
    hints: [
      'SERIAL gives you an auto-incrementing INTEGER primary key.',
      'Use NUMERIC(10,2) for money — floating point types introduce rounding errors.',
      'CHECK (price >= 0) stops negative prices at the database level, not just in app code.',
    ],
    followUps: [
      'What is the difference between SERIAL and GENERATED ALWAYS AS IDENTITY?',
      'When would you use a composite primary key instead of a surrogate one?',
    ],
    setupSql: null,
    checkSql: `
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'sandbox' AND table_name = 'reviews'
      ORDER BY ordinal_position;
    `,
  },
  4: {
    title: 'ALTER an Existing Table',
    file: '04-alter-table',
    category: 'DDL',
    difficulty: 'Easy',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'How do you add a column with a default value applied to existing rows?',
      'How do you rename a column without losing its data?',
      'How do you add a foreign key to a table that already has data in it?',
    ],
    hints: [
      'ALTER TABLE t ADD COLUMN col TYPE DEFAULT value;',
      'ALTER TABLE t RENAME COLUMN old_name TO new_name;',
      'ALTER TABLE t ADD CONSTRAINT fk_name FOREIGN KEY (col) REFERENCES other(id); — existing rows must already satisfy it or this fails.',
    ],
    followUps: [
      'Why can adding a column with a non-null DEFAULT be an expensive operation on a huge, older Postgres version — and why is it cheap on modern Postgres (11+)?',
    ],
    setupSql: `
      CREATE TABLE sandbox.plans (plan_id TEXT PRIMARY KEY, monthly_price NUMERIC(10,2));
      INSERT INTO sandbox.plans VALUES ('pro', 29.99), ('free', 0);

      CREATE TABLE sandbox.subscriptions (
        sub_id INT PRIMARY KEY,
        user_email TEXT,
        plan TEXT
      );
      INSERT INTO sandbox.subscriptions VALUES (1, 'a@x.com', 'pro'), (2, 'b@x.com', 'free');
    `,
    checkSql: `
      SELECT 'column' AS kind, column_name AS name, data_type || ':' || coalesce(column_default, 'none') AS detail
      FROM information_schema.columns
      WHERE table_schema = 'sandbox' AND table_name = 'subscriptions'
      UNION ALL
      SELECT 'fk', conname, confrelid::regclass::text
      FROM pg_constraint
      WHERE conrelid = 'sandbox.subscriptions'::regclass AND contype = 'f'
      ORDER BY 1, 2;
    `,
  },
  5: {
    title: 'Views and Expression Indexes',
    file: '05-views-and-indexes',
    category: 'DDL',
    difficulty: 'Medium',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'A VIEW does not store data — what does it store instead?',
      'Why would a query on lower(email) not use a plain index on email?',
      'What kind of index lets Postgres use an index for a query wrapped in a function?',
    ],
    hints: [
      'CREATE VIEW name AS SELECT ...; — it is a saved, reusable query.',
      'A regular B-tree index on email is built on the raw values; lower(email) at query time no longer matches those raw values.',
      'CREATE INDEX ON t (lower(col)); — an expression index, built on the transformed value.',
    ],
    followUps: [
      'What is a MATERIALIZED VIEW, and how is it different from a plain VIEW?',
    ],
    setupSql: `
      CREATE TABLE sandbox.people (id INT PRIMARY KEY, email TEXT);
      INSERT INTO sandbox.people VALUES (1, 'Alice@Example.com'), (2, 'bob@example.com');
    `,
    checkSql: `
      SELECT
        (SELECT count(*) FROM pg_views WHERE schemaname = 'sandbox' AND viewname = 'people_lower_email') AS has_view,
        (SELECT count(*) FROM pg_indexes WHERE schemaname = 'sandbox' AND indexdef ILIKE '%lower(email)%') AS has_expr_index;
    `,
  },

  6: {
    title: 'INSERT — Single, Multi-Row, and INSERT...SELECT',
    file: '06-insert',
    category: 'DML',
    difficulty: 'Easy',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'How do you insert several rows in one statement instead of one INSERT per row?',
      'How do you insert rows into one table using the result of a query on another?',
    ],
    hints: [
      'INSERT INTO t (a, b) VALUES (1,2), (3,4), (5,6);',
      'INSERT INTO t (a, b) SELECT x, y FROM other_table WHERE ...;',
    ],
    followUps: [
      'Why is a single multi-row INSERT much faster than N single-row INSERTs over a network connection?',
    ],
    setupSql: `
      CREATE TABLE sandbox.vip_customers (customer_id INT, full_name TEXT);
    `,
    checkSql: `SELECT customer_id, full_name FROM sandbox.vip_customers ORDER BY customer_id;`,
  },
  7: {
    title: 'UPDATE With a JOIN',
    file: '07-update-join',
    category: 'DML',
    difficulty: 'Medium',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'Postgres has no UPDATE ... JOIN syntax like MySQL — what clause does it use instead?',
      'How do you make sure the UPDATE only touches matching rows, not the whole table?',
    ],
    hints: [
      'UPDATE t SET col = other.val FROM other_table other WHERE t.id = other.id;',
      'The FROM clause brings a second table into scope for both the SET and WHERE clauses.',
    ],
    followUps: [
      'How would you write the same logic as an UPDATE with a correlated subquery instead of FROM? Which is usually faster?',
    ],
    setupSql: `
      CREATE TABLE sandbox.products (product_id INT PRIMARY KEY, name TEXT, price NUMERIC(10,2));
      CREATE TABLE sandbox.price_hikes (product_id INT, new_price NUMERIC(10,2));
      INSERT INTO sandbox.products VALUES (1, 'Widget', 9.99), (2, 'Gadget', 19.99), (3, 'Gizmo', 29.99);
      INSERT INTO sandbox.price_hikes VALUES (1, 12.99), (3, 34.99);
    `,
    checkSql: `SELECT product_id, name, price FROM sandbox.products ORDER BY product_id;`,
  },
  8: {
    title: 'DELETE and UPSERT (ON CONFLICT)',
    file: '08-delete-upsert',
    category: 'DML',
    difficulty: 'Medium',
    mode: 'mutate',
    orderMatters: false,
    questions: [
      'How do you delete rows in one table based on a condition in another table?',
      'What does "upsert" mean, and which Postgres clause implements it?',
      'If a row with that key already exists, should you overwrite it or leave it alone?',
    ],
    hints: [
      'DELETE FROM t USING other WHERE t.id = other.id AND other.flag = true;',
      'INSERT INTO t (...) VALUES (...) ON CONFLICT (key_col) DO UPDATE SET col = EXCLUDED.col;',
      'EXCLUDED refers to the row that was proposed for insertion but conflicted.',
    ],
    followUps: [
      'What is the difference between ON CONFLICT DO UPDATE and ON CONFLICT DO NOTHING?',
    ],
    setupSql: `
      CREATE TABLE sandbox.carts (customer_id INT, product_id INT);
      INSERT INTO sandbox.carts VALUES (1, 10), (2, 20), (3, 30);

      CREATE TABLE sandbox.expired_sessions (customer_id INT);
      INSERT INTO sandbox.expired_sessions VALUES (1), (3);

      CREATE TABLE sandbox.inventory (product_id INT PRIMARY KEY, stock_qty INT);
      INSERT INTO sandbox.inventory VALUES (10, 5);
    `,
    checkSql: `
      SELECT 'carts' AS tbl, customer_id::text AS a, product_id::text AS b FROM sandbox.carts
      UNION ALL
      SELECT 'inventory', product_id::text, stock_qty::text FROM sandbox.inventory
      ORDER BY 1, 2;
    `,
  },

  9: {
    title: 'INNER JOIN — Orders With Customer Names',
    file: '09-inner-join',
    category: 'Joins',
    difficulty: 'Easy',
    mode: 'select',
    orderMatters: false,
    questions: [
      'Which column links orders to customers?',
      'INNER JOIN only keeps rows that match on both sides — what does that exclude here?',
    ],
    hints: [
      'orders.customer_id references customers.customer_id.',
      'SELECT ... FROM orders o JOIN customers c ON o.customer_id = c.customer_id',
      'An INNER JOIN silently drops any order whose customer_id has no matching customer — which cannot happen here thanks to the FK, but matters in general.',
    ],
    followUps: [
      'Would the result differ if you used LEFT JOIN here instead of INNER JOIN? Why or why not, given the schema?',
    ],
  },
  10: {
    title: 'LEFT JOIN — Customers With Zero Orders',
    file: '10-left-join-anti',
    category: 'Joins',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      'If you LEFT JOIN customers to orders, what does a customer with no orders look like in the joined row?',
      'How do you filter for "no match on the right side" — the anti-join pattern?',
    ],
    hints: [
      'LEFT JOIN keeps every row from the left table, filling right-side columns with NULL when there is no match.',
      'A customer with no orders will have orders.order_id IS NULL after the LEFT JOIN.',
      'WHERE o.order_id IS NULL after a LEFT JOIN is the classic "find unmatched rows" (anti-join) pattern.',
    ],
    followUps: [
      'How would you write this same anti-join using NOT EXISTS instead? Which do you find more readable?',
    ],
  },
  11: {
    title: 'Self JOIN — Employees and Their Managers',
    file: '11-self-join',
    category: 'Joins',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      'The employees table references itself via manager_id — what does that mean for aliasing?',
      'How do you show the CEO (no manager) without losing that row?',
    ],
    hints: [
      'Join the table to itself with two different aliases: employees e JOIN employees m ON e.manager_id = m.employee_id.',
      'Use LEFT JOIN, not JOIN, so the employee with manager_id IS NULL (the CEO) is not dropped.',
    ],
    followUps: [
      'How would you find every employee two levels below the CEO using a recursive CTE?',
    ],
  },
  12: {
    title: 'Multi-Table JOIN — Full Order Detail',
    file: '12-multi-join',
    category: 'Joins',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      'How many tables do you need to go from an order to a product name and category?',
      'In what order should you join them, and does join order change the result?',
    ],
    hints: [
      'orders -> order_items -> products -> categories, joining on each foreign key in turn.',
      'Join order does not change the RESULT (only, sometimes, performance) — the optimizer is free to reorder inner joins.',
    ],
    followUps: [
      'At what point would you reach for a view to avoid repeating this 4-table join everywhere?',
    ],
  },

  13: {
    title: 'GROUP BY + HAVING — Big-Spending Countries',
    file: '13-group-by-having',
    category: 'Aggregate Queries',
    difficulty: 'Easy',
    mode: 'select',
    orderMatters: false,
    questions: [
      'What is the difference between filtering with WHERE and filtering with HAVING?',
      'Why can you not write WHERE count(*) > 5 directly?',
    ],
    hints: [
      'WHERE filters rows BEFORE grouping; HAVING filters groups AFTER aggregation.',
      'Aggregate functions like count(*) only exist after GROUP BY has formed groups — that is why they belong in HAVING, not WHERE.',
    ],
    followUps: [
      'Could you achieve the same result with a subquery/CTE and a WHERE clause instead of HAVING? Which is more idiomatic?',
    ],
  },
  14: {
    title: 'Conditional Aggregation (FILTER)',
    file: '14-filter-clause',
    category: 'Aggregate Queries',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      'How do you compute two different counts (e.g. paid vs cancelled) in the SAME row, from the same table?',
      'What is the FILTER clause, and how does it compare to CASE WHEN inside an aggregate?',
    ],
    hints: [
      'count(*) FILTER (WHERE status = \'paid\') counts only rows matching that condition, in one pass.',
      "The older equivalent: sum(case when status = 'paid' then 1 else 0 end).",
    ],
    followUps: [
      'How would you compute the PERCENTAGE of paid orders per customer using this pattern?',
    ],
  },
  15: {
    title: 'CTEs — Revenue Per Category, Ranked',
    file: '15-cte-aggregate',
    category: 'Aggregate Queries',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      'Why break a query into a WITH (CTE) instead of nesting subqueries?',
      'Can one CTE reference another CTE defined earlier in the same WITH clause?',
    ],
    hints: [
      'WITH revenue_per_category AS (SELECT ... GROUP BY ...) SELECT * FROM revenue_per_category ORDER BY total_revenue DESC;',
      'Yes — CTEs in the same WITH clause can build on each other top-to-bottom.',
    ],
    followUps: [
      'What is the difference between a regular CTE and a RECURSIVE one?',
    ],
  },

  16: {
    title: 'ROW_NUMBER vs RANK vs DENSE_RANK',
    file: '16-row-number-rank',
    category: 'Window Functions',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      'If two employees tie on salary, do ROW_NUMBER, RANK, and DENSE_RANK agree on their position?',
      'After a tie, does RANK or DENSE_RANK skip the next number?',
    ],
    hints: [
      'ROW_NUMBER() OVER (ORDER BY salary DESC) always gives distinct, sequential numbers, even for ties (tiebreak is arbitrary unless you add more ORDER BY columns).',
      'RANK() gives ties the same rank, then SKIPS the following rank(s) (1,1,3). DENSE_RANK() gives ties the same rank with NO gap (1,1,2).',
    ],
    followUps: [
      'Which of the three would you use to implement "top 3 salaries, including ties" correctly?',
    ],
  },
  17: {
    title: 'Running Total With SUM() OVER',
    file: '17-running-total',
    category: 'Window Functions',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: true,
    questions: [
      'What does PARTITION BY do inside an OVER() clause versus ORDER BY?',
      'What frame does SUM() OVER (ORDER BY d) use by default?',
    ],
    hints: [
      'PARTITION BY resets the window per group (like GROUP BY, but keeps every row instead of collapsing them).',
      'By default, ORDER BY inside OVER() implies a frame of "everything from the start up to the current row" — which is exactly what a running total needs.',
      'SUM(amount) OVER (ORDER BY order_date) accumulates a running total in date order.',
    ],
    followUps: [
      'How would you compute a running total PER CUSTOMER instead of one global running total?',
    ],
  },
  18: {
    title: 'LAG / LEAD — Comparing to the Previous Row',
    file: '18-lag-lead',
    category: 'Window Functions',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: true,
    questions: [
      'How would you compute "this order vs the previous order" without a self-join?',
      'What does LAG return for the very first row in a partition?',
    ],
    hints: [
      'LAG(col) OVER (ORDER BY ...) looks one row back; LEAD(col) OVER (ORDER BY ...) looks one row forward.',
      'For the first row, there is no previous row, so LAG returns NULL (unless you pass a default as its second argument).',
    ],
    followUps: [
      'How would you flag rows where the value INCREASED compared to the previous row, using LAG?',
    ],
  },
  19: {
    title: 'Top-N Per Group With PARTITION BY',
    file: '19-top-n-per-group',
    category: 'Window Functions',
    difficulty: 'Hard',
    mode: 'select',
    orderMatters: false,
    questions: [
      'Why can you not just GROUP BY category and LIMIT 3 to get "top 3 products per category"?',
      'How do you filter on the result of a window function, given window functions cannot appear in WHERE?',
    ],
    hints: [
      'GROUP BY collapses to one row per category — it cannot give you the top 3 individual PRODUCTS within each category.',
      'ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY revenue DESC) numbers products 1..N within each category.',
      'Window functions cannot be used in WHERE directly — wrap the query in a subquery or CTE, then filter the row number in the OUTER query.',
    ],
    followUps: [
      'How would this change if you wanted "top 3 by revenue, ties included" instead of exactly 3 rows per category?',
    ],
  },

  20: {
    title: 'Reading EXPLAIN ANALYZE — Fix a Seq Scan',
    file: '20-explain-index',
    category: 'Performance',
    difficulty: 'Medium',
    mode: 'index',
    indexName: 'pgm_idx_orders_customer_id',
    onTable: 'orders',
    checkQuery: `SELECT * FROM orders WHERE customer_id = 42;`,
    questions: [
      'orders has 50,000 rows and no index on customer_id — what scan type will Postgres be forced to use for a WHERE customer_id = 42 query?',
      'What column needs an index to make this a fast point lookup instead of scanning every row?',
    ],
    hints: [
      "Run: EXPLAIN ANALYZE SELECT * FROM orders WHERE customer_id = 42; and look at the top node — 'Seq Scan on orders' means it read every row.",
      'CREATE INDEX index_name ON table_name (column_name);',
      'After creating the index, PostgreSQL will use an Index Scan (or Bitmap Index Scan) for this same query — rerun EXPLAIN ANALYZE to confirm the plan changed.',
    ],
    followUps: [
      'Why might Postgres still choose a Seq Scan even WITH an index present, if the WHERE condition matches a large fraction of the table?',
    ],
  },
  21: {
    title: 'Sargable Rewrite — Function-on-Column Anti-Pattern',
    file: '21-sargable-rewrite',
    category: 'Performance',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      "Why can't a plain B-tree index on signup_date help a query filtering on EXTRACT(YEAR FROM signup_date) = 2019?",
      'How do you rewrite that condition as a plain range comparison on the raw column instead?',
    ],
    hints: [
      'Wrapping an indexed column in a function (EXTRACT, lower(), etc.) forces Postgres to evaluate that function for every row — no index can be used unless it is an expression index on that exact function.',
      "A range rewrite is sargable (Search ARGument ABLE): signup_date >= '2019-01-01' AND signup_date < '2020-01-01'.",
    ],
    followUps: [
      'Name one other common non-sargable pattern besides wrapping a column in a function (hint: think about leading wildcards in LIKE).',
    ],
  },
  22: {
    title: 'Avoiding N+1 — One Query Instead of Many',
    file: '22-avoid-n-plus-1',
    category: 'Performance',
    difficulty: 'Medium',
    mode: 'select',
    orderMatters: false,
    questions: [
      'The N+1 problem: fetch all customers, then loop in app code running one query per customer for their order count. What is wrong with that as data grows?',
      'How do you get "each customer, with their order count" in a SINGLE query?',
    ],
    hints: [
      'N+1 means 1 query for the customer list, plus N more queries (one per customer) — that is N+1 round trips to the database instead of 1.',
      'LEFT JOIN customers to orders, GROUP BY customer, and count(o.order_id) — one query replaces the whole loop.',
      'Use LEFT JOIN (not JOIN) so customers with zero orders still appear, with count 0.',
    ],
    followUps: [
      'In an ORM, what is the usual fix for this pattern called (hint: "eager loading" / "includes" / "select_related")?',
    ],
  },
};

// ══════════════════════════════════════════════════════════
//  CLI COMMANDS
// ══════════════════════════════════════════════════════════

function bannerFor(id, p) {
  console.log(hr('═'));
  console.log(bold(`  Problem ${id}: ${p.title}`));
  console.log(dim(`  [${p.category}]  [${p.difficulty}]  mode: ${p.mode}`));
  console.log(hr('═'));
}

function cmdList() {
  console.log(bold('\nPostgreSQL Mastery — Problem List\n'));
  for (const cat of CATEGORIES) {
    console.log(mag(bold(cat)));
    Object.entries(PROBLEMS)
      .filter(([, p]) => p.category === cat)
      .forEach(([id, p]) => {
        console.log(`  ${cyan(id.padStart(2))}. ${p.title} ${dim('(' + p.difficulty + ')')}`);
      });
    console.log('');
  }
  console.log(dim('node coach.js problem <N>   → guiding questions'));
  console.log(dim('node coach.js hint <N> <k>  → hint k (1..3) for problem N'));
  console.log(dim('node coach.js test <N>      → grade your workspace/ solution'));
  console.log(dim('node coach.js test-all      → grade every problem\n'));
}

function cmdProblem(id) {
  const p = PROBLEMS[id];
  if (!p) return console.error(red(`No problem ${id}`));
  bannerFor(id, p);
  console.log(`\n${bold('Full problem statement, sample data, and expected result:')}`);
  console.log(`  workspace/${p.file}.js`.replace('.js', '.sql'));
  console.log(`\n${bold('Think before coding:')}`);
  p.questions.forEach((q) => console.log(`  • ${q}`));
  console.log(`\n${dim(`${p.hints.length} hint(s) available — node coach.js hint ${id} 1`)}`);
  if (p.followUps?.length) {
    console.log(`\n${bold('Once it passes, think about:')}`);
    p.followUps.forEach((f) => console.log(`  • ${f}`));
  }
  console.log('');
}

function cmdHint(id, n) {
  const p = PROBLEMS[id];
  if (!p) return console.error(red(`No problem ${id}`));
  const idx = Number(n) - 1;
  if (!p.hints[idx]) return console.error(red(`Problem ${id} only has ${p.hints.length} hint(s).`));
  console.log(`\n${yel(bold(`Hint ${n}/${p.hints.length}`))} — ${p.title}`);
  console.log(`  ${p.hints[idx]}\n`);
}

function workspacePath(p) {
  return path.join(__dirname, 'workspace', `${p.file}.sql`);
}
function solutionPath(p) {
  return path.join(__dirname, 'solutions', `${p.file}.sql`);
}

function gradeSelect(p) {
  const userQuery = readBlock(workspacePath(p));
  const refQuery = readBlock(solutionPath(p));

  const userResult = runSql(userQuery, { schema: 'public' });
  if (userResult.error) return { pass: false, message: 'Your query errored:\n' + userResult.error };

  const refResult = runSql(refQuery, { schema: 'public' });
  if (refResult.error) throw new Error('Reference solution errored — this is a bug in coach.js: ' + refResult.error);

  const pass = rowsEqual(userResult.rows, refResult.rows, p.orderMatters);
  return { pass, userRows: userResult.rows, refRows: refResult.rows };
}

function gradeMutate(p) {
  // Run the user's code
  resetSandbox();
  if (p.setupSql) {
    const s = runSql(p.setupSql, { schema: 'sandbox, public' });
    if (s.error) throw new Error('setupSql errored — bug in coach.js: ' + s.error);
  }
  const userCode = readBlock(workspacePath(p));
  const userRun = runSql(userCode, { schema: 'sandbox, public' });
  if (userRun.error) return { pass: false, message: 'Your SQL errored:\n' + userRun.error };
  const userCheck = runSql(p.checkSql, { schema: 'sandbox, public' });
  if (userCheck.error) {
    return {
      pass: false,
      message:
        "Checking your result errored — likely because an expected table/column doesn't exist yet:\n" +
        userCheck.error,
    };
  }

  // Run the reference solution the same way
  resetSandbox();
  if (p.setupSql) runSql(p.setupSql, { schema: 'sandbox, public' });
  const refCode = readBlock(solutionPath(p));
  const refRun = runSql(refCode, { schema: 'sandbox, public' });
  if (refRun.error) throw new Error('Reference solution errored — bug in coach.js: ' + refRun.error);
  const refCheck = runSql(p.checkSql, { schema: 'sandbox, public' });
  if (refCheck.error) throw new Error('checkSql errored against reference — bug in coach.js: ' + refCheck.error);

  const pass = rowsEqual(userCheck.rows, refCheck.rows, p.orderMatters !== false);
  return { pass, userRows: userCheck.rows, refRows: refCheck.rows };
}

function planNodeTypes(node, acc = []) {
  if (!node) return acc;
  acc.push(node['Node Type']);
  (node['Plans'] || []).forEach((child) => planNodeTypes(child, acc));
  return acc;
}

function gradeIndex(p) {
  runSql(`DROP INDEX IF EXISTS ${p.indexName};`, { schema: 'public' });

  const userCode = readBlock(workspacePath(p));
  const userRun = runSql(userCode, { schema: 'public' });
  if (userRun.error) return { pass: false, message: 'Your SQL errored:\n' + userRun.error };

  const planResult = runSql(`EXPLAIN (FORMAT JSON) ${p.checkQuery}`, { schema: 'public' });
  if (planResult.error) throw new Error('EXPLAIN errored — bug in coach.js: ' + planResult.error);

  const planJson = JSON.parse(planResult.rows.map((r) => r[0]).join(''));
  const types = planNodeTypes(planJson[0]['Plan']);
  const usesSeqScanOnTable = (() => {
    // Re-check with a targeted EXPLAIN that also prints relation names.
    const detailed = runSql(`EXPLAIN ${p.checkQuery}`, { schema: 'public' });
    return detailed.rows.some((r) => r[0].includes(`Seq Scan on ${p.onTable}`));
  })();

  const indexExists = runSql(
    `SELECT 1 FROM pg_indexes WHERE indexname = '${p.indexName}';`,
    { schema: 'public' }
  );
  const indexWasCreated = indexExists.rows.length > 0;

  const pass = indexWasCreated && !usesSeqScanOnTable;
  return {
    pass,
    message: pass
      ? null
      : !indexWasCreated
      ? `Expected an index named '${p.indexName}' to exist — it does not.`
      : `Plan still uses a Seq Scan on '${p.onTable}':\n  ${types.join(' -> ')}`,
  };
}

function cmdTest(id) {
  const p = PROBLEMS[id];
  if (!p) return console.error(red(`No problem ${id}`));
  ensureDbUp();

  bannerFor(id, p);
  let result;
  try {
    result =
      p.mode === 'select' ? gradeSelect(p) : p.mode === 'mutate' ? gradeMutate(p) : gradeIndex(p);
  } catch (e) {
    console.log(red(bold('\n  ERROR\n')));
    console.log('  ' + e.message);
    return false;
  }

  if (result.pass) {
    console.log(green(bold('\n  ✅ PASS\n')));
  } else {
    console.log(red(bold('\n  ❌ FAIL\n')));
    if (result.message) console.log('  ' + result.message.replace(/\n/g, '\n  '));
    if (result.userRows) {
      console.log(`\n  ${bold('Your result:')}`);
      printRows(result.userRows);
      console.log(`\n  ${bold('Expected (from reference solution):')}`);
      printRows(result.refRows);
    }
    console.log('');
  }
  return result.pass;
}

function cmdTestAll() {
  ensureDbUp();
  let score = 0;
  const ids = Object.keys(PROBLEMS);
  const failed = [];
  ids.forEach((id) => {
    const ok = cmdTest(id);
    if (ok) score++;
    else failed.push(id);
  });
  console.log(hr('═'));
  console.log(bold(`\n${score}/${ids.length} passed${score === ids.length ? ' 🎉' : ''}`));
  if (failed.length) console.log(red(`Failing: ${failed.join(', ')}`));
  console.log('');
  if (score < ids.length) process.exit(1);
}

// ── entry point ───────────────────────────────────────────
const [, , cmd, a, b] = process.argv;

switch (cmd) {
  case 'list':
    cmdList();
    break;
  case 'problem':
    cmdProblem(a);
    break;
  case 'hint':
    cmdHint(a, b);
    break;
  case 'test':
    ensureDbUp();
    cmdTest(a);
    break;
  case 'test-all':
    cmdTestAll();
    break;
  default:
    console.log('Usage: node coach.js <list|problem|hint|test|test-all> [args]');
}
