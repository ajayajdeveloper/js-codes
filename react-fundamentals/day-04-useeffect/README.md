# Day 4 — useEffect

**Goal:** Master `useEffect` completely — this is where ~40% of React interview questions live. Get every edge case solid.

---

## What useEffect is

`useEffect` lets you **synchronize a component with something outside React** — a network call, a DOM subscription, a timer, a localStorage write. It runs *after* the render is committed to the DOM.

Mental model: not "lifecycle hooks" (that's the class component framing). Think of it as: **"after every render where these deps changed, run this side effect."**

```jsx
useEffect(() => {
  // runs after render
  return () => {
    // cleanup: runs before the NEXT run of this effect, and on unmount
  }
}, [/* dependency array */])
```

---

## The dependency array — everything

The dep array controls *when* the effect re-runs:

| Dep array | When it runs |
|---|---|
| Omitted | After every single render |
| `[]` (empty) | Once after the first render (mount), never again |
| `[a, b]` | After mount + after any render where `a` or `b` changed |

```jsx
// Runs every render — rarely what you want
useEffect(() => { document.title = 'Page' })

// Runs once on mount
useEffect(() => { fetchData() }, [])

// Runs when userId changes
useEffect(() => { fetchUser(userId) }, [userId])
```

**React's rule:** Every value from the component scope that the effect reads must be in the deps array. Linters enforce this. Do not lie about deps (putting `[]` when the effect reads state) — it causes stale closure bugs.

---

## Stale closure bug (common interview topic)

```jsx
function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      // BAD: count is captured at 0 forever — stale closure
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(id)
  }, []) // lying about deps — count should be here

  return <p>{count}</p>
}
```

Fix 1: Add `count` to deps (effect re-subscribes every tick — works but inefficient):
```jsx
}, [count])
```

Fix 2: Use functional state update (no deps needed — doesn't read `count`):
```jsx
setCount(prev => prev + 1)
}, [])  // now deps are honest
```

Fix 2 is the correct answer.

---

## Cleanup function

The cleanup function runs:
1. Before the effect runs again (when deps changed)
2. When the component unmounts

```jsx
useEffect(() => {
  const controller = new AbortController()
  
  fetch('/api/data', { signal: controller.signal })
    .then(r => r.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err)
    })

  return () => controller.abort() // cleanup: cancel in-flight request
}, [userId])
```

What to always clean up:
- `fetch` → AbortController
- `setInterval` / `setTimeout` → `clearInterval` / `clearTimeout`
- EventListeners → `removeEventListener`
- WebSocket connections → `ws.close()`
- Subscriptions → `unsubscribe()`

---

## Data fetching pattern (the real-world template)

```jsx
function useUser(userId) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    let cancelled = false  // guard against setting state after unmount

    setLoading(true)
    setError(null)

    fetch(`/api/users/${userId}`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(data => {
        if (!cancelled) {
          setUser(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [userId])

  return { user, loading, error }
}
```

This pattern (or the AbortController version) is the expected answer when an interviewer asks "how do you fetch data in React?"

---

## Effect vs Event Handler — when to use which

| | `useEffect` | Event handler |
|---|---|---|
| Triggered by | React rendering | User action |
| Example | Fetch on mount, sync to localStorage | Fetch on form submit, post on button click |
| When to use | "Because the component rendered with this state" | "Because the user did X" |

Don't use `useEffect` to handle events — just put the logic in the handler directly.

```jsx
// BAD: effect triggered by state set in a click — indirect, confusing
function handleSave() { setShouldSave(true) }
useEffect(() => {
  if (shouldSave) { save(); setShouldSave(false) }
}, [shouldSave])

// GOOD: just do it in the handler
function handleSave() { save() }
```

---

## StrictMode double-invoke (React 18 gotcha)

In development, React 18 StrictMode mounts → unmounts → remounts every component. This means effects run twice on mount. This is intentional — it surfaces bugs in effects that don't properly clean up. Don't suppress this. Fix the cleanup instead.

---

## Exercise solution

<details>
<summary>Click to reveal solution</summary>

```jsx
function DebounceSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    const timer = setTimeout(() => {
      // Simulate API call
      const fakeResults = ['React', 'Redux', 'Relay', 'Recoil', 'Remix']
        .filter(r => r.toLowerCase().includes(query.toLowerCase()))
      setResults(fakeResults)
      setLoading(false)
    }, 400)

    return () => {
      clearTimeout(timer)
      setLoading(false)
    }
  }, [query])

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      {loading && <p>Searching...</p>}
      <ul>{results.map(r => <li key={r}>{r}</li>)}</ul>
    </div>
  )
}
```
</details>
