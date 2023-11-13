import { fireEvent, render } from '@testing-library/react'
import Button from '../src/button'

describe('Button', () => {
  it('renders the button with the correct text', () => {
    const buttonText = 'Click me'
    const { getByText } = render(<Button>{buttonText}</Button>)
    const button = getByText(buttonText)
    expect(button).toBeInTheDocument()
  })

  it('calls the onClick function when clicked', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>)
    const button = getByText('Click me')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('disables the button when loading', () => {
    const { container } = render(<Button loading>Click me</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('pointer-events-none')
  })

  it('matches snapshot', () => {
    const { container } = render(<Button>Click me</Button>)
    expect(container).toMatchSnapshot()
  })

  it('matches snapshot when loading', () => {
    const { container } = render(<Button loading>Click me</Button>)
    expect(container).toMatchSnapshot()
  })
})
