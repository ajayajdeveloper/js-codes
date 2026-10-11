/**
 * Day 7 — Performance & Patterns
 *
 * Demonstrates:
 * - React.memo preventing unnecessary child re-renders
 * - useMemo for expensive computations
 * - useCallback for stable callback references
 * - Lifting state up pattern
 * - Container / Presentational split
 * - Render counter to visualize re-renders
 */
import { useState, useMemo, useCallback, memo, useRef } from 'react'

const s = {
  section: { marginBottom: 28 },
  h2: { color: '#93c5fd', fontSize: 13, fontWeight: 700, marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' },
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: 20, marginBottom: 12 },
  btn: (v = 'primary') => ({
    padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12, marginRight: 8,
    background: v === 'primary' ? '#3b82f6' : v === 'warn' ? '#d97706' : '#334155', color: '#fff',
  }),
  input: { padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 13, width: '100%', marginBottom: 10 },
  renderBadge: (count) => ({
    display: 'inline-block', padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 700, marginLeft: 8,
    background: count > 3 ? '#450a0a' : '#064e3b',
    color: count > 3 ? '#fca5a5' : '#6ee7b7',
  }),
  tag: { display: 'inline-block', background: '#1e3a5f', color: '#93c5fd', padding: '2px 8px', borderRadius: 4, fontSize: 11, marginRight: 4 },
}

// Render counter utility
function useRenderCount() {
  const count = useRef(0)
  count.current++
  return count.current
}

// ── DEMO 1: React.memo + useCallback ─────────────────────────────────────

// WITHOUT memo — uncomment to see the difference
// function ExpensiveRow({ item, onDelete }) {

// WITH memo — skips re-render when item and onDelete haven't changed
const ExpensiveRow = memo(function ExpensiveRow({ item, onDelete }) {
  const renders = useRenderCount()
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #1e293b' }}>
      <span style={{ flex: 1, color: '#f1f5f9', fontSize: 13 }}>{item.name}</span>
      <span style={s.renderBadge(renders)}>renders: {renders}</span>
      <button style={{ ...s.btn('warn'), marginLeft: 8, marginRight: 0 }} onClick={() => onDelete(item.id)}>
        ×
      </button>
    </div>
  )
})

function generateItems(n) {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    name: `Task ${i + 1}: ${['Fix bug', 'Write test', 'Review PR', 'Update docs', 'Deploy'][i % 5]}`,
    category: ['frontend', 'backend', 'devops'][i % 3],
  }))
}

function MemoDemo() {
  const [items, setItems] = useState(() => generateItems(8))
  const [unrelated, setUnrelated] = useState(0)
  const renders = useRenderCount()

  // useCallback: stable reference — memo'd rows won't re-render when parent renders
  const handleDelete = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  return (
    <div style={s.card}>
      <p style={s.h2}>React.memo + useCallback</p>
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>
        Parent renders: <strong style={{ color: '#f1f5f9' }}>{renders}</strong>
        {' '} — click "Unrelated Update" to trigger parent re-render without changing items
      </p>
      <div style={{ marginBottom: 12 }}>
        <button style={s.btn()} onClick={() => setUnrelated(c => c + 1)}>
          Unrelated Update ({unrelated})
        </button>
        <button style={s.btn('secondary')} onClick={() => setItems(generateItems(8))}>
          Reset
        </button>
      </div>
      <p style={{ color: '#64748b', fontSize: 11, marginBottom: 8 }}>
        Rows memo'd with React.memo + useCallback: renders stay at 1 on unrelated updates
      </p>
      {items.map(item => (
        <ExpensiveRow key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  )
}

// ── DEMO 2: useMemo for expensive computation ─────────────────────────────

// Simulate slow operation
function expensiveFilter(items, query) {
  const start = performance.now()
  while (performance.now() - start < 2) {}  // artificial 2ms delay per call
  return items.filter(i =>
    i.name.toLowerCase().includes(query.toLowerCase()) ||
    i.category.includes(query.toLowerCase())
  )
}

const BIG_LIST = generateItems(200)

function MemoComputeDemo() {
  const [query, setQuery] = useState('')
  const [accent, setAccent] = useState('#3b82f6')
  const renders = useRenderCount()

  // useMemo: only recomputes when query changes, not when accent changes
  const filtered = useMemo(() => expensiveFilter(BIG_LIST, query), [query])

  return (
    <div style={s.card}>
      <p style={s.h2}>useMemo — expensive computation</p>
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>
        200 items, 2ms artificial delay per filter · Component renders: {renders}
      </p>
      <input style={s.input} value={query} onChange={e => setQuery(e.target.value)} placeholder="Filter items (watch: only runs on query change)" />
      <div style={{ marginBottom: 8 }}>
        {['#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map(c => (
          <button key={c} style={{ ...s.btn(), background: c, width: 28, height: 28, padding: 0, marginRight: 6 }}
                  onClick={() => setAccent(c)} />
        ))}
        <span style={{ color: '#64748b', fontSize: 11 }}>← changing accent re-renders but does NOT recompute filter</span>
      </div>
      <div style={{ maxHeight: 160, overflow: 'auto', borderTop: '1px solid #334155', paddingTop: 8 }}>
        {filtered.slice(0, 20).map(i => (
          <div key={i.id} style={{ padding: '4px 0', color: '#94a3b8', fontSize: 12, borderBottom: '1px solid #1e293b' }}>
            <span style={{ ...s.tag, background: accent + '22', color: accent }}>{i.category}</span>
            {i.name}
          </div>
        ))}
        {filtered.length > 20 && <p style={{ color: '#64748b', fontSize: 11, marginTop: 4 }}>+{filtered.length - 20} more</p>}
      </div>
      <p style={{ color: '#64748b', fontSize: 11, marginTop: 8 }}>{filtered.length} of {BIG_LIST.length} items</p>
    </div>
  )
}

// ── DEMO 3: Lifting State Up ───────────────────────────────────────────────

// Siblings communicate via shared parent state
function AmountInput({ value, onChange, label }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: 'block', fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</label>
      <input
        type="number"
        style={{ ...s.input, marginBottom: 0, width: 140 }}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        min="0"
      />
    </div>
  )
}

function TotalDisplay({ budget, spent }) {
  const remaining = budget - spent
  const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0
  const over = remaining < 0

  return (
    <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: over ? '#ef4444' : '#6ee7b7', fontWeight: 700 }}>
          {over ? `Over by $${Math.abs(remaining)}` : `$${remaining} remaining`}
        </span>
        <span style={{ color: '#64748b', fontSize: 12 }}>{pct.toFixed(0)}% used</span>
      </div>
      <div style={{ height: 6, background: '#334155', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: over ? '#ef4444' : '#3b82f6', transition: 'width 0.2s' }} />
      </div>
    </div>
  )
}

function LiftingStateDemo() {
  // State lives here — both children read from same source of truth
  const [budget, setBudget] = useState(1000)
  const [spent, setSpent] = useState(650)

  return (
    <div style={s.card}>
      <p style={s.h2}>Lifting State Up</p>
      <p style={{ color: '#64748b', fontSize: 12, marginBottom: 12 }}>
        Both inputs + the display share state from their common parent
      </p>
      <AmountInput label="Monthly Budget ($)" value={budget} onChange={setBudget} />
      <AmountInput label="Amount Spent ($)" value={spent} onChange={setSpent} />
      <TotalDisplay budget={budget} spent={spent} />
    </div>
  )
}

export default function Day7Example() {
  return (
    <div style={{ maxWidth: 560 }}>
      <MemoDemo />
      <MemoComputeDemo />
      <LiftingStateDemo />
    </div>
  )
}
