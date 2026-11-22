import { useState } from 'react'
import { CATEGORIES } from '../constants'
import { todayISO } from '../utils/format'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200'

function createInitialState() {
  return {
    description: '',
    amount: '',
    category: CATEGORIES[0],
    date: todayISO(),
  }
}

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState(createInitialState)
  const [error, setError] = useState('')

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()

    const description = form.description.trim()
    const amount = Number.parseFloat(form.amount)

    if (!description) {
      setError('Description is required.')
      return
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Amount must be a number greater than zero.')
      return
    }

    onAdd({ ...form, description, amount })
    setForm({ ...createInitialState(), date: form.date })
    setError('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">Add expense</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="expense-description"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <input
            id="expense-description"
            type="text"
            value={form.description}
            onChange={update('description')}
            placeholder="e.g. Grocery run"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="expense-amount"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Amount (USD)
          </label>
          <input
            id="expense-amount"
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={update('amount')}
            placeholder="0.00"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="expense-category"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Category
          </label>
          <select
            id="expense-category"
            value={form.category}
            onChange={update('category')}
            className={inputClass}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="expense-date"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Date
          </label>
          <input
            id="expense-date"
            type="date"
            value={form.date}
            onChange={update('date')}
            className={inputClass}
          />
        </div>
      </div>

      {error ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 active:bg-slate-800 sm:w-auto"
      >
        Add expense
      </button>
    </form>
  )
}
