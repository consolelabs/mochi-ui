import { cleanup, render } from '@testing-library/react'
import Avatar from '../src/avatar'

describe('Avatar', () => {
  afterEach(cleanup)
  it('renders correctly with smallSrc', () => {
    const { container } = render(
      <Avatar
        size="sm"
        src="https://ui-avatars.com/api/?name=John+Doe"
        smallSrc="https://ui-avatars.com/api/?name=Adam+Smith"
      />,
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
    const images = container.querySelectorAll('image')
    expect(images.length).toBe(2)

    const [image1, image2] = Array.from(images)
    expect(image1).toHaveAttribute(
      'xlink:href',
      'https://ui-avatars.com/api/?name=John+Doe',
    )
    expect(image2).toHaveAttribute(
      'xlink:href',
      'https://ui-avatars.com/api/?name=Adam+Smith',
    )
  })

  it('renders correctly with fallback name', () => {
    const { container } = render(
      <Avatar
        size="base"
        src="https://example.com/avatar.png"
        fallback="example-fallback"
      />,
    )
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining(
        'https://source.boringavatars.com/beam/120/example-fallback',
      ),
    )
  })

  it('should allow to custom className', () => {
    const customClassName = 'my-custom-class'
    const wrapper = render(
      <Avatar
        size="base"
        src="https://example.com/avatar.png"
        className={customClassName}
      />,
    )
    expect(wrapper.container.firstChild).toHaveClass(customClassName)
  })
})
