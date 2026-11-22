import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import { useLocalStorage } from './hooks/useLocalStorage'
import { createId } from './utils/format'

export default function App() {
  const [expenses, setExpenses] = useLocalStorage('findcash-expenses', [])

  const addExpense = (expense) => {
    setExpenses((prev) => [{ ...expense, id: createId() }, ...prev])
  }

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <main className="mx-auto max-w-2xl space-y-6 px-4 py-10">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            FindCash
          </h1>
          <p className="text-slate-600">
            A simple way to track your daily expenses.
          </p>
        </header>

        <ExpenseForm onAdd={addExpense} />
        <ExpenseSummary expenses={expenses} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </main>
    </div>
  )
}
