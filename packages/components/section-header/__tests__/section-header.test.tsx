import { render } from '@testing-library/react'
import { Button } from '@mochi-ui/button'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderDescription,
  SectionHeaderTitle,
} from '../src'

describe('Section Header', () => {
  it('renders the title correctly', () => {
    const { container } = render(
      <SectionHeader>
        <SectionHeaderTitle>Section Title</SectionHeaderTitle>
      </SectionHeader>,
    )

    const title = container.querySelector('h6')
    expect(title?.innerHTML || '').toBe('Section Title')
  })

  it('renders the title extra and description correctly', () => {
    const descriptionValue =
      'Lorem ipsum dolor sit amet consectetur. Sed turpis eget sed nullam volutpat integer posuere.'

    const { container } = render(
      <SectionHeader>
        <SectionHeaderTitle>Section Title</SectionHeaderTitle>
        <SectionHeaderDescription>{descriptionValue}</SectionHeaderDescription>
      </SectionHeader>,
    )

    const description = container.querySelector('p')

    expect(description?.innerHTML || '').toBe(descriptionValue)
  })

  it('renders the actions correctly', () => {
    const { container } = render(
      <SectionHeader>
        <SectionHeaderTitle>Section Title</SectionHeaderTitle>
        <SectionHeaderActions>
          <Button>Button one</Button>
          <Button>Button two</Button>
        </SectionHeaderActions>
      </SectionHeader>,
    )

    const buttons = container.querySelectorAll('button')
    expect(Array.from(buttons).length).toBe(2)
  })
})
