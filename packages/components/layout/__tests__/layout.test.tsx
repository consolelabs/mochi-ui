import { render } from '@testing-library/react'
import { Typography } from '@consolelabs/typography'
import { Layout } from '../src'

describe('Layout', () => {
  it('renders the children correctly', () => {
    const { container } = render(
      <Layout>
        <Typography level="h1">Heading</Typography>
      </Layout>,
    )

    const title = container.querySelector('h1')
    expect(title?.innerHTML || '').toBe('Heading')
  })

  it('applies the tagName and className correctly', () => {
    const { container } = render(
      <Layout tagName="header" className="test-class" />,
    )

    const header = container.querySelector('header')
    expect(header).toHaveClass('test-class')
  })
})
