# Day 2 — State, Events & Forms

**Goal:** Understand `useState` deeply, how React event system works, and how to build controlled forms correctly.

---

## useState

```jsx
const [value, setValue] = useState(initialValue)
```

Think of `useState` as a **per-component variable that triggers a re-render when updated**. Regular variables (`let x = 0`) don't trigger renders — React doesn't watch them.

**What actually happens:**
1. First render: React creates a state slot, stores `initialValue`, returns `[initialValue, setter]`
2. You call `setValue(newValue)`
3. React schedules a re-render of that component
4. On re-render, React returns the new value from the same slot
5. Your function runs top-to-bottom again with the new value

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  // count is always the current value for THIS render
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Rules:**
- Never mutate state directly: `state.push(x)` won't trigger re-render — always return new values
- State updates are **asynchronous** (batched) — don't read state immediately after setting it
- When new state depends on old state, use the **functional form**: `setValue(prev => prev + 1)`

```jsx
// BAD — stale closure risk in async context
setCount(count + 1)
setCount(count + 1) // both read same `count`, net result: +1 not +2

// GOOD — always gets latest state
setCount(prev => prev + 1)
setCount(prev => prev + 1) // net result: +2
```

---

## useState with Objects and Arrays

State must be replaced, not mutated:

```jsx
// Objects — spread and override
setUser(prev => ({ ...prev, name: 'New Name' }))

// Arrays — use non-mutating methods
setItems(prev => [...prev, newItem])           // add
setItems(prev => prev.filter(i => i.id !== id)) // remove
setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i)) // update
```

---

## Events

React uses a **synthetic event system** — it wraps native browser events for cross-browser consistency. The API is identical to native DOM events but they're pooled (in older React versions) or noop'd.

```jsx
function Input() {
  function handleChange(event) {
    // event.target.value — same as DOM
    console.log(event.target.value)
  }
  return <input onChange={handleChange} />
}
```

Common event props: `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onBlur`, `onFocus`

**Passing data to handlers:**
```jsx
// Use arrow function wrapper when you need to pass args
{items.map(item => (
  <button onClick={() => handleDelete(item.id)}>Delete</button>
))}
```

---

## Controlled Forms

**Controlled component**: React state is the single source of truth. Every input value is bound to state.

```jsx
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault() // same as Express middleware — stop default behavior
    // both values are already in state, no DOM querying needed
    console.log({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
```

Why controlled? You can:
- Validate on each keystroke
- Transform input (e.g., uppercase, trim)
- Disable submit until form is valid
- Reset the form by resetting state

---

## Multiple fields with one state object

```jsx
const [form, setForm] = useState({ name: '', email: '', message: '' })

function handleChange(e) {
  const { name, value } = e.target
  setForm(prev => ({ ...prev, [name]: value }))
}

// Each input needs a matching name attribute
<input name="name" value={form.name} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
```

---

## Exercise solution

<details>
<summary>Click to reveal solution</summary>

```jsx
function SearchableList() {
  const [query, setQuery] = useState('')
  const items = ['Node.js', 'React', 'Express', 'PostgreSQL', 'Docker', 'Redis', 'GraphQL']

  const filtered = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filtered.map(item => <li key={item}>{item}</li>)}
      </ul>
      <p>{filtered.length} results</p>
    </div>
  )
}
```
</details>
