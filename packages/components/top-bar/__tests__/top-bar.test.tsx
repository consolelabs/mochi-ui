import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TopBar } from '../src'

describe('Page Header', () => {
  it('renders the title correctly', () => {
    const titleValue = 'Page Title'
    const { getByText } = render(<TopBar title={titleValue} />)
    const title = getByText(titleValue)

    expect(title).toBeInTheDocument()
  })

  it('renders the menu items correctly', () => {
    const { container } = render(
      <TopBar
        title="Page Title"
        desktopNavItems={[
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a href="#">API</a>,
          <strong>API</strong>,
          <strong>API</strong>,
        ]}
      />,
    )
    const anchors = container.getElementsByTagName('a')
    const strongs = container.getElementsByTagName('strong')

    expect(anchors.length).toBe(1)
    expect(strongs.length).toBe(2)
  })
})
