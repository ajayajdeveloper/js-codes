/**
 * Day 6 — Context API & Custom Hooks
 *
 * Demonstrates:
 * - createContext / Provider / useContext
 * - Auth context (login/logout pattern)
 * - Theme context
 * - Custom hooks: useLocalStorage, useDebounce, useFetch
 * - Why to wrap context in a custom hook (better error messages)
 */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

// ── CUSTOM HOOKS ──────────────────────────────────────────────────────────

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  const set = useCallback((newValue) => {
    const resolved = newValue instanceof Function ? newValue(value) : newValue
    setValue(resolved)
    localStorage.setItem(key, JSON.stringify(resolved))
  }, [key, value])

  return [value, set]
}

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// ── AUTH CONTEXT ──────────────────────────────────────────────────────────

const AuthContext = createContext(null)

// Wrap context in a custom hook — gives a meaningful error if used outside Provider
function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

const FAKE_USERS = {
  'admin@example.com': { id: 1, name: 'Admin User', role: 'admin', avatar: null },
  'user@example.com': { id: 2, name: 'Regular User', role: 'user', avatar: null },
}

function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('demo_user', null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))  // simulate network
    const found = FAKE_USERS[email]
    if (found && password === 'password') {
      setUser(found)
      setLoading(false)
      return true
    }
    setError('Invalid email or password')
    setLoading(false)
    return false
  }, [setUser])

  const logout = useCallback(() => setUser(null), [setUser])

  // Memoize value — prevents all consumers from re-rendering on unrelated state changes
  const value = useMemo(() => ({ user, login, logout, loading, error }), [user, login, logout, loading, error])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ── THEME CONTEXT ─────────────────────────────────────────────────────────

const ThemeContext = createContext('dark')

function useTheme() {
  return useContext(ThemeContext)
}

// ── COMPONENTS USING CONTEXT ──────────────────────────────────────────────

const s = {
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24, maxWidth: 440, marginBottom: 16 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 14, marginBottom: 10 },
  btn: (v = 'primary') => ({
    padding: '10px 20px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, width: '100%',
    background: v === 'primary' ? '#3b82f6' : '#334155', color: '#fff', marginBottom: 8,
  }),
  error: { color: '#ef4444', fontSize: 13, marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 16 },
}

function LoginForm() {
  const { login, loading, error } = useAuth()
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')

  async function handleSubmit(e) {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} style={s.card}>
      <p style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 16 }}>Sign In</p>
      <input style={s.input} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input style={s.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      {error && <p style={s.error}>{error}</p>}
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 10 }}>
        Try: admin@example.com / password
      </p>
      <button type="submit" style={s.btn()} disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

// Deeply nested component — uses context, no prop drilling
function UserBadge() {
  const { user, logout } = useAuth()
  if (!user) return null
  const initials = user.name.split(' ').map(n => n[0]).join('')

  return (
    <div style={{ ...s.card, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={s.avatar}>{initials}</div>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, color: '#f1f5f9' }}>{user.name}</p>
        <p style={{ color: '#64748b', fontSize: 12 }}>{user.role} · Logged in</p>
      </div>
      <button style={{ ...s.btn('secondary'), width: 'auto', marginBottom: 0 }} onClick={logout}>
        Logout
      </button>
    </div>
  )
}

// ── DEMO: useDebounce hook ────────────────────────────────────────────────

const ITEMS = ['React', 'Redux', 'Relay', 'Router', 'Recoil', 'Remix', 'Node.js', 'Next.js', 'Nuxt', 'Angular', 'Vue', 'Svelte']

function DebounceDemo() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)
  const [searchCount, setSearchCount] = useState(0)

  useEffect(() => {
    if (debouncedQuery) setSearchCount(c => c + 1)
  }, [debouncedQuery])

  const results = ITEMS.filter(i => i.toLowerCase().includes(debouncedQuery.toLowerCase()))

  return (
    <div style={s.card}>
      <p style={{ color: '#93c5fd', fontSize: 13, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>useDebounce</p>
      <input
        style={{ ...s.input, marginBottom: 8 }}
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type to search (debounced 400ms)..."
      />
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>
        Actual searches fired: <strong style={{ color: '#f1f5f9' }}>{searchCount}</strong>
        {' '} (vs {query.length > 0 ? 'many more' : '0'} keystrokes)
      </p>
      <div>
        {results.map(r => (
          <div key={r} style={{ padding: '6px 0', color: '#94a3b8', borderBottom: '1px solid #1e293b', fontSize: 14 }}>{r}</div>
        ))}
      </div>
    </div>
  )
}

// ── ROOT ──────────────────────────────────────────────────────────────────

function AuthDemo() {
  const { user } = useAuth()
  return user ? <UserBadge /> : <LoginForm />
}

export default function Day6Example() {
  return (
    <ThemeContext.Provider value="dark">
      <AuthProvider>
        <div style={{ maxWidth: 480 }}>
          <AuthDemo />
          <DebounceDemo />
        </div>
      </AuthProvider>
    </ThemeContext.Provider>
  )
}
