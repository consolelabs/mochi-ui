import { render } from '@testing-library/react'
import { TextFieldInput } from '../src/textfield'

describe('Input', () => {
  it('renders an input element', () => {
    const { container } = render(<TextFieldInput />)
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
  })

  it('applies the correct className', () => {
    const { container } = render(<TextFieldInput className="test-class" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('test-class')
  })

  it('applies the correct size variant', () => {
    const { container } = render(<TextFieldInput size="lg" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('h-[52px] text-md leading-snug')
  })

  it('applies the disabled attribute', () => {
    const { container } = render(<TextFieldInput disabled />)
    const input = container.querySelector('input')
    expect(input).toBeDisabled()
  })

  it('applies the error variant', () => {
    const { container } = render(<TextFieldInput error />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('!caret-danger-outline-fg')
  })

  it('passes through any other props', () => {
    const { container } = render(<TextFieldInput data-testid="test-input" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('data-testid', 'test-input')
  })
})
