// Breadth-first search over an adjacency-list graph (see data/pageGraph.js).
// Returns the sequence of nodes from start to target, inclusive, or null if unreachable.
export function bfs(graph, start, target) {
  if (start === target) return [start]

  const visited = new Set([start])
  const queue = [[start]]

  while (queue.length) {
    const path = queue.shift()
    const node = path[path.length - 1]

    for (const { to } of graph[node] || []) {
      if (visited.has(to)) continue
      const nextPath = [...path, to]
      if (to === target) return nextPath
      visited.add(to)
      queue.push(nextPath)
    }
  }

  return null
}
