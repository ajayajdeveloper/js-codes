import { useState } from 'react'

// Import each day's example — comment/uncomment to switch
import Day1 from '../day-01-jsx-components-props/exercise.jsx'
import Day2 from '../day-02-state-events-forms/exercise.jsx'
import Day3 from '../day-03-rendering/exercise.jsx'
import Day4 from '../day-04-useeffect/exercise.jsx'
import Day5 from '../day-05-refs-composition-children/exercise.jsx'
import Day6 from '../day-06-context-custom-hooks/exercise.jsx'
import Day7 from '../day-07-performance-and-patterns/example.jsx'

const days = [
  { label: 'Day 1 — JSX, Components, Props', component: Day1 },
  { label: 'Day 2 — State, Events, Forms',   component: Day2 },
  { label: 'Day 3 — Rendering & Lists',       component: Day3 },
  { label: 'Day 4 — useEffect',               component: Day4 },
  { label: 'Day 5 — Refs & Composition',      component: Day5 },
  { label: 'Day 6 — Context & Custom Hooks',  component: Day6 },
  { label: 'Day 7 — Performance & Patterns',  component: Day7 },
]

const styles = {
  sidebar: {
    width: 260, minHeight: '100vh', background: '#1e293b',
    padding: '24px 0', borderRight: '1px solid #334155', flexShrink: 0,
  },
  sidebarTitle: {
    fontSize: 13, fontWeight: 700, letterSpacing: 1,
    color: '#64748b', padding: '0 20px 16px', textTransform: 'uppercase',
  },
  btn: (active) => ({
    display: 'block', width: '100%', textAlign: 'left',
    padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: 13,
    background: active ? '#3b82f6' : 'transparent',
    color: active ? '#fff' : '#94a3b8',
    borderLeft: active ? '3px solid #60a5fa' : '3px solid transparent',
  }),
  main: { flex: 1, padding: 32, overflow: 'auto' },
  header: { fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: 24 },
}

export default function App() {
  const [active, setActive] = useState(0)
  const ActiveComponent = days[active].component

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={styles.sidebar}>
        <p style={styles.sidebarTitle}>React Fundamentals</p>
        {days.map((d, i) => (
          <button key={i} style={styles.btn(active === i)} onClick={() => setActive(i)}>
            {d.label}
          </button>
        ))}
      </aside>
      <main style={styles.main}>
        <p style={styles.header}>{days[active].label}</p>
        <ActiveComponent />
      </main>
    </div>
  )
}
