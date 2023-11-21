import { render } from '@testing-library/react'
import Alert from '../src/alert'

describe('Alert', () => {
  it('renders the title and children', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { getByText } = render(<Alert title={title}>{message}</Alert>)
    const titleElement = getByText(title)
    const messageElement = getByText(message)
    expect(titleElement).toBeInTheDocument()
    expect(messageElement).toBeInTheDocument()
  })

  it('renders with the default appearance if none is provided', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { container } = render(<Alert title={title}>{message}</Alert>)
    expect(container.firstChild).toHaveClass('bg-neutral-100')
  })

  it('renders with the provided appearance', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { container } = render(
      <Alert title={title} appearance="success">
        {message}
      </Alert>,
    )
    expect(container.firstChild).toHaveClass('bg-success-100')
  })

  it('renders with the provided size', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { container } = render(
      <Alert title={title} size="md">
        {message}
      </Alert>,
    )
    expect(container.firstChild).toHaveClass('text-base')
  })
})
