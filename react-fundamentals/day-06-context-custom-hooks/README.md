# Day 6 — Context API & Custom Hooks

**Goal:** Understand when and how to use Context, and how to write custom hooks that encapsulate real logic.

---

## The prop drilling problem

When state needs to reach deeply nested components, you end up passing props through every intermediate level — even components that don't use them. This is prop drilling.

```
App (has user)
  └── Layout (passes user)
        └── Sidebar (passes user)
              └── Avatar (actually uses user) ← 3 levels down
```

Context solves this by making a value available to any descendant without passing it through each level.

---

## Context API — three parts

### 1. Create
```jsx
// auth-context.js
import { createContext } from 'react'
export const AuthContext = createContext(null)  // default value when no Provider above
```

### 2. Provide
```jsx
function App() {
  const [user, setUser] = useState(null)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Layout />
    </AuthContext.Provider>
  )
}
```

### 3. Consume
```jsx
import { useContext } from 'react'
import { AuthContext } from './auth-context'

function Avatar() {
  const { user } = useContext(AuthContext)  // no props needed
  return <img src={user?.avatar} alt={user?.name} />
}
```

---

## When to use Context vs prop drilling

**Use Context for:**
- Auth state (current user, login/logout)
- Theme (dark/light mode)
- Locale / i18n
- Global notification/toast state
- Any value that a large portion of the tree needs

**Don't use Context for:**
- State local to a subtree — just lift state up to the common parent
- State that changes frequently (every component that calls `useContext` re-renders when value changes)
- Replacing a proper state management library in a complex app

**Context is not a global state manager.** It's a dependency injection mechanism. The difference: Redux/Zustand give you selectors (component only re-renders when the specific slice it cares about changes). Context re-renders everything subscribed.

---

## Optimizing Context re-renders

Every consumer re-renders when the context value reference changes. Object literals in JSX always create new references:

```jsx
// BAD — new object every render = all consumers re-render every time
<AuthContext.Provider value={{ user, login, logout }}>

// GOOD — memoize the value
const value = useMemo(() => ({ user, login, logout }), [user])
<AuthContext.Provider value={value}>
```

---

## Custom Hooks

Custom hooks are just functions that call other hooks. They let you extract and reuse stateful logic without component hierarchy changes (no wrapping needed — unlike HOCs).

**Rules:**
- Name must start with `use`
- Can call any other hook
- Must follow the rules of hooks (only call at top level, not in conditionals)

Think of custom hooks like Express middleware — they encapsulate a cross-cutting concern that multiple routes (components) need.

---

## Hook 1: useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()
    setLoading(true)

    fetch(url, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(data => { setData(data); setLoading(false) })
      .catch(err => { if (err.name !== 'AbortError') { setError(err); setLoading(false) } })

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
```

---

## Hook 2: useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Lazy initializer — only runs on mount
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  function set(newValue) {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, set]
}
```

---

## Hook 3: useDebounce

```jsx
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

// Usage
function Search() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery)
  }, [debouncedQuery])  // fires 400ms after user stops typing
}
```

---

## Exercise solution

<details>
<summary>Click to reveal solution</summary>

```jsx
// Theme Context
const ThemeContext = createContext('light')

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

function ThemedButton() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      style={{ background: theme === 'dark' ? '#1e293b' : '#f1f5f9', color: theme === 'dark' ? '#f1f5f9' : '#0f172a' }}
    >
      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  )
}
```
</details>
