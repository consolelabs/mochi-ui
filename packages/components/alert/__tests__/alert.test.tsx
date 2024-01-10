import { render } from '@testing-library/react'
import { Alert, AlertTitle } from '../src'
import { AlertDescription } from '../src/alert-description'

describe('Alert', () => {
  it('renders the title and children', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { getByText } = render(
      <Alert>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>,
    )
    const titleElement = getByText(title)
    const messageElement = getByText(message)
    expect(titleElement).toBeInTheDocument()
    expect(messageElement).toBeInTheDocument()
  })

  it('renders with the default appearance if none is provided', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { container } = render(
      <Alert scheme="neutral">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>,
    )
    expect(container.firstChild).toHaveClass('bg-neutral-soft')
  })

  it('renders with the provided appearance', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { container } = render(
      <Alert scheme="success">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>,
    )
    expect(container.firstChild).toHaveClass('bg-success-soft')
  })

  it('renders with the provided size', () => {
    const title = 'Test Alert'
    const message = 'This is a test alert'
    const { container } = render(
      <Alert scheme="success">
        <AlertTitle className="title">{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>,
    )
    expect(container.getElementsByClassName('title')[0]).toHaveClass('text-sm')
  })
})
