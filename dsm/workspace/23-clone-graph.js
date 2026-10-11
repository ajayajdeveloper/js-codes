// ╔══════════════════════════════════════════════════════════╗
//   Problem 23: Clone Graph         [Medium]  [Graph/DFS/HashMap]
//   node coach.js problem 23  → guiding questions
//   node coach.js hint 23 1   → first hint (up to 3)
// ╚══════════════════════════════════════════════════════════╝

// PROBLEM ──────────────────────────────────────────────────
// Given a reference node in a connected, undirected graph, return
// a DEEP COPY (clone) of the graph. Each node has a value and a
// list of neighbors. The clone must be an entirely separate set
// of node objects — not references back into the original graph.
//
// Input:   adjList [[2,4],[1,3],[2,4],[1,3]]  (1-indexed neighbors)
//              1 —— 2
//              |    |
//              4 —— 3
// Output:  a new graph with the same structure, made of new nodes.

// THINK BEFORE CODING ──────────────────────────────────────
// • The graph can have CYCLES — a naive recursive copy without
//   tracking visited nodes will recurse forever. How do you avoid
//   re-cloning (or infinitely revisiting) a node you've already
//   cloned?
// • A Map from ORIGINAL node → CLONED node solves this: before
//   recursing into a node's neighbors, create its clone and store
//   it in the map immediately.
// • When you clone a node's neighbors, are you pushing ORIGINAL
//   node references or their CLONES?
// • What should happen if the input node is null?

// ── YOUR SOLUTION ──────────────────────────────────────────

class GraphNode {
  constructor(val, neighbors = []) { this.val = val; this.neighbors = neighbors; }
}
function buildGraph(adjList) {
  // adjList like [[2,4],[1,3],[2,4],[1,3]] (1-indexed, LeetCode style)
  const nodes = adjList.map((_, i) => new GraphNode(i + 1));
  adjList.forEach((neighbors, i) => { nodes[i].neighbors = neighbors.map(n => nodes[n - 1]); });
  return nodes[0] || null;
}
function graphToAdjList(node) {
  // BFS the graph, return adjacency list in the same [[...],[...]] shape, sorted by val, for comparison
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

function cloneGraph(node) {
  // your code here
}

// ── TESTS ──────────────────────────────────────────────────

const TESTS = [
  { args: [[[2, 4], [1, 3], [2, 4], [1, 3]]], expected: [[2, 4], [1, 3], [2, 4], [1, 3]] },
  { args: [[[]]], expected: [[]] },
  { args: [[]], expected: [] },
  { args: [[[2], [1]]], expected: [[2], [1]] },
  { args: [[[2, 3], [1, 3], [1, 2]]], expected: [[2, 3], [1, 3], [1, 2]] },
];

if (require.main === module) {
  let score = 0;
  TESTS.forEach(({ args, expected }, i) => {
    const originalRoot = buildGraph(args[0]);
    const clone = cloneGraph(originalRoot);
    const cloneAdjList = graphToAdjList(clone);
    const structureOk = JSON.stringify(cloneAdjList) === JSON.stringify(expected);
    const referenceOk = originalRoot === null ? clone === null : clone !== originalRoot;
    const ok = structureOk && referenceOk;
    score += ok ? 1 : 0;
    console.log(`Test ${i + 1}: ${ok ? '✅' : '❌'}  got ${JSON.stringify(cloneAdjList)}${referenceOk ? '' : '  (clone shares a reference with the original!)'}`);
  });
  console.log(`\n${score}/${TESTS.length} passed${score === TESTS.length ? ' 🎉' : ''}`);
  if (score < TESTS.length) process.exit(1);
}

module.exports = { cloneGraph, GraphNode, buildGraph, graphToAdjList, TESTS };
