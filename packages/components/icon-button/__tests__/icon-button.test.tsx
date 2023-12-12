import { render, fireEvent } from '@testing-library/react'
import IconButton from '../src/icon-button'

describe('IconButton', () => {
  it('renders with size "lg"', () => {
    const { getByRole } = render(
      <IconButton label="" size="lg">
        Click me
      </IconButton>,
    )
    expect(getByRole('button')).toHaveClass('text-base')
  })

  it('renders as disabled', () => {
    const { getByRole } = render(
      <IconButton label="" disabled>
        Click me
      </IconButton>,
    )
    expect(getByRole('button')).toBeDisabled()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(
      <IconButton label="" onClick={handleClick}>
        Click me
      </IconButton>,
    )
    fireEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('renders with additional props', () => {
    const { container } = render(
      <IconButton label="" data-testid="my-button">
        Click me
      </IconButton>,
    )
    expect(container.firstChild).toHaveAttribute('data-testid', 'my-button')
  })
})
