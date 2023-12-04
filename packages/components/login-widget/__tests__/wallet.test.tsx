import { render } from '@testing-library/react'
import Wallet from '../src/wallet'
import { ProviderDisabled } from '../src/providers/disabled-provider'

describe('Wallet', () => {
  const mockProps = {
    provider: new ProviderDisabled()
      .setIcon(() => <div>Icon</div>)
      .setName('test')
      .sync(),
    connect: jest.fn(),
  }

  it('renders the component with the correct icon', () => {
    const { getByText } = render(<Wallet {...mockProps} />)
    expect(getByText('Icon')).toBeInTheDocument()
  })

  it('disables the button when isInstalled is false', () => {
    const { getByRole } = render(<Wallet {...mockProps} />)
    expect(getByRole('button')).toBeDisabled()
  })
})
