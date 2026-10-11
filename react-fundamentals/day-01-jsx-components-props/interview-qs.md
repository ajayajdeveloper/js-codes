# Day 1 — Interview Questions

---

**Q1: What is JSX and why does React use it?**

JSX is syntactic sugar over `React.createElement()`. The browser never sees JSX — Babel/esbuild compiles it. React uses it because describing UI as function-call trees is unreadable at scale. JSX lets you write what looks like HTML while keeping it in the same file as the logic that drives it. It's not a template language — it's JS with a pre-compilation step.

---

**Q2: What's the difference between a controlled and uncontrolled component?** *(preview — covered deeper Day 2)*

- **Controlled**: React state is the single source of truth for the input's value. Every keystroke calls `setState`. You always know the current value.
- **Uncontrolled**: The DOM holds the value. You read it via a `ref`. Simpler, but you lose the ability to validate/transform on each keystroke.

Use controlled for forms where you need validation, formatting, or to sync with other UI. Use uncontrolled when integrating with non-React libraries.

---

**Q3: Why must component names start with a capital letter?**

React uses the casing to decide whether to treat the JSX tag as a **DOM element** or a **component**. `<div>` → `React.createElement('div', ...)` (string, native DOM). `<MyDiv>` → `React.createElement(MyDiv, ...)` (variable reference, your component). Lowercase = string = native HTML. Uppercase = variable = your function/class.

---

**Q4: When would you use a class component today?**

Only when working with an existing codebase that uses them, OR when you need an **Error Boundary** — the only feature still requiring a class component (`componentDidCatch` / `getDerivedStateFromError` have no hook equivalent yet). In all new code, use function components.

---

**Q5: Can you pass a function as a prop? When would you?**

Yes. Functions-as-props is the primary mechanism for **child-to-parent communication** — React's equivalent of EventEmitter callbacks. The parent defines the handler, passes it down; the child calls it with data. This is called "lifting state up" and is fundamental to how data flows in React (always downward through props, upward through callbacks).

```jsx
// Parent owns state, passes setter down as callback
function Parent() {
  const [value, setValue] = useState('')
  return <Child onSubmit={(val) => setValue(val)} />
}
```
