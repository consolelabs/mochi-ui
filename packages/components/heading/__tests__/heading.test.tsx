import { render } from '@testing-library/react'
import Heading from '../src/heading'

describe('Heading', () => {
  it('renders the correct tag', () => {
    const { container } = render(<Heading as="h1">Hello World</Heading>)
    expect(container.querySelector('h1')).toBeInTheDocument()
  })

  it('renders the correct text', () => {
    const { getByText } = render(<Heading>Hello World</Heading>)
    expect(getByText('Hello World')).toBeInTheDocument()
  })

  it('passes additional props', () => {
    const { getByTestId } = render(
      <Heading data-testid="test-heading" className="test-class">
        Hello World
      </Heading>,
    )
    const heading = getByTestId('test-heading')
    expect(heading).toHaveClass('test-class')
  })
})
