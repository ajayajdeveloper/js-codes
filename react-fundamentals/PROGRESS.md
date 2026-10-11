# React Interview Prep — Progress Snapshot

_Last checked: 2026-09-09_

How this was determined: `src/App.jsx` wires each day's slot to either `exercise.jsx` (attempted) or `example.jsx` (not yet attempted) — that's the reliable progress marker, not `interview-checklist.md` (its checkboxes stay unticked regardless of actual progress).

---

## ✅ Covered (hand-built, not copy-pasted from the solution)

| Day | Topic | Exercise built |
|---|---|---|
| 1 | JSX, Components & Props | `ProfileBadge` — avatar/initials fallback, online dot, callback prop |
| 2 | State, Events & Forms | `SearchableList` — controlled input, live filter, clear button |
| 3 | Rendering: Lists, Keys & Conditionals | Filterable product list — category filter, stock state, empty state |
| 4 | useEffect | Debounced search — 400ms debounce, cleanup on retype (stale-request `cancelled` guard bonus was skipped) |
| 5 | useRef vs useState & Composition | Stopwatch — interval ID in `useRef`, elapsed time in `useState` |
| 6 | Context API & Custom Hooks | Theme switcher — `ThemeContext`, `ThemeProvider`, `useTheme()` hook |

Each of these days also has a `README.md` (concept notes) and `interview-qs.md` (day-specific Q&A) worth a quick re-skim before an interview even though the exercise is done.

---

## 🔲 Yet to cover

### Day 7 — Performance & Patterns (not started)
Still points at `example.jsx` in `App.jsx`. This is the last day in the curriculum:
- `React.memo`, when shallow-comparison bails it out
- `useMemo` vs `useCallback` — what each actually memoizes
- When memoization is *not* worth it
- Lifting state up
- Container/presentational component pattern
- Re-render triggers recap (own state / parent re-render / context change)
- Bridging the Node event-loop mental model to React's rendering model
- Exercise: fix a 50-row list re-rendering on an unrelated theme toggle (`React.memo` + `useCallback` + `useMemo`)

### Bonus topics (in `interview-checklist.md`, not covered by any day's README)
These are called out explicitly as "things interviewers love to ask" but have no dedicated day/exercise:
- Virtual DOM, explained precisely
- Reconciliation algorithm (diffing, fiber, keys) at a deeper level than Day 3's overview
- Higher-Order Components (HOCs)
- Render props pattern
- `useEffect` vs `useLayoutEffect`
- Optimistic UI updates
- Code splitting (`React.lazy` + `Suspense`)

### Not in this curriculum at all (common in React interviews, worth a gap-check)
- Routing (React Router — dynamic routes, nested routes, guards)
- State management beyond Context (Redux/Zustand/Recoil — when Context isn't enough)
- Data fetching libraries (React Query/SWR) vs raw `useEffect`
- Testing (React Testing Library, mocking hooks/fetch)
- TypeScript with React (typing props, hooks, generics on components)
- Server-side rendering / Next.js basics (hydration, RSC vs client components)
- Accessibility basics (semantic HTML, ARIA, focus management)
- Build tooling awareness (Vite/webpack, bundle splitting) — light exposure only via this repo's `vite.config.js`

---

## Suggested next steps
1. Finish Day 7 exercise + README (~30–45 min, matches the pace of prior days).
2. Sweep `interview-checklist.md` — self-rate green/yellow/red per topic, redo any day whose exercise isn't green.
3. Pick 2–3 "not in this curriculum" gaps above based on the actual job description/interview loop and do a focused pass (these don't need full days — a README skim + one small example each is enough).
