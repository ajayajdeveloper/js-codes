/**
 * Day 2 — State, Events & Forms
 *
 * A multi-step registration form demonstrating:
 * - useState with objects
 * - Controlled inputs
 * - Form validation
 * - Functional state updates
 * - Event handling patterns
 */
import { useState } from 'react'

const s = {
  card: { background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: 24, maxWidth: 440 },
  label: { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
  input: (hasError) => ({
    width: '100%', padding: '10px 12px', borderRadius: 6, border: `1px solid ${hasError ? '#ef4444' : '#334155'}`,
    background: '#0f172a', color: '#f1f5f9', fontSize: 14, outline: 'none', marginBottom: 4,
  }),
  error: { color: '#ef4444', fontSize: 12, marginBottom: 12 },
  btn: (disabled) => ({
    width: '100%', padding: '10px 0', borderRadius: 6, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? '#334155' : '#3b82f6', color: disabled ? '#64748b' : '#fff',
    fontWeight: 600, fontSize: 14, marginTop: 8,
  }),
  step: { color: '#64748b', fontSize: 12, marginBottom: 16 },
  success: { textAlign: 'center', padding: 32 },
}

const STEPS = ['Account', 'Profile', 'Review']

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
      {STEPS.map((step, i) => (
        <div key={step} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', margin: '0 auto 4px',
            background: i <= current ? '#3b82f6' : '#334155',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: i <= current ? '#fff' : '#64748b',
          }}>
            {i < current ? '✓' : i + 1}
          </div>
          <div style={{ fontSize: 11, color: i === current ? '#f1f5f9' : '#64748b' }}>{step}</div>
        </div>
      ))}
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={s.label}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={s.input(!!error)}
      />
      {error && <p style={s.error}>{error}</p>}
    </div>
  )
}

function validate(step, form) {
  const errors = {}
  if (step === 0) {
    if (!form.email.includes('@')) errors.email = 'Valid email required'
    if (form.password.length < 8) errors.password = 'Minimum 8 characters'
    if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match'
  }
  if (step === 1) {
    if (!form.name.trim()) errors.name = 'Name is required'
    if (!form.username.trim()) errors.username = 'Username is required'
  }
  return errors
}

export default function Day2Example() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // One state object for the whole form — updated generically via field name
  const [form, setForm] = useState({
    email: '', password: '', confirmPassword: '',
    name: '', username: '', bio: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    // Functional update: always based on latest state
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error for this field on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleNext(e) {
    e.preventDefault()
    const errs = validate(step, form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStep(prev => prev + 1)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={s.card}>
        <div style={s.success}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 18 }}>Account created!</p>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Welcome, {form.name}</p>
          <button style={{ ...s.btn(false), marginTop: 16 }} onClick={() => {
            setSubmitted(false)
            setStep(0)
            setForm({ email: '', password: '', confirmPassword: '', name: '', username: '', bio: '' })
          }}>
            Start over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={s.card}>
      <StepIndicator current={step} />

      {step === 0 && (
        <form onSubmit={handleNext}>
          <p style={s.step}>Step 1 of 3 — Account credentials</p>
          <Field label="Email" name="email" type="email" value={form.email}
                 onChange={handleChange} error={errors.email} placeholder="you@example.com" />
          <Field label="Password" name="password" type="password" value={form.password}
                 onChange={handleChange} error={errors.password} placeholder="Min 8 characters" />
          <Field label="Confirm Password" name="confirmPassword" type="password"
                 value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
          <button type="submit" style={s.btn(false)}>Next →</button>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleNext}>
          <p style={s.step}>Step 2 of 3 — Profile</p>
          <Field label="Full Name" name="name" value={form.name}
                 onChange={handleChange} error={errors.name} />
          <Field label="Username" name="username" value={form.username}
                 onChange={handleChange} error={errors.username} placeholder="@handle" />
          <Field label="Bio (optional)" name="bio" value={form.bio} onChange={handleChange} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" style={{ ...s.btn(false), background: '#334155' }}
                    onClick={() => setStep(0)}>← Back</button>
            <button type="submit" style={s.btn(false)}>Next →</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <p style={s.step}>Step 3 of 3 — Review</p>
          {[
            ['Email', form.email], ['Username', form.username],
            ['Name', form.name], ['Bio', form.bio || '—'],
          ].map(([label, val]) => (
            <div key={label} style={{ marginBottom: 10 }}>
              <span style={s.label}>{label}</span>
              <span style={{ color: '#f1f5f9' }}>{val}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="button" style={{ ...s.btn(false), background: '#334155' }}
                    onClick={() => setStep(1)}>← Back</button>
            <button type="submit" style={s.btn(false)}>Create Account</button>
          </div>
        </form>
      )}
    </div>
  )
}
