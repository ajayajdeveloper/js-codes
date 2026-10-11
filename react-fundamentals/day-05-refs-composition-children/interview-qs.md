# Day 5 — Interview Questions

---

**Q1: What is useRef and how does it differ from useState?**

`useRef` returns `{ current: value }` — a mutable container that persists across renders but **does not trigger a re-render when mutated**. `useState` triggers a re-render on every update.

Use `useRef` when you need to:
- Access a DOM node directly
- Store a mutable value (timer ID, previous value, flag) without causing renders
- Keep a stable reference to a callback or value inside an effect

Use `useState` for any value that should cause the UI to update when it changes.

---

**Q2: When would you use a ref to access a DOM element?**

When you need imperative DOM operations that have no React equivalent:
- Focus management (`input.focus()`)
- Scroll position (`element.scrollTo()`)
- Measuring element dimensions (`element.getBoundingClientRect()`)
- Integrating with third-party DOM libraries (charts, maps, rich text editors)
- Playing/pausing media (`video.play()`)

Avoid using refs to read input values — use controlled components with state instead.

---

**Q3: What is the children prop?**

`children` is a special prop that React automatically populates with whatever is between a component's opening and closing tags. Any valid JSX (elements, strings, arrays, null) can be passed as children.

```jsx
<Card>
  <p>This becomes props.children</p>
</Card>
```

It enables **composition** — building reusable wrapper components (modals, cards, panels, layouts) that don't need to know what they'll contain. This is how React avoids inheritance.

---

**Q4: What is the difference between composition and inheritance in React?**

React explicitly discourages inheritance. Instead:
- **Children prop** for generic wrappers (layouts, cards, modals)
- **Named props as slots** for multiple content areas (`header`, `footer`, `sidebar`)
- **Custom hooks** for shared behavior (stateful logic reuse without wrapping)
- **Render props / function children** for advanced injection

Inheritance creates tight coupling — you can only inherit from one class, and it forces you to know the parent's implementation. Composition is additive and avoids those problems.

---

**Q5: What is a "render prop"?**

A render prop is a prop whose value is a function that returns JSX. The component calls that function to know what to render, rather than rendering its own hardcoded children:

```jsx
<DataProvider render={(data) => <MyComponent data={data} />} />
// or via children:
<DataProvider>{(data) => <MyComponent data={data} />}</DataProvider>
```

It was the primary pre-hooks pattern for sharing stateful logic. Custom hooks largely replaced it, but you still encounter it in libraries like `react-router` (`<Route render={...} />`).
