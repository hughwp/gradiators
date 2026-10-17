const pageGraph = {
  home: [
    { to: 'transactions', label: 'FORWARD' },
    { to: 'pay', label: 'FORWARD' },
  ],
  transactions: [{ to: 'home', label: 'BACK' }],
  pay: [
    { to: 'result', label: 'FORWARD' },
    { to: 'home', label: 'BACK' },
  ],
  result: [
    { to: 'pay', label: 'BACK' },
    { to: 'home', label: 'BACK' },
  ],
}

export default pageGraph
