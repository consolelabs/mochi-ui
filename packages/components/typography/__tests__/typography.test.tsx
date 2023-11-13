import { render } from '@testing-library/react'
import Typography from '../src/typography'

describe('Typography', () => {
  it('renders the children', () => {
    const { getByText } = render(<Typography>Hello, world!</Typography>)
    const text = getByText('Hello, world!')
    expect(text).toBeInTheDocument()
  })

  it('applies the correct level class', () => {
    const { container } = render(
      <Typography level="h1">Hello, world!</Typography>,
    )
    const element = container.firstChild
    expect(element).toHaveClass('text-4xl font-bold')
  })

  it('applies the correct color class', () => {
    const { container } = render(
      <Typography color="primary">Hello, world!</Typography>,
    )
    const element = container.firstChild
    expect(element).toHaveClass('text-primary-700 border-primary-700')
  })

  it('applies the correct variant class', () => {
    const { container } = render(
      <Typography variant="outlined">Hello, world!</Typography>,
    )
    const element = container.firstChild
    expect(element).toHaveClass('border text-opacity-70')
  })

  it('applies the noWrap class when noWrap is true', () => {
    const { container } = render(<Typography noWrap>Hello, world!</Typography>)
    const element = container.firstChild
    expect(element).toHaveClass('whitespace-nowrap')
  })

  it('applies the className prop', () => {
    const { container } = render(
      <Typography className="custom-class">Hello, world!</Typography>,
    )
    const element = container.firstChild
    expect(element).toHaveClass('custom-class')
  })
})
