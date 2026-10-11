# Day 3 — Rendering: Lists, Keys & Conditionals

**Goal:** Understand how React decides what to render, why keys matter deeply, and every conditional rendering pattern you'll use in real code.

---

## How React renders

React rendering = calling your component function → getting JSX → diffing against previous output (reconciliation) → applying minimal DOM changes.

**Re-render triggers:**
- `setState` called on a component
- A parent re-renders (by default, children re-render too — see Day 7 for optimization)
- Context value changes (Day 6)

Re-rendering is cheap — it's just a function call. DOM mutations are expensive. React's reconciler minimizes DOM mutations.

---

## Rendering Lists

The React way to render a list is JavaScript's `.map()` — because JSX is JS, you embed the result directly:

```jsx
const items = ['Apple', 'Banana', 'Cherry']

return (
  <ul>
    {items.map(item => (
      <li key={item}>{item}</li>
    ))}
  </ul>
)
```

**Rules:**
- `.map()` must return JSX for every element
- No `forEach` (returns `undefined`, renders nothing)
- Wrap multi-line returns in `()`
- Never use index as key if the list can reorder, add, or remove items

---

## Why Keys Matter (deep)

Keys are how React's reconciler **identifies** which element is which between renders. Without keys (or with wrong keys), React can:
- Re-render the wrong component
- Lose input focus/state mid-list
- Produce subtle animation bugs

**What React does with keys:**

```
Before render:     [A(key=1), B(key=2), C(key=3)]
After deleting B:  [A(key=1), C(key=3)]
```
With stable keys: React knows B was deleted, keeps A and C intact.

```
Before render:     [A(idx=0), B(idx=1), C(idx=2)]
After deleting B:  [A(idx=0), C(idx=1)]
```
With index keys: React sees key=1 changed content, key=2 disappeared. It re-renders the wrong thing.

**Rule of thumb:**
- Use a stable unique ID (DB id, slug, UUID)
- Only use index if the list is static and never reorders/changes

---

## Conditional Rendering Patterns

React has no template directives (`v-if`, `*ngIf`). It's plain JS:

### 1. Ternary — for two branches
```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

### 2. Short-circuit `&&` — for "show or nothing"
```jsx
{hasError && <ErrorBanner message={error} />}
```
**Gotcha:** `{count && <p>Items: {count}</p>}` — if `count` is `0`, React renders `0` (falsy but renders). Use: `{count > 0 && ...}` or `{!!count && ...}`.

### 3. Early return — clearest for complex conditions
```jsx
function Content({ isLoading, error, data }) {
  if (isLoading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  return <DataView data={data} />
}
```

### 4. Variable assignment
```jsx
let content
if (status === 'loading') content = <Spinner />
else if (status === 'error') content = <ErrorMessage />
else content = <DataView data={data} />

return <div>{content}</div>
```

---

## The loading/error/data pattern

Almost every real component follows this shape:

```jsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

if (loading) return <Spinner />
if (error) return <p>Error: {error.message}</p>
return <DataView data={data} />
```

This is the pattern employers want to see you write naturally.

---

## Exercise solution

<details>
<summary>Click to reveal solution</summary>

```jsx
const PRODUCTS = [
  { id: 1, name: 'MacBook Pro', price: 2499, category: 'laptops', inStock: true },
  { id: 2, name: 'iPad Air', price: 749, category: 'tablets', inStock: true },
  { id: 3, name: 'iPhone 15', price: 999, category: 'phones', inStock: false },
  // ...
]

function ProductList() {
  const [category, setCategory] = useState('all')
  const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))]

  const filtered = category === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === category)

  return (
    <div>
      <div>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
                  style={{ fontWeight: category === cat ? 700 : 400 }}>
            {cat}
          </button>
        ))}
      </div>
      {filtered.length === 0
        ? <p>No products in this category</p>
        : filtered.map(product => (
            <div key={product.id}>
              <span>{product.name}</span>
              <span>${product.price}</span>
              {!product.inStock && <span>Out of stock</span>}
            </div>
          ))
      }
    </div>
  )
}
```
</details>
