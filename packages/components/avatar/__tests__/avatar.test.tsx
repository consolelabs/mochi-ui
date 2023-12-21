import { cleanup, render } from '@testing-library/react'
import Avatar, { AvatarSmallImage } from '../src/avatar'
import { boringAvatar } from '../src/util'

describe('Avatar', () => {
  afterEach(cleanup)
  it('renders correctly with smallSrc', () => {
    const { container } = render(
      <Avatar
        size="sm"
        src="https://ui-avatars.com/api/?name=John+Doe"
        fallback="fallback"
      >
        <AvatarSmallImage src="https://ui-avatars.com/api/?name=Adam+Smith" />
      </Avatar>,
    )
    expect(container.querySelector('img')).toBeInTheDocument()
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(2)

    const [image1, image2] = Array.from(images)
    expect(image1).toHaveAttribute(
      'src',
      'https://ui-avatars.com/api/?name=Adam+Smith',
    )
    expect(image2).toHaveAttribute('src', boringAvatar('fallback'))
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
