# Day 4 — useEffect Interview Questions

---

**Q1: Explain the useEffect dependency array. What does each form mean?**

- **No array**: runs after every render. Rarely useful, often a mistake.
- **Empty `[]`**: runs once after mount. Equivalent to `componentDidMount`.
- **`[a, b]`**: runs after mount + after any render where `a` or `b` have changed (using `Object.is` comparison).

The rule: any value from component scope that the effect reads must be listed. Omitting deps causes stale closures. Adding false deps causes unnecessary re-runs. The ESLint `exhaustive-deps` rule catches this.

---

**Q2: What is a stale closure in useEffect? Give an example.**

A stale closure is when an effect captures a value from a render but that value is updated in later renders while the effect still references the old one.

```jsx
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1) // count is fixed at the value when this effect ran
  }, 1000)
  return () => clearInterval(id)
}, []) // missing count dep — stale
```

Every tick reads the initial `count = 0`. Fix: use `setCount(prev => prev + 1)` so the effect doesn't need to read `count` at all.

---

**Q3: When does the cleanup function run? Why does it matter?**

Cleanup runs:
1. **Before the next execution** of the same effect (when deps changed)
2. **When the component unmounts**

It matters because effects often set up subscriptions, timers, or requests. Without cleanup: the old timer keeps firing after unmount (memory leak + "can't update state on unmounted component" warning), old fetch responses update state after the component is gone, old WebSocket listeners pile up.

Think of it like `server.close()` — you opened a resource, you own closing it.

---

**Q4: How do you fetch data in a useEffect correctly?**

```jsx
useEffect(() => {
  const controller = new AbortController()
  let cancelled = false

  setLoading(true)
  fetch(`/api/items/${id}`, { signal: controller.signal })
    .then(r => r.json())
    .then(data => { if (!cancelled) { setData(data); setLoading(false) } })
    .catch(err => { if (err.name !== 'AbortError' && !cancelled) setError(err) })

  return () => { cancelled = true; controller.abort() }
}, [id])
```

Key points: AbortController cancels the network request, `cancelled` flag prevents state updates after unmount, error handling ignores AbortError.

---

**Q5: What is React 18's StrictMode double-mount behavior? How do you handle it?**

In development, React 18 StrictMode intentionally mounts every component twice (mount → unmount → remount) to expose effects that don't clean up properly. You'll see effects run twice in dev.

This is not a bug — it's a correctness check. If your app breaks on double-mount, it means your cleanup is incomplete. Fix the cleanup, not the effect. In production, effects run once normally.

Common patterns that break: fetch without AbortController (two requests fire), setInterval without clearInterval (two intervals running), addEventListener without removeEventListener.
