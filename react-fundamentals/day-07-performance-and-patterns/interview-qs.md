# Day 7 — Interview Questions

---

**Q1: What is the difference between useMemo and useCallback?**

- `useMemo` memoizes the **result** of a function: `useMemo(() => compute(a, b), [a, b])`
- `useCallback` memoizes the **function itself**: `useCallback((x) => doThing(x), [dep])`

`useCallback(fn, deps)` is sugar for `useMemo(() => fn, deps)`.

Use `useMemo` to avoid rerunning expensive computations. Use `useCallback` to pass stable function references to memoized children or `useEffect` deps arrays.

---

**Q2: When does React.memo NOT work?**

`React.memo` uses shallow (referential) comparison. It fails when:
- A prop is an **object or array literal** created inline: `<Comp style={{ color: 'red' }} />` — new reference every render
- A prop is an **arrow function** created inline: `<Comp onClick={() => doThing()} />` — new reference every render
- State inside the memoized component changes (it always re-renders then, correctly)
- A context the component uses changes

Fix the first two by memoizing the prop with `useMemo`/`useCallback` in the parent.

---

**Q3: Explain the lifting state up pattern. When would you use it?**

When two sibling components need to share or react to the same state, move that state to their closest common ancestor. The parent owns state and passes it down as props, plus callback props for children to trigger updates.

Use it when:
- Two components display the same derived value (e.g., a total display + an input)
- One component's action needs to update another component's view
- You want to keep a single source of truth

This is the React-idiomatic alternative to event emitters or shared module state.

---

**Q4: What is the container/presentational pattern? Is it still relevant?**

Separating "smart" containers (fetch data, manage state, handle logic) from "dumb" presentational components (receive props, render UI). Container passes data down; presentational is a pure render.

Still relevant but evolved: custom hooks replaced much of what containers did (the hook is now the "container" for data logic), so today you often just see components that are thin wrappers around a custom hook call. The underlying principle — separate data logic from rendering — is still correct.

---

**Q5: How would you explain React's rendering model to someone coming from Express/Node?**

In Express, you handle an HTTP request and `res.send()` a response. Each request is stateless — you compute and return.

React is similar but for UI: a component is a **function of state that returns UI**. When state changes, React calls your function again (re-renders) and "sends" a new UI description. React then diffs the old and new descriptions and applies the minimum DOM changes — like a patch instead of a full response.

The reconciler's async rendering in React 18 is like Node's event loop: work is done in interruptible chunks, high-priority tasks (user input) can pre-empt low-priority ones (background renders). Neither blocks the thread for long operations.
