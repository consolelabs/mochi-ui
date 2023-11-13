import { render } from '@testing-library/react'
import InputField from '../src/input-field'

describe('InputField', () => {
  it('renders an input element', () => {
    const { container } = render(<InputField />)
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
  })

  it('applies the correct size variant', () => {
    const { container } = render(<InputField size="large" />)
    const input = container.querySelector('input')
    expect(input).toHaveClass('text-md leading-snug')
  })

  it('applies the disabled attribute', () => {
    const { container } = render(<InputField disabled />)
    const input = container.querySelector('input')
    expect(input).toBeDisabled()
  })

  it('renders the label', () => {
    const { getByText } = render(<InputField label="Test Label" />)
    const label = getByText('Test Label')
    expect(label).toBeInTheDocument()
  })

  it('renders the helper text', () => {
    const { getByText } = render(<InputField helperText="Test Helper Text" />)
    const helperText = getByText('Test Helper Text')
    expect(helperText).toBeInTheDocument()
  })

  it('renders the start adornment', () => {
    const { getByText } = render(
      <InputField startAdornment={<div>Test Start Adornment</div>} />,
    )
    const startAdornment = getByText('Test Start Adornment')
    expect(startAdornment).toBeInTheDocument()
  })

  it('renders the end adornment', () => {
    const { getByText } = render(
      <InputField endAdornment={<div>Test End Adornment</div>} />,
    )
    const endAdornment = getByText('Test End Adornment')
    expect(endAdornment).toBeInTheDocument()
  })

  it('passes through any other props', () => {
    const { container } = render(<InputField data-testid="test-input" />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('data-testid', 'test-input')
  })
})
