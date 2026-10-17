import { useState } from 'react'
import pageGraph from './data/pageGraph'
import {
  Home as HomeIcon,
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import transactions from './data/transactions.json'
import user from './data/user.json'
import TraversePanel from './TraversePanel'
import Field from './Field'

const emptyPayment = {
  payeeName: '',
  sortCode: '',
  accountNumber: '',
  accountType: 'Personal',
}

const gbp = (n) => `£${n.toFixed(2)}`

function Button({ variant = 'primary', loading = false, disabled, children, ...props }) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <span className="spinner" aria-hidden="true" /> : children}
      {loading && <span className="sr-only">Loading</span>}
    </button>
  )
}

function HomePage({ onNavigate }) {
  return (
    <main className="home">
      <h1>Gradiators Banking</h1>
      <p>Welcome, {user.name}</p>
      <Button onClick={() => onNavigate('transactions')}>
        View Transactions
      </Button>
      <Button variant="secondary" onClick={() => onNavigate('pay')}>
        Make a Payment
      </Button>
    </main>
  )
}

function HomeButton({ onNavigate }) {
  return (
    <button
      className="icon-btn-square"
      aria-label="Home"
      onClick={() => onNavigate('home')}
    >
      <HomeIcon size={24} aria-hidden="true" />
    </button>
  )
}

function TransactionRow({ txn }) {
  const [open, setOpen] = useState(false)
  const Icon = txn.direction === 'in' ? ArrowDownLeft : ArrowUpRight
  return (
    <div className="txn-row-group">
      <button
        className="txn-row"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="txn-icon">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="txn-main">
          <div className="txn-name">{txn.merchantName}</div>
          <div className="txn-date">
            {new Date(txn.date).toLocaleDateString()}
          </div>
        </span>
        <span className={`txn-amount ${txn.direction}`}>
          {txn.direction === 'in' ? '+' : '−'}
          {gbp(txn.amount)}
        </span>
        <ChevronDown size={18} className="txn-chevron" aria-hidden="true" />
      </button>
      <div className={`txn-details-wrap${open ? ' open' : ''}`} inert={!open}>
        <div className="txn-details">
          <div>ID: {txn.id}</div>
          <div>Date: {new Date(txn.date).toLocaleString()}</div>
          <div>Merchant: {txn.merchantName}</div>
          <div>
            Amount: {txn.direction === 'in' ? '+' : '−'}
            {gbp(txn.amount)}
          </div>
          <div>Direction: {txn.direction === 'in' ? 'Paid in' : 'Paid out'}</div>
          <div>Reference: {txn.reference}</div>
        </div>
      </div>
    </div>
  )
}

function TransactionsPage({ onNavigate }) {
  const balance = transactions.reduce(
    (sum, t) => sum + (t.direction === 'in' ? t.amount : -t.amount),
    0,
  )
  return (
    <main className="txns">
      <div className="page-header">
        <div>
          <div className="balance-label">Current balance</div>
          <div className="balance">{gbp(balance)}</div>
        </div>
        <HomeButton onNavigate={onNavigate} />
      </div>
      <h2>Transactions</h2>
      <div className="card txn-list" style={{ padding: '0 16px' }}>
        {transactions.map((t) => (
          <TransactionRow key={t.id} txn={t} />
        ))}
      </div>
    </main>
  )
}

function validate(form) {
  const errors = {}
  if (!form.payeeName.trim()) errors.payeeName = 'Enter the payee name'
  if (!/^\d{6}$/.test(form.sortCode))
    errors.sortCode = 'Sort code must be 6 digits'
  if (!/^\d{8}$/.test(form.accountNumber))
    errors.accountNumber = 'Account number must be 8 digits'
  return errors
}

function PaymentPage({ onNavigate, onConfirm }) {
  const [form, setForm] = useState(emptyPayment)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  const submit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return
    setLoading(true)
    setTimeout(() => {
      onConfirm(form)
      onNavigate('result')
    }, 800)
  }

  return (
    <main className="pay">
      <div className="pay-home">
        <HomeButton onNavigate={onNavigate} />
      </div>
      <form className="pay-form" onSubmit={submit} noValidate>
        <h1>Make a Payment</h1>
        <Field
          id="payeeName"
          label="Payee name"
          value={form.payeeName}
          onChange={update('payeeName')}
          error={errors.payeeName}
          autoComplete="name"
        />
        <Field
          id="sortCode"
          label="Sort code"
          value={form.sortCode}
          onChange={update('sortCode')}
          error={errors.sortCode}
          inputMode="numeric"
          maxLength={6}
        />
        <Field
          id="accountNumber"
          label="Account number"
          value={form.accountNumber}
          onChange={update('accountNumber')}
          error={errors.accountNumber}
          inputMode="numeric"
          maxLength={8}
        />
        <div className="field">
          <label htmlFor="accountType">Business / Personal account</label>
          <select
            id="accountType"
            value={form.accountType}
            onChange={update('accountType')}
          >
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <Button type="submit" loading={loading}>
          CONFIRM PAYMENT
        </Button>
      </form>
    </main>
  )
}

function ResultPage({ payment, onNavigate }) {
  const success = payment.success
  const Icon = success ? CheckCircle2 : XCircle
  return (
    <main>
      <div style={{ textAlign: 'center' }}>
        <Icon
          size={64}
          className={`result-icon ${success ? 'success' : 'failure'}`}
        />
        <h1>{success ? 'Payment Successful' : 'Payment Failed'}</h1>
      </div>
      <div className="card">
        <div className="result-row">
          <span>Payee name</span>
          <span>{payment.payeeName}</span>
        </div>
        <div className="result-row">
          <span>Sort code</span>
          <span>{payment.sortCode}</span>
        </div>
        <div className="result-row">
          <span>Account number</span>
          <span>{payment.accountNumber}</span>
        </div>
        <div className="result-row">
          <span>Account type</span>
          <span>{payment.accountType}</span>
        </div>
      </div>
      <Button onClick={() => onNavigate('pay')}>Make Another Payment</Button>
      <Button variant="secondary" onClick={() => onNavigate('home')}>
        Return Home
      </Button>
    </main>
  )
}

// FORWARD/BACK label of the edge from -> to in the page graph.
const directionOf = (from, to) =>
  pageGraph[from]?.find((e) => e.to === to)?.label ?? 'FORWARD'

function App() {
  const [page, setPage] = useState('home')
  const [payment, setPayment] = useState(emptyPayment)
  // Screens currently rendered: the active one, plus the outgoing one mid-swipe.
  const [layers, setLayers] = useState([{ id: 0, page: 'home', anim: '' }])

  // Reads the current page from state rather than the closure, so it stays
  // correct when called later (e.g. from the traverse panel's timed steps).
  const navigate = (to) => {
    setPage(to)
    setLayers((ls) => {
      const current = ls[ls.length - 1]
      if (current.page === to) return ls
      const dir = directionOf(current.page, to) === 'BACK' ? 'back' : 'forward'
      return [
        { ...current, anim: `exit-${dir}` },
        { id: current.id + 1, page: to, anim: `enter-${dir}` },
      ]
    })
  }

  const confirmPayment = (form) => {
    setPayment({ ...form, success: Math.random() < 0.9 })
  }

  const renderPage = (p) => {
    if (p === 'transactions') return <TransactionsPage onNavigate={navigate} />
    if (p === 'pay')
      return (
        <PaymentPage
          onNavigate={navigate}
          onConfirm={confirmPayment}
        />
      )
    if (p === 'result')
      return <ResultPage payment={payment} onNavigate={navigate} />
    return <HomePage onNavigate={navigate} />
  }

  const onAnimationEnd = (layer) => (e) => {
    if (e.target !== e.currentTarget) return
    setLayers((ls) =>
      layer.anim.startsWith('exit')
        ? ls.filter((l) => l.id !== layer.id)
        : ls.map((l) => (l.id === layer.id ? { ...l, anim: '' } : l)),
    )
  }

  return (
    <>
      <TraversePanel page={page} onNavigate={navigate} />
      <div className="stage">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`screen ${layer.anim}`}
            inert={layer.anim.startsWith('exit')}
            onAnimationEnd={onAnimationEnd(layer)}
          >
            {renderPage(layer.page)}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
