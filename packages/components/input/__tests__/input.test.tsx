import { render } from '@testing-library/react'
import Input from '../src/input'

describe('Input', () => {
  it('renders an input element', () => {
    const { container } = render(<Input.InputField />)
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
  })

  it('applies the correct className', () => {
    const { container } = render(<Input.InputField className="test-class" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('test-class')
  })

  it('applies the correct size variant', () => {
    const { container } = render(<Input.InputField size="lg" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('h-[52px] text-md leading-snug')
  })

  it('applies the disabled attribute', () => {
    const { container } = render(<Input.InputField disabled />)
    const input = container.querySelector('input')
    expect(input).toBeDisabled()
  })

  it('applies the error variant', () => {
    const { container } = render(<Input.InputField error />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('border-red-700 focus:border-red-700')
  })

  it('passes through any other props', () => {
    const { container } = render(<Input.InputField data-testid="test-input" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('data-testid', 'test-input')
  })
})
