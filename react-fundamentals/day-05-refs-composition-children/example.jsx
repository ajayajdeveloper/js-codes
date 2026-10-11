/**
 * Day 5 — useRef + Composition + Children
 *
 * Demonstrates:
 * - useRef for DOM access (focus, scroll)
 * - useRef for mutable values (interval ID, render count)
 * - Contrast: useRef vs useState
 * - children prop
 * - Named slots (header/footer/children)
 * - Modal built purely with composition
 */
import { useState, useRef, useEffect } from 'react'

const s = {
  section: { marginBottom: 32 },
  h2: { color: '#93c5fd', fontSize: 14, fontWeight: 700, marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' },
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 10, padding: 20, marginBottom: 16 },
  input: { padding: '8px 12px', borderRadius: 6, border: '1px solid #334155', background: '#0f172a', color: '#f1f5f9', fontSize: 14, width: '100%', marginBottom: 8 },
  btn: (v = 'primary') => ({
    padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, marginRight: 8,
    background: v === 'primary' ? '#3b82f6' : v === 'danger' ? '#dc2626' : '#334155',
    color: '#fff',
  }),
  badge: { display: 'inline-block', background: '#1e3a5f', color: '#93c5fd', padding: '2px 8px', borderRadius: 4, fontSize: 12, marginLeft: 8 },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal: { background: '#1e293b', borderRadius: 12, width: 400, maxWidth: '90vw', border: '1px solid #334155', overflow: 'hidden' },
  modalHeader: { padding: '16px 20px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalBody: { padding: 20 },
  modalFooter: { padding: '12px 20px', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'flex-end', gap: 8 },
}

// ── DEMO 1: useRef for DOM access ──────────────────────────────────────────

function FocusDemo() {
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [items] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`))

  return (
    <div style={s.card}>
      <p style={s.h2}>DOM Refs</p>
      <input ref={inputRef} style={s.input} placeholder="I can be focused programmatically" />
      <button style={s.btn()} onClick={() => inputRef.current?.focus()}>
        Focus Input
      </button>
      <div style={{ maxHeight: 120, overflow: 'auto', marginTop: 12, background: '#0f172a', borderRadius: 6, padding: 8 }} ref={listRef}>
        {items.map(i => <div key={i} style={{ padding: '4px 0', color: '#94a3b8', fontSize: 13 }}>{i}</div>)}
      </div>
      <button style={{ ...s.btn('secondary'), marginTop: 8 }}
              onClick={() => listRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
        Scroll to Top
      </button>
    </div>
  )
}

// ── DEMO 2: useRef for mutable values (render count + interval) ────────────

function RefVsStateDemo() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)          // does NOT trigger re-render
  const renderCount = useRef(0)

  renderCount.current++  // increment on every render — no re-render caused

  return (
    <div style={s.card}>
      <p style={s.h2}>useRef vs useState</p>
      <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
        This component has rendered <span style={s.badge}>{renderCount.current} times</span>
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
          <p style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>useState — triggers re-render</p>
          <p style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{stateCount}</p>
          <button style={s.btn()} onClick={() => setStateCount(c => c + 1)}>
            Increment (re-renders)
          </button>
        </div>
        <div style={{ background: '#0f172a', borderRadius: 8, padding: 16 }}>
          <p style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>useRef — no re-render</p>
          <p style={{ color: '#94a3b8', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
            {refCount.current} <span style={{ fontSize: 12 }}>(stale in UI)</span>
          </p>
          <button style={s.btn('secondary')} onClick={() => { refCount.current++; console.log('ref:', refCount.current) }}>
            Increment (check console)
          </button>
        </div>
      </div>
    </div>
  )
}

// ── DEMO 3: children + named slots (Modal) ────────────────────────────────

// Reusable Panel with named slots
function Panel({ title, actions, children }) {
  return (
    <div style={{ border: '1px solid #334155', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
      <div style={{ background: '#0f172a', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: '#f1f5f9', fontSize: 14 }}>{title}</span>
        {actions && <div>{actions}</div>}
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  )
}

// Modal built from composition
function Modal({ title, onClose, children, footer }) {
  // Close on overlay click
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  // Close on Escape key
  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div style={s.overlay} onClick={handleOverlayClick}>
      <div style={s.modal}>
        <div style={s.modalHeader}>
          <span style={{ fontWeight: 700, color: '#f1f5f9' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 20 }}>×</button>
        </div>
        <div style={s.modalBody}>{children}</div>
        {footer && <div style={s.modalFooter}>{footer}</div>}
      </div>
    </div>
  )
}

function CompositionDemo() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div style={s.card}>
      <p style={s.h2}>Children & Composition</p>

      <Panel
        title="Server Status"
        actions={<span style={{ ...s.badge, background: '#064e3b', color: '#6ee7b7' }}>● Online</span>}
      >
        <p style={{ color: '#94a3b8', fontSize: 13 }}>Uptime: 99.98% · Latency: 12ms · Region: us-east-1</p>
      </Panel>

      <Panel
        title="Deployment"
        actions={<button style={s.btn()} onClick={() => setModalOpen(true)}>Deploy</button>}
      >
        <p style={{ color: '#94a3b8', fontSize: 13 }}>Last deploy: 2 hours ago · Branch: main · Build: #247</p>
      </Panel>

      {modalOpen && (
        <Modal
          title="Confirm Deployment"
          onClose={() => setModalOpen(false)}
          footer={
            <>
              <button style={s.btn('secondary')} onClick={() => setModalOpen(false)}>Cancel</button>
              <button style={s.btn('danger')} onClick={() => { alert('Deployed!'); setModalOpen(false) }}>
                Deploy to Production
              </button>
            </>
          }
        >
          <p style={{ color: '#f1f5f9', marginBottom: 8 }}>You are about to deploy <strong>main</strong> to production.</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>This will affect all users. Are you sure?</p>
        </Modal>
      )}
    </div>
  )
}

export default function Day5Example() {
  return (
    <div style={{ maxWidth: 560 }}>
      <FocusDemo />
      <RefVsStateDemo />
      <CompositionDemo />
    </div>
  )
}
