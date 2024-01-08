import * as React from 'react'
import { render } from '@testing-library/react'

import { Card } from '../src'

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = render(<Card />)

    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('ref should be forwarded', () => {
    const ref = React.createRef<HTMLDivElement>()

    render(<Card ref={ref} />)
    expect(ref.current).not.toBeNull()
  })

  it('should allow custom element', () => {
    const wrapper = render(
      <Card asChild>
        <p />
      </Card>,
    )
    expect(wrapper.container.querySelector('p')).not.toBeNull()
  })

  it('should allow to custom className', () => {
    const customClassName = 'shadow-input'
    const wrapper = render(<Card className={customClassName} />)
    expect(wrapper.container.firstChild).toHaveClass(customClassName)
  })
})
