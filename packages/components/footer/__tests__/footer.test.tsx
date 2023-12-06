import * as React from 'react'
import { render } from '@testing-library/react'

import { Footer } from '../src'

describe('Footer', () => {
  it('should render correctly', () => {
    const wrapper = render(
      <Footer copyrightText="" logo={null} social={[]} nav={[]} />,
    )

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
