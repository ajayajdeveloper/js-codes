// ⚠️  SPOILERS — Attempt workspace/23-clone-graph.js first!
// ════════════════════════════════════════════════════════════
//  Solution: Clone Graph
// ════════════════════════════════════════════════════════════

class GraphNode {
  constructor(val, neighbors = []) { this.val = val; this.neighbors = neighbors; }
}
function buildGraph(adjList) {
  const nodes = adjList.map((_, i) => new GraphNode(i + 1));
  adjList.forEach((neighbors, i) => { nodes[i].neighbors = neighbors.map(n => nodes[n - 1]); });
  return nodes[0] || null;
}
function graphToAdjList(node) {
  if (!node) return [];
  const visited = new Map();
  const queue = [node];
  visited.set(node.val, node);
  while (queue.length) {
    const cur = queue.shift();
    for (const n of cur.neighbors) {
      if (!visited.has(n.val)) { visited.set(n.val, n); queue.push(n); }
    }
  }
  const maxVal = Math.max(...visited.keys());
  const result = [];
  for (let v = 1; v <= maxVal; v++) {
    const n = visited.get(v);
    result.push(n.neighbors.map(nb => nb.val).sort((a, b) => a - b));
  }
  return result;
}

// ── BRUTE FORCE ──────────────────────── O(V + E) time  O(V) space
// BFS with a Map from original → clone. Create the root's clone
// first, enqueue the original root, and for each original node
// dequeued, walk its neighbors: clone any neighbor not seen yet
// and link it in, using the map to avoid infinite loops on cycles.
function cloneGraphBrute(node) {
  if (!node) return null;
  const map = new Map();
  map.set(node, new GraphNode(node.val));
  const queue = [node];
  while (queue.length) {
    const cur = queue.shift();
    for (const neighbor of cur.neighbors) {
      if (!map.has(neighbor)) {
        map.set(neighbor, new GraphNode(neighbor.val));
        queue.push(neighbor);
      }
      map.get(cur).neighbors.push(map.get(neighbor));
    }
  }
  return map.get(node);
}

// ── OPTIMAL ──────────────────────────── O(V + E) time  O(V) space
// DFS with the same original→clone Map. Check the map FIRST thing
// in the recursion — that's what breaks cycles: if we're already
// in the middle of cloning a node (it's in the map), we return its
// (possibly still-being-filled-in) clone instead of recursing again.
function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();

  function dfs(n) {
    if (map.has(n)) return map.get(n);
    const copy = new GraphNode(n.val);
    map.set(n, copy);
    copy.neighbors = n.neighbors.map(dfs);
    return copy;
  }

  return dfs(node);
}

// ── KEY INSIGHT ──────────────────────────────────────────────
// The Map must be keyed by the ORIGINAL node and store its CLONE,
// and a node's entry must be added to the map BEFORE recursing
// into its neighbors — otherwise a cycle back to that node would
// recurse forever instead of finding the in-progress clone.

// ── TRADE-OFFS ───────────────────────────────────────────────
// BFS and DFS both visit every node and edge exactly once — same
// O(V + E) complexity. DFS is slightly more compact to write
// recursively; BFS avoids recursion depth concerns on very deep
// or wide graphs.
