# Day 3 — Interview Questions

---

**Q1: Why does React require keys on list items? What goes wrong without them?**

React's reconciler uses keys as stable identifiers to match elements across renders. Without keys, React falls back to positional matching (index-based). This causes problems when items are added, removed, or reordered:

- React re-creates components instead of reusing them → lost input state, lost focus, wasted DOM work
- Animations/transitions break
- In forms, the wrong input can end up showing the wrong value

The key should be a stable, unique value from your data (typically a DB id), not the array index.

---

**Q2: Why should you not use array index as a key?**

Index is a position, not an identity. When items shift positions (sort, filter, delete), the index changes. React thinks a new item appeared at that index and destroys/recreates the component. This resets local state and causes visible glitches. Only use index when: the list is static (never reorders), never filtered, never had items added/removed.

---

**Q3: What is the `&&` shortcircuit pattern and what is its common gotcha?**

`{condition && <Component />}` renders the component only when condition is truthy. The gotcha: JavaScript evaluates `0 && anything` as `0`, and React renders `0` (a number). So `{items.length && <List />}` renders `0` when the array is empty. Fix: use `{items.length > 0 && <List />}` or `{!!items.length && <List />}`.

---

**Q4: What triggers a re-render in React?**

Three things:
1. `setState` (or a hook that calls setState internally) is called on the component
2. A parent component re-renders (default behavior — child runs again)
3. A Context value the component subscribes to changes

Note: Props "changing" isn't a direct trigger — it's a consequence of the parent re-rendering with new values. `React.memo` can short-circuit #2 if props haven't changed (Day 7).

---

**Q5: What is reconciliation?**

Reconciliation is React's algorithm for diffing the previous virtual DOM tree against the new one (after a render) and computing the minimal set of real DOM operations to apply. It uses a heuristic O(n) algorithm instead of O(n³) general tree diff:

- Different element type → tear down and rebuild the whole subtree
- Same element type → update only changed attributes
- Lists → use keys to match elements

This is why React renders are fast even in large apps — most DOM work is skipped.
