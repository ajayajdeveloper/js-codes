# Day 7 — Performance, Patterns & Mental Models

**Goal:** Know when React re-renders, how to prevent unnecessary ones, recognize common patterns, and bridge your Node/Express mental model to React.

---

## Why React re-renders (recap + depth)

A component re-renders when:
1. Its own state changes (`setState`)
2. Its parent re-renders (even if props didn't change — **default behavior**)
3. A context it subscribes to changes

The critical insight: **parent re-render → all children re-render by default**. This is fine for most apps. Performance work is only needed when you can measure that it matters.

---

## React.memo

`React.memo` is a higher-order component that wraps a component and skips re-rendering if props haven't changed (shallow comparison with `Object.is`).

```jsx
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
})
```

Now `ExpensiveList` only re-renders when `items` actually changes.

**Gotcha:** object/function props create new references every render:
```jsx
// Parent renders → new `filter` object reference → memo is defeated
<ExpensiveList items={items} filter={{ category: 'all' }} />
```
Fix: memoize the prop with `useMemo`/`useCallback`.

---

## useMemo

Memoizes the **result** of an expensive computation. Only recomputes when deps change.

```jsx
const filtered = useMemo(
  () => items.filter(i => i.category === category),
  [items, category]
)
```

**When to use:**
- Computationally expensive derivations (sorting/filtering large arrays, matrix ops)
- Stabilizing object identity to prevent memo or useEffect from firing unnecessarily

**When NOT to use:**
- Cheap operations — the memo bookkeeping can cost more than the computation
- Every `useMemo` is tech debt until proven necessary

---

## useCallback

Memoizes a **function reference**. Returns the same function object between renders unless deps change.

```jsx
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id))
}, []) // no deps because we use functional state update
```

**When to use:**
- Passing callbacks to `React.memo` components (stable reference = no re-render)
- Callbacks in `useEffect` deps arrays (stable reference = effect doesn't re-run)

**The rule of thumb:** `useCallback` is only useful in combination with `React.memo` or `useEffect`. On its own it's pointless.

---

## When to optimize

Don't memoize by default. Memoization has a cost (memory + comparison overhead) and makes code harder to read. Profile first.

Signs you actually need it:
- Profiler shows a component rendering 100ms+
- A list with 500+ items re-renders on every keystroke
- An effect runs too often and causes cascading fetches

Signs you don't need it:
- "It might be slow" — measure first
- A component that renders a few `<div>`s

---

## Lifting State Up

When siblings need to share state, move the state to their common parent. The parent owns state, passes down values and callbacks.

```
Before:                After:
 Parent                 Parent (owns state)
 ├── A (has count)      ├── A (receives count, onIncrement)
 └── B (needs count)    └── B (receives count)
```

```jsx
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <>
      <A count={count} onIncrement={() => setCount(c => c + 1)} />
      <B count={count} />
    </>
  )
}
```

This is the single most important React data flow pattern. Master it.

---

## Container / Presentational Pattern

Split components into:
- **Container** (smart): fetches data, manages state, handles logic — no styling
- **Presentational** (dumb): receives props, renders UI — no state (mostly)

```jsx
// Container
function UserListContainer() {
  const { data: users, loading, error } = useFetch('/api/users')
  if (loading) return <Spinner />
  if (error) return <ErrorBanner error={error} />
  return <UserList users={users} />
}

// Presentational
function UserList({ users }) {
  return <ul>{users.map(u => <UserItem key={u.id} user={u} />)}</ul>
}
```

Presentational components are easy to test, easy to reuse, and easy to reason about.

---

## Node/Express → React Mental Model Bridge

| Express concept | React equivalent |
|---|---|
| `req.body` / `req.params` | Props |
| Module-level variables | Context |
| Middleware | Custom hooks / HOCs |
| Route handler | Component |
| `res.send(html)` | `return <JSX />` |
| Event loop (async, non-blocking) | Reconciler (async rendering, concurrent mode) |
| `next()` | Re-render (trigger next render pass) |
| `app.use(logger)` | Wrapping with a Provider |
| `Error` middleware | Error Boundary |
| Connection pooling | `useMemo` / stable references |

**The event loop analogy:**
- Node's event loop processes one callback at a time, never blocking
- React's concurrent mode renders in interruptible chunks — high-priority updates (user input) interrupt low-priority ones (background data)
- Both are non-blocking by design — neither "halts" for slow work

---

## React vs Vanilla DOM — mental model

| | Vanilla JS | React |
|---|---|---|
| UI source of truth | DOM | JavaScript state |
| Update flow | `element.textContent = x` | `setState(x)` → re-render |
| Event delegation | Manual `addEventListener` | Built into JSX (`onClick`) |
| Templating | `innerHTML` / template strings | JSX (compiled) |
| Component concept | None (patterns like Web Components) | Core unit |

**The fundamental shift:** In vanilla JS, you imperatively tell the DOM what to change. In React, you declare what the UI should look like given current state, and React figures out the minimal DOM changes. You stop thinking "change this element" and start thinking "this state → this UI."

---

## Exercise solution

<details>
<summary>Click to reveal solution</summary>

```jsx
const Row = React.memo(function Row({ item, onDelete }) {
  console.log('Row rendered:', item.id)
  return (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  )
})

function App() {
  const [items, setItems] = useState(generateItems(100))
  const [filter, setFilter] = useState('')

  const filtered = useMemo(
    () => items.filter(i => i.name.toLowerCase().includes(filter.toLowerCase())),
    [items, filter]
  )

  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      {filtered.map(item => <Row key={item.id} item={item} onDelete={handleDelete} />)}
    </div>
  )
}
```

Without `React.memo` + `useCallback`: deleting an item re-renders ALL 100 rows.
With them: only the deleted row's siblings that changed re-render.
</details>
