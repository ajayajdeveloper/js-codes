# Day 1 — JSX, Components & Props

**Goal:** Understand what JSX is, how function components work, how data flows in via props, and how React differs from class-based patterns.

---

## JSX is syntax sugar

JSX compiles to `React.createElement(type, props, ...children)`. Nothing magic.

```jsx
// What you write
const el = <h1 className="title">Hello</h1>

// What Babel compiles it to
const el = React.createElement('h1', { className: 'title' }, 'Hello')
```

Key rules:
- Every JSX expression must have **one root element** (or use `<>...</>` fragment)
- HTML attributes use camelCase: `class` → `className`, `for` → `htmlFor`
- JS expressions go inside `{}` — not statements, only expressions
- Self-closing tags must close: `<img />`, `<br />`

---

## Function Components

A component is just a function that returns JSX. React calls it for you.

```jsx
function Greeting({ name }) {
  return <p>Hello, {name}</p>
}
```

- Name must be **capitalized** — React uses this to distinguish components from HTML tags
- Must return JSX (or `null` to render nothing)
- Called by React during rendering, not by you directly

Think of it like an Express route handler — React is the framework that invokes it when needed.

---

## Props

Props = the function's argument object. Destructure them like any JS object.

```jsx
function Button({ label, onClick, disabled = false }) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}

// Usage
<Button label="Save" onClick={handleSave} />
```

- Props are **read-only** — never mutate them (same reason you don't mutate `req` in Express)
- Any JS value can be a prop: string, number, array, object, function, JSX
- Functions passed as props are the React equivalent of callbacks / event emitters

---

## Class Components (just enough for interviews)

You will see these in legacy codebases and interviewers sometimes ask to compare.

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    )
  }
}
```

**Function vs Class — what to say in an interview:**
| | Function Component | Class Component |
|---|---|---|
| State | `useState` hook | `this.state` + `setState` |
| Lifecycle | `useEffect` | `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` |
| `this` binding | No `this` | Required, causes bugs |
| Code reuse | Custom hooks | HOCs / render props (more complex) |
| React team recommendation | Yes, use these | Legacy, avoid in new code |

---

## Exercise solution

<details>
<summary>Click to reveal solution</summary>

```jsx
function ProfileBadge({ name, role, avatarUrl }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16,
                  border: '1px solid #334155', borderRadius: 8 }}>
      <img src={avatarUrl} alt={name} style={{ width: 48, height: 48, borderRadius: '50%' }} />
      <div>
        <p style={{ fontWeight: 700 }}>{name}</p>
        <p style={{ color: '#94a3b8', fontSize: 13 }}>{role}</p>
      </div>
    </div>
  )
}
```
</details>
