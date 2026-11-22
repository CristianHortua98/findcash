import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import App from './App'

async function addExpense(user, { description, amount }) {
  await user.type(screen.getByLabelText(/description/i), description)
  await user.type(screen.getByLabelText(/amount/i), amount)
  await user.click(screen.getByRole('button', { name: /add expense/i }))
}

describe('App', () => {
  test('renders the app header', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /findcash/i })
    ).toBeInTheDocument()
  })

  test('adds an expense through the form', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addExpense(user, { description: 'Coffee', amount: '4.50' })

    expect(await screen.findByText('Coffee')).toBeInTheDocument()
    expect(screen.getAllByText('$4.50')).toHaveLength(2)
    expect(screen.getByTestId('total')).toHaveTextContent('$4.50')
    expect(screen.getByTestId('entries')).toHaveTextContent('1')
  })

  test('rejects an empty description', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /description is required/i
    )
    expect(screen.getByTestId('entries')).toHaveTextContent('0')
  })

  test('rejects a missing amount', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/description/i), 'Coffee')
    await user.click(screen.getByRole('button', { name: /add expense/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /greater than zero/i
    )
  })

  test('deletes an expense from the list', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, { description: 'Coffee', amount: '4.50' })

    await user.click(screen.getByRole('button', { name: 'Delete Coffee' }))

    expect(screen.queryByText('Coffee')).not.toBeInTheDocument()
    expect(screen.getByTestId('total')).toHaveTextContent('$0.00')
    expect(screen.getByTestId('entries')).toHaveTextContent('0')
  })
})
