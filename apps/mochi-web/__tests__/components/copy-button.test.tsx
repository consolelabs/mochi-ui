import { render } from '@testing-library/react'
import CopyButton from '~cpn/CopyButton'

describe('CopyButton', () => {
  it('renders the button with the correct text', () => {
    const buttonText = 'Copy me'
    const { getByText } = render(<CopyButton>{buttonText}</CopyButton>)
    const button = getByText('Copy...me')
    expect(button).toBeInTheDocument()
  })
})
