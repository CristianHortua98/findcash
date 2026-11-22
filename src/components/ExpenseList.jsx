import { useMemo, useState } from 'react'
import { CATEGORIES } from '../constants'
import { formatCurrency, formatDate } from '../utils/format'

const BADGE_COLORS = {
  Food: 'bg-lime-100 text-lime-800',
  Transport: 'bg-sky-100 text-sky-800',
  Entertainment: 'bg-fuchsia-100 text-fuchsia-800',
  Health: 'bg-rose-100 text-rose-800',
  Shopping: 'bg-amber-100 text-amber-800',
  Bills: 'bg-indigo-100 text-indigo-800',
  Other: 'bg-slate-100 text-slate-800',
}

export default function ExpenseList({ expenses, onDelete }) {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(() => {
    const filtered =
      filter === 'All'
        ? expenses
        : expenses.filter((expense) => expense.category === filter)
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date))
  }, [expenses, filter])

  const emptyMessage =
    expenses.length === 0
      ? 'No expenses yet. Add your first one above.'
      : 'No expenses in this category.'

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Expenses</h2>
        <select
          aria-label="Filter by category"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {visible.map((expense) => (
            <li
              key={expense.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900">
                  {expense.description}
                </p>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${
                      BADGE_COLORS[expense.category] ?? BADGE_COLORS.Other
                    }`}
                  >
                    {expense.category}
                  </span>
                  <span>{formatDate(expense.date)}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-semibold text-red-600">
                  {formatCurrency(expense.amount)}
                </span>
                <button
                  type="button"
                  onClick={() => onDelete(expense.id)}
                  aria-label={`Delete ${expense.description}`}
                  className="rounded-full px-2 py-1 text-lg leading-none text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
