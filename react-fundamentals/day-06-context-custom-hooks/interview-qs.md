# Day 6 — Interview Questions

---

**Q1: What problem does Context solve and when should you NOT use it?**

Context solves **prop drilling** — passing data through many component layers just to reach a deeply nested consumer. It acts as dependency injection for React components.

Avoid Context for:
- **Frequently changing state** — every `useContext` subscriber re-renders when the value changes. High-frequency updates (mouse position, scroll position) will cause widespread re-renders.
- **Colocated state** — if only two or three nearby components need the data, just lift state to their common parent.
- **Complex state with selectors** — use Zustand/Redux if you need components to subscribe to slices of state rather than the whole object.

---

**Q2: What is a custom hook? Why use one?**

A custom hook is a function whose name starts with `use` that calls one or more built-in hooks. It has the same rules as hooks (can't be called inside conditions/loops, etc.).

You use them to:
- Extract stateful logic out of components into reusable functions (like `useFetch`, `useDebounce`)
- Share logic across multiple components without wrapping them
- Keep components focused on rendering, not data management

It's the primary composition mechanism for stateful behavior — replaces HOCs and render props for most use cases.

---

**Q3: How do you prevent Context from causing unnecessary re-renders?**

Two techniques:
1. **Memoize the value object**: `const value = useMemo(() => ({ user, login }), [user, login])` — prevents new reference on every render when the contents didn't change.
2. **Split contexts by update frequency**: separate `AuthContext` (rarely changes) from `NotificationContext` (changes often). Components only subscribe to what they need.

A component re-renders whenever the context value reference changes (Object.is check). An object literal `{ a, b }` in JSX always creates a new reference, so without `useMemo` every render creates a new value and causes all consumers to re-render.

---

**Q4: What are the rules of hooks?**

1. **Only call hooks at the top level** — not inside conditions, loops, or nested functions. React relies on call order to match hook calls to state slots; reordering them breaks everything.
2. **Only call hooks from React function components or custom hooks** — not plain JS functions, class components, or event handlers.

The `eslint-plugin-react-hooks` package (`rules-of-hooks` rule) enforces these statically.

---

**Q5: How would you share data-fetching logic between 5 components that all fetch different endpoints but in the same way?**

Write a custom `useFetch(url)` hook:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(!!url)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()
    setLoading(true)
    fetch(url, { signal: controller.signal })
      .then(r => r.json()).then(setData)
      .catch(e => { if (e.name !== 'AbortError') setError(e) })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
```

Each component calls `useFetch('/api/specific-endpoint')`. The logic lives once in the hook — no copy-paste, no wrapping.
