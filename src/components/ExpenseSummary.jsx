import { formatCurrency } from '../utils/format'

export default function ExpenseSummary({ expenses }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-600">Total spent</p>
        <p data-testid="total" className="mt-1 text-2xl font-bold text-slate-900">
          {formatCurrency(total)}
        </p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-slate-600">Entries</p>
        <p data-testid="entries" className="mt-1 text-2xl font-bold text-slate-900">
          {expenses.length}
        </p>
      </div>
    </div>
  )
}
