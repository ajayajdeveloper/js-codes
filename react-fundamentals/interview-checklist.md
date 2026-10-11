# React Interview Checklist

Can you explain each of these out loud in 60 seconds? Check off as you go.

---

## Day 1 — JSX & Components

- [ ] What is JSX and what does it compile to?
- [ ] Why must component names be capitalized?
- [ ] What can and can't you put inside `{}`?
- [ ] What's the rule about one root element? How do fragments solve it?
- [ ] Explain: props are read-only. Why?
- [ ] How do function components differ from class components? When would you use a class component today?

---

## Day 2 — State & Forms

- [ ] What does `useState` return? What triggers a re-render?
- [ ] Why can't you do `state.items.push(x)` and expect a re-render?
- [ ] When should you use the functional form `setState(prev => ...)`?
- [ ] What's a controlled component? What's uncontrolled? When to use each?
- [ ] How do you handle multiple form fields with one state object?
- [ ] Why does `e.preventDefault()` matter on form submit?

---

## Day 3 — Rendering

- [ ] Why do list items need keys? What breaks without them?
- [ ] Why is array index a bad key? When is it acceptable?
- [ ] What's the gotcha with `{count && <p>...</p>}` when count is 0?
- [ ] What are the 3 conditional rendering patterns? When to use each?
- [ ] What triggers a component to re-render?
- [ ] What is reconciliation in one sentence?

---

## Day 4 — useEffect

- [ ] What does each dep array form mean: omitted / `[]` / `[a, b]`?
- [ ] What is a stale closure? Show an example and fix it.
- [ ] When does the cleanup function run? What should always be cleaned up?
- [ ] Walk through a correct data-fetching useEffect (fetch + AbortController + cleanup).
- [ ] What's the difference between using useEffect for data fetch vs doing it in an event handler?
- [ ] What does React 18 StrictMode double-invoke mean for effects?

---

## Day 5 — useRef & Composition

- [ ] What is the key difference between `useRef` and `useState`?
- [ ] Name 3 use cases for `useRef`.
- [ ] What is `props.children`? Give an example.
- [ ] What is the named slot pattern? When do you use it over just `children`?
- [ ] Why does React favor composition over inheritance?

---

## Day 6 — Context & Custom Hooks

- [ ] What problem does Context solve? What is it NOT good for?
- [ ] Walk through the 3 steps to use Context (create, provide, consume).
- [ ] Why should you wrap `useContext` in a custom hook?
- [ ] Why does an object literal in a Provider value cause unnecessary re-renders?
- [ ] What is a custom hook? What's the naming rule and why?
- [ ] When do you use a custom hook vs just putting logic in the component?

---

## Day 7 — Performance & Patterns

- [ ] When does a component re-render? (3 cases)
- [ ] What does `React.memo` do? When does it fail?
- [ ] What's the difference between `useMemo` and `useCallback`?
- [ ] When should you NOT bother with memoization?
- [ ] Explain lifting state up. When do you do it?
- [ ] What is the container/presentational pattern?
- [ ] How is React's rendering model like/unlike Node's event loop?
- [ ] What's the fundamental mental model shift from vanilla DOM manipulation to React?

---

## Bonus — things interviewers love to ask

- [ ] What is the virtual DOM?
- [ ] Explain React's reconciliation algorithm at a high level.
- [ ] What's a Higher Order Component (HOC)?
- [ ] What is a render prop?
- [ ] What is the difference between `useEffect` and `useLayoutEffect`?
- [ ] How would you implement optimistic updates?
- [ ] What is code splitting in React? (`React.lazy` + `Suspense`)

---

## Self-assessment

**Green**: Can explain clearly in 60 seconds with an example  
**Yellow**: Understand the concept but stumble on details  
**Red**: Need to review

Aim for all green before interviews. Yellow → re-read that day's README and redo the exercise.
