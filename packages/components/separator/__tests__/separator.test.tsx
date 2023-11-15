import { render } from '@testing-library/react'
import { Separator } from '../src'

describe('Separator', () => {
  it('renders correctly', () => {
    const { unmount } = render(<Separator />)
    expect(() => unmount()).not.toThrow()
  })
})
