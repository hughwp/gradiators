# Graph Spec

Read the UI_Spec.md file and from the relations shown between the pages. Contruct a graph using JS data types. If the direction between pages is going forward. the edge should be labelled FORWARD. and if it's going back, it should be labelled BACK. Use the simplest but most effective data structure possible to do this.

## Implementation

- Location: src/data/pageGraph.js
- Data structure: an adjacency list — a plain object keyed by page name, where each value is an array of `{ to, label }` edges. This gives O(1) neighbor lookup per node, which is what a BFS needs to expand each node's neighbors efficiently.