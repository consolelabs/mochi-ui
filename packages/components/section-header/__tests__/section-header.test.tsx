import { render } from '@testing-library/react'
import { Button } from '@consolelabs/button'
import { SectionHeader } from '../src'

describe('Section Header', () => {
  it('renders the title correctly', () => {
    const { container } = render(<SectionHeader title="Section Title" />)

    const title = container.querySelector('h6')
    expect(title?.innerHTML || '').toBe('Section Title')
  })

  it('renders the title extra and description correctly', () => {
    const descriptionValue =
      'Lorem ipsum dolor sit amet consectetur. Sed turpis eget sed nullam volutpat integer posuere.'

    const { container } = render(
      <SectionHeader title="Section Title" description={descriptionValue} />,
    )

    const description = container.querySelector('p')

    expect(description?.innerHTML || '').toBe(descriptionValue)
  })

  it('renders the actions correctly', () => {
    const { container } = render(
      <SectionHeader
        title="Section Title"
        actions={[<Button>Button one</Button>, <Button>Button two</Button>]}
      />,
    )

    const buttons = container.querySelectorAll('button')
    expect(Array.from(buttons).length).toBe(2)
  })
})
