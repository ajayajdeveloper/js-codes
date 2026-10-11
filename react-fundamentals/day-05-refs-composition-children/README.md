# Day 5 — useRef vs useState & Component Composition

**Goal:** Know exactly when to reach for `useRef`, understand the `children` prop, and build reusable composable components.

---

## useRef

`useRef` returns a mutable object `{ current: value }` that **persists across renders but does NOT trigger a re-render when mutated**.

```jsx
const ref = useRef(initialValue)
ref.current = newValue  // mutate freely — no re-render
```

Compare to `useState`:

| | `useState` | `useRef` |
|---|---|---|
| Triggers re-render? | Yes | No |
| Value survives re-render? | Yes | Yes |
| Mutable? | No (use setter) | Yes (direct mutation) |
| Use case | UI state | Timers, DOM nodes, previous values, flags |

---

## Use case 1: DOM access

```jsx
function AutoFocusInput() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()  // direct DOM access — no document.querySelector
  }, [])

  return <input ref={inputRef} placeholder="I auto-focus" />
}
```

Pass the `ref` object via the `ref` prop. React sets `ref.current` to the DOM node after mount, `null` after unmount.

---

## Use case 2: Mutable values that shouldn't trigger re-renders

```jsx
function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef(null)  // store the interval ID

  function start() {
    intervalRef.current = setInterval(() => {
      setElapsed(prev => prev + 1)  // this triggers re-render (correct)
    }, 1000)
  }

  function stop() {
    clearInterval(intervalRef.current)  // read the ID stored in ref
  }

  return (
    <div>
      <p>{elapsed}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}
```

If you stored the interval ID in state, calling `setIntervalId(id)` would trigger a useless re-render.

---

## Use case 3: Tracking previous value

```jsx
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value  // updates AFTER render, so ref.current is always one render behind
  })
  return ref.current  // previous value
}
```

---

## Use case 4: Avoiding stale closures without re-subscribing effects

```jsx
function useLatestCallback(fn) {
  const ref = useRef(fn)
  useEffect(() => { ref.current = fn })  // always up-to-date
  return useCallback((...args) => ref.current(...args), [])
}
```

---

## Component Composition & children

The `children` prop is what React passes between opening and closing tags:

```jsx
<Modal title="Confirm">
  <p>Are you sure?</p>   {/* this becomes props.children */}
</Modal>
```

```jsx
function Modal({ title, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  )
}
```

`children` can be:
- JSX elements
- Text
- Arrays of elements
- A function (render prop pattern — advanced)

---

## Named slot pattern (multiple children areas)

When you need more than one content area, pass them as props:

```jsx
function Card({ header, footer, children }) {
  return (
    <div style={{ border: '1px solid #334155', borderRadius: 8 }}>
      {header && <div style={{ borderBottom: '1px solid #334155', padding: 16 }}>{header}</div>}
      <div style={{ padding: 16 }}>{children}</div>
      {footer && <div style={{ borderTop: '1px solid #334155', padding: 16 }}>{footer}</div>}
    </div>
  )
}

// Usage
<Card
  header={<h2>Title</h2>}
  footer={<button>OK</button>}
>
  <p>Main content goes here</p>
</Card>
```

---

## Why composition beats inheritance

React has no class inheritance for components. Instead, compose behavior:

- Wrap with a layout: `<Page><Content /></Page>`
- Inject behavior: pass function props
- Share logic: custom hooks
- Conditionally render: `children && <>{children}</>`

This avoids the "wrapper hell" of HOCs and keeps components readable.

---

## Exercise solution

<details>
<summary>Click to reveal solution</summary>

```jsx
function Stopwatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(t => t + 10), 10)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const mins = Math.floor(time / 60000)
  const secs = Math.floor((time % 60000) / 1000)
  const ms = Math.floor((time % 1000) / 10)

  return (
    <div>
      <p>{String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}.{String(ms).padStart(2,'0')}</p>
      <button onClick={() => setRunning(r => !r)}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={() => { setRunning(false); setTime(0) }}>Reset</button>
    </div>
  )
}
```
</details>
