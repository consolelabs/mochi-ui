import { render } from '@testing-library/react'
import Avatar from '../src/avatar'

describe('Avatar', () => {
  it('renders correctly with src', () => {
    const { container } = render(
      <Avatar size="base" src="https://example.com/avatar.png" />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with smallSrc', () => {
    const { container } = render(
      <Avatar
        size="sm"
        src="https://example.com/avatar.png"
        smallSrc="https://example.com/small-avatar.png"
      />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with fallback', () => {
    const { container } = render(
      <Avatar
        size="base"
        fallback="fallback"
        src="https://example.com/avatar.png"
      />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
