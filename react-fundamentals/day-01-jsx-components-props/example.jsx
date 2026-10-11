/**
 * Day 1 — JSX, Components & Props
 *
 * A realistic UserCard component tree demonstrating:
 * - JSX syntax and rules
 * - Function components
 * - Props (primitives, objects, functions)
 * - Default props via destructuring defaults
 * - Fragment usage
 * - Component composition (small components building a bigger one)
 */

const styles = {
  card: {
    background: '#1e293b', border: '1px solid #334155', borderRadius: 12,
    padding: 20, maxWidth: 360, marginBottom: 16,
  },
  header: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 52, height: 52, borderRadius: '50%', objectFit: 'cover' },
  name: { fontWeight: 700, fontSize: 16, color: '#f1f5f9' },
  role: { color: '#94a3b8', fontSize: 13 },
  badge: {
    display: 'inline-block', padding: '2px 8px', borderRadius: 99,
    fontSize: 11, fontWeight: 600, marginRight: 6, marginBottom: 4,
  },
  btn: (variant) => ({
    padding: '8px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
    fontWeight: 600, fontSize: 13,
    background: variant === 'primary' ? '#3b82f6' : '#334155',
    color: '#fff',
    marginRight: 8,
  }),
  stat: { textAlign: 'center' },
  statNum: { fontWeight: 700, fontSize: 18, color: '#f1f5f9' },
  statLabel: { fontSize: 11, color: '#64748b' },
}

// --- Atomic components ---

function Avatar({ src, name, size = 52 }) {
  return (
    <img
      src={src || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`}
      alt={name}
      style={{ ...styles.avatar, width: size, height: size }}
    />
  )
}

function Badge({ label, color = '#1d4ed8', bg = '#1e3a5f' }) {
  return <span style={{ ...styles.badge, color, background: bg }}>{label}</span>
}

function StatItem({ value, label }) {
  return (
    <div style={styles.stat}>
      <div style={styles.statNum}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  )
}

// Props: variant controls visual style, onClick is a callback — same as passing a handler fn in Node
function ActionButton({ label, onClick, variant = 'secondary' }) {
  return (
    <button style={styles.btn(variant)} onClick={onClick}>
      {label}
    </button>
  )
}

// --- Composite component ---

function UserCard({ user, onFollow, onMessage }) {
  return (
    <div style={styles.card}>
      {/* Header: avatar + name/role */}
      <div style={styles.header}>
        <Avatar src={user.avatar} name={user.name} />
        <div>
          <p style={styles.name}>{user.name}</p>
          <p style={styles.role}>{user.role}</p>
        </div>
      </div>

      {/* Skills as badges */}
      <div style={{ marginBottom: 12 }}>
        {user.skills.map((skill) => (
          <Badge key={skill} label={skill} />
        ))}
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16,
                    padding: '12px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155' }}>
        <StatItem value={user.stats.repos} label="Repos" />
        <StatItem value={user.stats.followers} label="Followers" />
        <StatItem value={user.stats.following} label="Following" />
      </div>

      {/* Actions — functions passed as props, just like callbacks */}
      <div>
        <ActionButton label="Follow" variant="primary" onClick={() => onFollow(user.id)} />
        <ActionButton label="Message" onClick={() => onMessage(user.id)} />
      </div>
    </div>
  )
}

// --- Root example component ---

const USERS = [
  {
    id: 1,
    name: 'Priya Mehta',
    role: 'Senior Backend Engineer',
    avatar: null,
    skills: ['Node.js', 'PostgreSQL', 'Kubernetes'],
    stats: { repos: 42, followers: 318, following: 97 },
  },
  {
    id: 2,
    name: 'Alex Torres',
    role: 'Frontend Engineer',
    avatar: null,
    skills: ['React', 'TypeScript', 'GraphQL'],
    stats: { repos: 28, followers: 204, following: 61 },
  },
]

export default function Day1Example() {
  function handleFollow(userId) {
    alert(`Followed user ${userId}`)
  }
  function handleMessage(userId) {
    alert(`Message user ${userId}`)
  }

  return (
    // Fragment — no extra DOM node, satisfies "one root" rule
    <>
      <p style={{ color: '#64748b', marginBottom: 16, fontSize: 13 }}>
        UserCard component tree: Avatar + Badge + StatItem + ActionButton → UserCard → here
      </p>
      {USERS.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />
      ))}
    </>
  )
}
