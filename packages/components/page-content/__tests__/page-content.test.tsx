import { render } from '@testing-library/react'
import { Typography } from '@mochi-ui/typography'
import { PageContent } from '../src'

describe('Page Content', () => {
  it('renders the children correctly', () => {
    const { container } = render(
      <PageContent>
        <Typography level="h1">Heading</Typography>
      </PageContent>,
    )

    const title = container.querySelector('h1')
    expect(title?.innerHTML || '').toBe('Heading')
  })

  it('applies the tagName and className correctly', () => {
    const { container } = render(
      <PageContent tagName="main" className="test-class" />,
    )

    const content = container.querySelector('main')
    expect(content?.firstChild).toHaveClass('max-w-[1108px]')
  })
})
