import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DesktopNav, TopBar } from '../src'

describe('Top Bar', () => {
  it('renders the title correctly', () => {
    const titleValue = 'Page Title'
    const { getByText } = render(<TopBar leftSlot={titleValue} />)
    const title = getByText(titleValue)

    expect(title).toBeInTheDocument()
  })

  it('renders the menu items correctly', () => {
    const { container } = render(
      <TopBar
        leftSlot="Page Title"
        rightSlot={
          <DesktopNav
            navItems={[
              <a href="#">API</a>,
              <strong>API</strong>,
              <strong>API</strong>,
            ]}
          />
        }
      />,
    )
    const anchors = container.getElementsByTagName('a')
    const strongs = container.getElementsByTagName('strong')

    expect(anchors.length).toBe(1)
    expect(strongs.length).toBe(2)
  })
})
