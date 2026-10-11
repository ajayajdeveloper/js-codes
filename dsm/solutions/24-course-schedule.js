// ⚠️  SPOILERS — Attempt workspace/24-course-schedule.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Course Schedule
// ════════════════════════════════════════════════════════════

// ── BRUTE FORCE ──────────────────────── O(V·(V+E)) time  O(V + E) space
// DFS-based cycle detection with a 3-color scheme: 0 = unvisited,
// 1 = currently in the recursion stack ("visiting"), 2 = fully
// processed ("done"). Re-entering a node that's still "visiting"
// means we looped back on ourselves — a cycle.
function canFinishBrute(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [course, pre] of prerequisites) adj[pre].push(course);

  const state = new Array(numCourses).fill(0); // 0=unvisited 1=visiting 2=done

  function hasCycle(course) {
    if (state[course] === 1) return true;
    if (state[course] === 2) return false;
    state[course] = 1;
    for (const next of adj[course]) {
      if (hasCycle(next)) return true;
    }
    state[course] = 2;
    return false;
  }

  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) return false;
  }
  return true;
}

// ── OPTIMAL ──────────────────────────── O(V + E) time  O(V + E) space
// Kahn's algorithm (BFS topological sort). Build an adjacency list
// and an in-degree count per course. Seed a queue with every course
// that has no prerequisites. Process the queue: each time a course
// is "taken", decrement its dependents' in-degrees, and enqueue any
// that just reached 0. If every course gets processed, there's no
// cycle; if some are left stranded (in-degree never hits 0), there
// is one.
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    indegree[course]++;
  }

  const queue = [];
  for (let course = 0; course < numCourses; course++) {
    if (indegree[course] === 0) queue.push(course);
  }

  let visited = 0;
  while (queue.length) {
    const cur = queue.shift();
    visited++;
    for (const next of adj[cur]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }

  return visited === numCourses;
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// "Can all courses finish" is exactly "does this directed graph
// have a valid topological order", which is exactly "is this
// directed graph acyclic". Kahn's BFS and DFS 3-coloring are two
// equivalent ways to detect a cycle.

// ── TRADE-OFFS ───────────────────────────────────────────────
// DFS 3-coloring is often more intuitive to reason about ("am I
// revisiting a node still on my current path?"). Kahn's BFS avoids
// deep recursion on large graphs and naturally produces the actual
// topological order as a side effect, which is useful if you need
// the course ORDER, not just a yes/no answer.
