/**
 * Day 3 — Rendering, Lists & Conditionals
 *
 * A task manager demonstrating:
 * - .map() over arrays to produce JSX
 * - Keys with stable IDs
 * - Conditional rendering (loading, empty, data states)
 * - Filtering lists
 * - The `&&` shortcircuit and ternary patterns
 */
import { useState } from 'react'

const s = {
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24, maxWidth: 520 },
  filterRow: { display: 'flex', gap: 8, marginBottom: 20 },
  filterBtn: (active) => ({
    padding: '6px 14px', borderRadius: 99, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
    background: active ? '#3b82f6' : '#334155', color: active ? '#fff' : '#94a3b8',
  }),
  taskItem: (done) => ({
    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
    borderBottom: '1px solid #1e293b', opacity: done ? 0.5 : 1,
  }),
  checkbox: { width: 18, height: 18, cursor: 'pointer', accentColor: '#3b82f6' },
  taskText: (done) => ({
    flex: 1, textDecoration: done ? 'line-through' : 'none', color: done ? '#64748b' : '#f1f5f9',
  }),
  badge: (priority) => {
    const map = { high: ['#fca5a5', '#450a0a'], medium: ['#fcd34d', '#451a03'], low: ['#6ee7b7', '#064e3b'] }
    const [color, bg] = map[priority] || map.low
    return { color, background: bg, padding: '2px 8px', borderRadius: 99, fontSize: 11, fontWeight: 600 }
  },
  addRow: { display: 'flex', gap: 8, marginBottom: 20 },
  input: { flex: 1, padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 14 },
  btn: { padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', background: '#3b82f6', color: '#fff', fontWeight: 600 },
  empty: { textAlign: 'center', padding: 32, color: '#64748b' },
  stats: { display: 'flex', gap: 16, marginBottom: 20, fontSize: 13, color: '#64748b' },
}

const INITIAL_TASKS = [
  { id: 1, text: 'Set up Vite project', done: true, priority: 'high' },
  { id: 2, text: 'Read Day 1 README', done: true, priority: 'high' },
  { id: 3, text: 'Build UserCard exercise', done: false, priority: 'medium' },
  { id: 4, text: 'Read Day 2 README', done: false, priority: 'high' },
  { id: 5, text: 'Practice useState patterns', done: false, priority: 'medium' },
  { id: 6, text: 'Do Day 2 exercise', done: false, priority: 'low' },
]

let nextId = INITIAL_TASKS.length + 1

const FILTERS = ['all', 'active', 'done']

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={s.taskItem(task.done)}>
      <input
        type="checkbox"
        style={s.checkbox}
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span style={s.taskText(task.done)}>{task.text}</span>
      {/* Conditional rendering with && — only show badge if priority exists */}
      {task.priority && <span style={s.badge(task.priority)}>{task.priority}</span>}
      <button
        onClick={() => onDelete(task.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 18 }}
      >
        ×
      </button>
    </div>
  )
}

function EmptyState({ filter }) {
  const messages = {
    all: { icon: '✅', text: 'No tasks yet. Add one above!' },
    active: { icon: '🎉', text: 'All tasks are complete!' },
    done: { icon: '📝', text: 'No completed tasks yet.' },
  }
  const { icon, text } = messages[filter]
  return (
    <div style={s.empty}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <p>{text}</p>
    </div>
  )
}

export default function Day3Example() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('all')
  const [newText, setNewText] = useState('')

  function addTask(e) {
    e.preventDefault()
    if (!newText.trim()) return
    setTasks(prev => [
      ...prev,
      { id: nextId++, text: newText.trim(), done: false, priority: 'medium' }
    ])
    setNewText('')
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // Filter without mutating state
  const filtered = filter === 'all'
    ? tasks
    : filter === 'active'
    ? tasks.filter(t => !t.done)
    : tasks.filter(t => t.done)

  const doneCount = tasks.filter(t => t.done).length

  return (
    <div style={s.card}>
      {/* Add task form */}
      <form onSubmit={addTask} style={s.addRow}>
        <input
          style={s.input}
          value={newText}
          onChange={e => setNewText(e.target.value)}
          placeholder="Add a task..."
        />
        <button type="submit" style={s.btn}>Add</button>
      </form>

      {/* Stats — conditional rendering with ternary */}
      <div style={s.stats}>
        <span>{tasks.length} total</span>
        <span>·</span>
        <span>{doneCount} done</span>
        <span>·</span>
        <span>{tasks.length - doneCount} remaining</span>
        {/* Only show clear button when there are done tasks */}
        {doneCount > 0 && (
          <button
            onClick={() => setTasks(prev => prev.filter(t => !t.done))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 12, marginLeft: 'auto' }}
          >
            Clear done
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={s.filterRow}>
        {FILTERS.map(f => (
          <button key={f} style={s.filterBtn(filter === f)} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task list — key uses stable id, not index */}
      <div>
        {filtered.length === 0
          ? <EmptyState filter={filter} />
          : filtered.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
        }
      </div>
    </div>
  )
}
