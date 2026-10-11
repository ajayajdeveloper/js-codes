/**
 * Day 7 — Exercise
 *
 * Fix a performance problem using React.memo + useCallback + useMemo (~10 min)
 *
 * The component below has a performance issue:
 * - A parent renders a list of 50 rows
 * - The parent also has an unrelated "theme" toggle
 * - Every time theme toggles, ALL 50 rows re-render (check the console)
 *
 * Your tasks:
 * 1. Wrap Row with React.memo so it only re-renders when its own props change
 * 2. Wrap handleDelete with useCallback so the reference stays stable
 * 3. Wrap the filtered + sorted list computation with useMemo
 * 4. Verify: theme toggle no longer causes rows to re-render (console shows nothing)
 *
 * After fixing, add console.log('Row rendered:', item.id) inside Row to verify.
 *
 * Solution is in day-07-performance-and-patterns/README.md
 */
import { useState, useMemo, useCallback, memo } from 'react'

const ITEMS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  score: Math.floor(Math.random() * 100),
}))

// TODO: wrap with React.memo
function Row({ item, onDelete }) {
  return (
    <div style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid #1e293b' }}>
      <span style={{ flex: 1, color: '#f1f5f9', fontSize: 13 }}>{item.name}</span>
      <span style={{ color: '#64748b', fontSize: 12, marginRight: 12 }}>score: {item.score}</span>
      <button onClick={() => onDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>×</button>
    </div>
  )
}

export default function Day7Exercise() {
  const [items, setItems] = useState(ITEMS)
  const [theme, setTheme] = useState('dark')
  const [query, setQuery] = useState('')

  // TODO: wrap with useCallback
  function handleDelete(id) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  // TODO: wrap with useMemo
  const filtered = items
    .filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.score - a.score)

  return (
    <div style={{ background: theme === 'dark' ? '#0f172a' : '#f1f5f9', padding: 20, borderRadius: 10, maxWidth: 480 }}>
      <p style={{ color: '#f59e0b', marginBottom: 12, fontSize: 13 }}>
        Open console — toggle theme and watch how many rows re-render. Then fix it.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#1e293b', color: '#f1f5f9', fontSize: 13 }}
          value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter..."
        />
        <button
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          style={{ padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', background: '#334155', color: '#fff', fontWeight: 600, fontSize: 12 }}
        >
          Toggle Theme
        </button>
      </div>
      {filtered.map(item => (
        <Row key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  )
}
