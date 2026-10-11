/**
 * Day 4 — useEffect
 *
 * A GitHub user search demonstrating:
 * - useEffect for data fetching
 * - AbortController cleanup
 * - Dependency array (re-runs when query changes)
 * - loading / error / data states
 * - Debounce via setTimeout + cleanup
 * - Multiple effects in one component
 * - document.title sync as a simple effect
 */
import { useState, useEffect } from 'react'

const s = {
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24, maxWidth: 480 },
  input: { width: '100%', padding: '10px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 14, marginBottom: 20 },
  userCard: { display: 'flex', gap: 16, alignItems: 'center', padding: 16, background: '#0f172a', borderRadius: 8, marginBottom: 12 },
  avatar: { width: 64, height: 64, borderRadius: '50%' },
  name: { fontWeight: 700, fontSize: 15, color: '#f1f5f9' },
  login: { color: '#64748b', fontSize: 13 },
  bio: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
  stat: { color: '#94a3b8', fontSize: 12 },
  empty: { textAlign: 'center', padding: 32, color: '#64748b' },
  error: { color: '#ef4444', padding: 16, background: '#1e0a0a', borderRadius: 8 },
  spinner: { textAlign: 'center', padding: 24, color: '#64748b' },
  tag: { display: 'inline-block', background: '#1e3a5f', color: '#93c5fd', padding: '2px 8px', borderRadius: 99, fontSize: 11, marginRight: 4, marginTop: 4 },
  history: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 },
  histBtn: { padding: '4px 10px', background: '#334155', color: '#94a3b8', border: 'none', borderRadius: 99, fontSize: 12, cursor: 'pointer' },
}

function Spinner() {
  return <div style={s.spinner}>⏳ Searching...</div>
}

function UserCard({ user }) {
  return (
    <div style={s.userCard}>
      <img src={user.avatar_url} alt={user.login} style={s.avatar} />
      <div style={{ flex: 1 }}>
        <p style={s.name}>{user.name || user.login}</p>
        <p style={s.login}>@{user.login}</p>
        {user.bio && <p style={s.bio}>{user.bio}</p>}
        <div style={{ marginTop: 6 }}>
          <span style={s.stat}>⭐ {user.public_repos} repos</span>
          <span style={{ ...s.stat, marginLeft: 12 }}>👥 {user.followers} followers</span>
        </div>
        {user.location && <p style={{ ...s.stat, marginTop: 4 }}>📍 {user.location}</p>}
      </div>
    </div>
  )
}

// Custom hook — splits concerns (fetch logic lives here, not in the component)
function useGitHubUser(query) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setUser(null)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    // AbortController: cancel the in-flight request if query changes before it completes
    const controller = new AbortController()

    // Debounce: wait 500ms before firing — reset timer on each keystroke
    const timer = setTimeout(() => {
      fetch(`https://api.github.com/users/${query.trim()}`, {
        signal: controller.signal,
      })
        .then(r => {
          if (r.status === 404) throw new Error(`User "${query}" not found`)
          if (!r.ok) throw new Error(`GitHub API error: ${r.status}`)
          return r.json()
        })
        .then(data => {
          setUser(data)
          setLoading(false)
        })
        .catch(err => {
          if (err.name === 'AbortError') return  // ignore — we aborted intentionally
          setError(err.message)
          setLoading(false)
        })
    }, 500)

    // Cleanup: runs before next effect + on unmount
    // Cancels both the debounce timer and any in-flight fetch
    return () => {
      clearTimeout(timer)
      controller.abort()
      setLoading(false)
    }
  }, [query]) // re-runs whenever query changes

  return { user, loading, error }
}

export default function Day4Example() {
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState(['torvalds', 'gaearon', 'sindresorhus'])
  const { user, loading, error } = useGitHubUser(query)

  // Effect 2: sync document title — separate concern, separate effect
  useEffect(() => {
    document.title = user ? `${user.login} — GitHub` : 'GitHub User Search'
    return () => { document.title = 'React Fundamentals' }
  }, [user])

  // Effect 3: save search to history when a user loads successfully
  useEffect(() => {
    if (!user) return
    setHistory(prev => {
      const next = [user.login, ...prev.filter(h => h !== user.login)]
      return next.slice(0, 5)
    })
  }, [user])

  return (
    <div style={s.card}>
      <input
        style={s.input}
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Enter a GitHub username..."
        autoFocus
      />

      {/* Recent searches */}
      {history.length > 0 && (
        <div style={s.history}>
          <span style={{ color: '#64748b', fontSize: 12, alignSelf: 'center' }}>Recent: </span>
          {history.map(h => (
            <button key={h} style={s.histBtn} onClick={() => setQuery(h)}>
              {h}
            </button>
          ))}
        </div>
      )}

      {/* Conditional rendering: loading / error / user / empty */}
      {loading && <Spinner />}
      {!loading && error && <div style={s.error}>⚠️ {error}</div>}
      {!loading && !error && user && <UserCard user={user} />}
      {!loading && !error && !user && query && (
        <div style={s.empty}>Type a GitHub username above</div>
      )}
      {!query && (
        <div style={s.empty}>
          <p style={{ marginBottom: 8 }}>Try: <code>torvalds</code>, <code>gaearon</code>, <code>sindresorhus</code></p>
          <p style={{ fontSize: 12, color: '#475569' }}>Search fires 500ms after you stop typing (debounced)</p>
          <p style={{ fontSize: 12, color: '#475569' }}>In-flight requests are cancelled when query changes (AbortController)</p>
        </div>
      )}
    </div>
  )
}
