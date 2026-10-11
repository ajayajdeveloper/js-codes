/**
 * Day 4 — Exercise
 *
 * Build a debounced search with proper cleanup (~10 min)
 *
 * Requirements:
 * 1. A text input that the user types into
 * 2. useEffect that fires a "search" 400ms after the user stops typing (debounce)
 * 3. The search should simulate an API call (setTimeout inside the effect,
 *    filter a local array)
 * 4. Show a "Searching..." indicator while waiting
 * 5. Cleanup: cancel the pending timeout if the user types again before it fires
 * 6. If the input is cleared, reset results immediately (no delay)
 *
 * Bonus: Also cancel an in-flight "request" if the input changes — simulate
 * with a `cancelled` flag inside the effect.
 *
 * Key things to get right:
 * - Cleanup function must clear the timeout
 * - Dep array must list the query
 * - "Searching..." should disappear when results arrive
 *
 * Solution is in day-04-useeffect/README.md
 */
import { useState, useEffect } from 'react'

const TECHNOLOGIES = [
  'React', 'Redux', 'Relay', 'Recoil', 'Remix', 'Next.js',
  'Node.js', 'Express', 'NestJS', 'Fastify',
  'PostgreSQL', 'MongoDB', 'Redis', 'SQLite',
  'TypeScript', 'GraphQL', 'REST', 'tRPC',
]

export default function Day4Exercise() {

  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
      useEffect(() => {
        if (!query.trim()) {
          setResults([])
          setLoading(false)
          return
        }

      setLoading(true)

      const timer = setTimeout(() => {
        let filtered = TECHNOLOGIES.filter(tech => tech.toLowerCase().includes(query.toLowerCase()))
        setResults(filtered)
        setLoading(false)
      }, 400)

      return () => clearTimeout(timer)
      }, [query])
    
  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search technologies..."
      />
      {loading && <p>Searching...</p>}
      {!loading && query && results.length === 0 && <p>No match found</p>}
      <ul>
        {!loading && results.map(res => <li key={res}>{res}</li>)}
      </ul>
    </div>
  )
}
