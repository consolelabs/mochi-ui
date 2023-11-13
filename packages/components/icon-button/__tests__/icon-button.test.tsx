import { render, fireEvent } from '@testing-library/react'
import IconButton from '../src/icon-button'

describe('IconButton', () => {
  it('renders correctly with children', () => {
    const { container } = render(<IconButton>Click me</IconButton>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with variant', () => {
    const { container } = render(
      <IconButton variant="outline">Click me</IconButton>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with color', () => {
    const { container } = render(
      <IconButton color="primary">Click me</IconButton>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with size', () => {
    const { container } = render(<IconButton size="lg">Click me</IconButton>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly when disabled', () => {
    const { container } = render(<IconButton disabled>Click me</IconButton>)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(
      <IconButton onClick={handleClick}>Click me</IconButton>,
    )
    fireEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('renders correctly with custom class name', () => {
    const { container } = render(
      <IconButton className="custom-class">Click me</IconButton>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with additional props', () => {
    const { container } = render(
      <IconButton data-testid="my-button">Click me</IconButton>,
    )
    expect(container.firstChild).toHaveAttribute('data-testid', 'my-button')
  })
})
