// ============================================
// LEARNING: Array.map / Array.filter / Array.reduce
// ============================================

// Sample JSON-like data: a list of orders from a shop
const orders = [
  { id: 1, customer: "Alice", category: "electronics", price: 250, qty: 1 },
  { id: 2, customer: "Bob", category: "grocery", price: 40, qty: 3 },
  { id: 3, customer: "Alice", category: "grocery", price: 20, qty: 5 },
  { id: 4, customer: "Charlie", category: "electronics", price: 800, qty: 1 },
  { id: 5, customer: "Bob", category: "clothing", price: 60, qty: 2 },
  { id: 6, customer: "Diana", category: "electronics", price: 150, qty: 2 },
  { id: 7, customer: "Charlie", category: "clothing", price: 35, qty: 1 },
];

// --------------------------------------------
// 1) MAP — transform every item into something new
//    Rule: same number of items in -> same number out.
//    Use it when you want to RESHAPE data, not remove or combine it.
// --------------------------------------------

// Get just the total cost of each order (price * qty)
const orderTotals = orders.map((order) => order.price * order.qty);
console.log("1) order totals:", orderTotals);
// -> [250, 120, 100, 800, 120, 300, 35]

// Reshape each order into a smaller summary object
const orderSummaries = orders.map((order) => ({
  id: order.id,
  total: order.price * order.qty,
}));
console.log("1) order summaries:", orderSummaries);

// --------------------------------------------
// 2) FILTER — keep only items that pass a test
//    Rule: same shape, fewer (or equal) items out.
//    Use it when you want a SUBSET of the original data.
// --------------------------------------------

// Only electronics orders
const electronicsOrders = orders.filter((order) => order.category === "electronics");
console.log("2) electronics orders:", electronicsOrders);

// Only "big" orders (total value over 100)
const bigOrders = orders.filter((order) => order.price * order.qty > 100);
console.log("2) big orders:", bigOrders);

// --------------------------------------------
// 3) REDUCE — combine all items into a single value
//    Rule: you provide an "accumulator" (running result) and a starting value.
//    Use it when you want ONE answer out of many items: a sum, a count, a grouping, etc.
// --------------------------------------------

// Total revenue across ALL orders
const totalRevenue = orders.reduce((sum, order) => sum + order.price * order.qty, 0);
console.log("3) total revenue:", totalRevenue);
// how it works step by step:
//   sum starts at 0
//   0   + 250 (order 1) = 250
//   250 + 120 (order 2) = 370
//   370 + 100 (order 3) = 470
//   ...and so on until every order has been added

// Count orders per category -> { electronics: 3, grocery: 2, clothing: 2 }
const countByCategory = orders.reduce((acc, order) => {
  acc[order.category] = (acc[order.category] || 0) + 1;
  return acc;
}, {});
console.log("3) count by category:", countByCategory);

// Group full orders by customer -> { Alice: [...], Bob: [...], ... }
const ordersByCustomer = orders.reduce((acc, order) => {
  if (!acc[order.customer]) acc[order.customer] = [];
  acc[order.customer].push(order);
  return acc;
}, {});
console.log("3) orders by customer:", ordersByCustomer);

// --------------------------------------------
// 4) CHAINING — combine them to answer real questions
//    filter -> map -> reduce is one of the most common patterns.
// --------------------------------------------

// "What is the total revenue from electronics orders only?"
const electronicsRevenue = orders
  .filter((order) => order.category === "electronics") // step 1: keep only electronics
  .map((order) => order.price * order.qty)             // step 2: turn each into its total
  .reduce((sum, total) => sum + total, 0);              // step 3: add them all up
console.log("4) electronics revenue:", electronicsRevenue);

// "Which customers spent more than 150 total, and how much?"
const bigSpenders = Object.entries(
  orders.reduce((acc, order) => {
    acc[order.customer] = (acc[order.customer] || 0) + order.price * order.qty;
    return acc;
  }, {})
)
  .filter(([, total]) => total > 150)
  .map(([customer, total]) => ({ customer, total }));
console.log("4) big spenders (>150):", bigSpenders);

// --------------------------------------------
// TRY IT YOURSELF (uncomment and experiment):
// --------------------------------------------
// 1. Use map to get an array of just customer names.
// 2. Use filter to get orders with qty > 1.
// 3. Use reduce to find the single most expensive order (Math.max style).
// 4. Chain filter + map + reduce to get total revenue from Bob's orders only.
