# Day 2 — Interview Questions

---

**Q1: What is the difference between controlled and uncontrolled components?**

- **Controlled**: React state owns the value. Input's `value` prop is bound to state; `onChange` updates state. You always have the current value in state — no DOM querying needed.
- **Uncontrolled**: DOM owns the value. You use a `ref` to read it imperatively (e.g., `ref.current.value` on submit).

Controlled is preferred for: real-time validation, conditional disabling, format-on-type. Uncontrolled is simpler for: file inputs, integrating third-party DOM libraries.

---

**Q2: Why should you use the functional form of setState when the new value depends on the previous?**

`setState` is async — React batches updates. If you call `setCount(count + 1)` twice in the same event handler, both calls read the same stale `count`. Using `setCount(prev => prev + 1)` guarantees you always operate on the latest committed state, not the captured closure value.

This is especially critical inside `setTimeout`, `setInterval`, or async callbacks where the closure captures a stale value.

---

**Q3: Why can't you mutate state directly in React?**

React uses **referential equality** to detect changes. `if (newState === oldState) skip re-render`. If you mutate the object (e.g., `state.items.push(x)`), the reference is the same, React sees no change, and skips the render. You must return a new object/array so React sees a new reference and re-renders.

This is the same reason immutability matters in Redux and functional programming.

---

**Q4: How do you handle multiple form fields without a separate useState for each?**

Use one state object and update by field name using computed property keys:

```jsx
const [form, setForm] = useState({ name: '', email: '' })

function handleChange(e) {
  const { name, value } = e.target
  setForm(prev => ({ ...prev, [name]: value }))
}
```

Each input needs a `name` attribute matching the state key. This scales to any number of fields without adding state variables.

---

**Q5: What is `e.preventDefault()` in a React form and why is it needed?**

Without it, submitting a form causes a full-page HTTP GET/POST to the current URL — the browser's default behavior. `e.preventDefault()` stops that and lets JavaScript handle it (i.e., call your API, update state). Identical in behavior to Express `next()` being about continuing the middleware chain — here you're stopping the native chain.
