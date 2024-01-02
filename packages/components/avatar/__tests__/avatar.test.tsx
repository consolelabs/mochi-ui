import { cleanup, render } from '@testing-library/react'
import Avatar from '../src/avatar'

describe('Avatar', () => {
  afterEach(cleanup)

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
