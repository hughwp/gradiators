import { useState } from 'react'
import pageGraph from './data/pageGraph'
import { bfs } from './bfs'
import { traverseBuilder } from './traverseBuilder'

const PAGE_LABELS = {
  home: 'Home',
  transactions: 'Transactions',
  pay: 'Make a Payment',
  result: 'Payment Success / Failure',
}

function TraversePanel({ page, onNavigate }) {
  const [target, setTarget] = useState('home')
  const [path, setPath] = useState(null)
  const [running, setRunning] = useState(false)

  const go = () => {
    const found = bfs(pageGraph, page, target)
    setPath(found)
    if (!found) return
    setRunning(true)
    const traverse = traverseBuilder(found, onNavigate, {
      onDone: () => setRunning(false),
    })
    traverse()
  }

  return (
    <div className="traverse-panel">
      <div className="traverse-current">
        Current page: {PAGE_LABELS[page]}
      </div>
      <select
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        disabled={running}
      >
        {Object.entries(PAGE_LABELS).map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={go} disabled={running}>
        GO!
      </button>
      {path && (
        <ol className="traverse-path">
          {path.map((id) => (
            <li key={id} className={id === page ? 'current' : undefined}>
              {PAGE_LABELS[id]}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default TraversePanel
