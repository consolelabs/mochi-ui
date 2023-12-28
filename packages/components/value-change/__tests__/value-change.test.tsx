import { cleanup, render } from '@testing-library/react'
import { ValueChange, ValueChangeIndicator } from '../src'

describe('Logo', () => {
  afterEach(cleanup)
  it('renders indicator correctly', () => {
    const { container } = render(
      <ValueChange trend="down">
        <ValueChangeIndicator />
      </ValueChange>,
    )
    expect(container.querySelector('svg')).toHaveClass(
      'text-danger-plain-disable-fg',
    )
  })

  it('renders custom indicator correctly', () => {
    const { container, getByText } = render(
      <ValueChange trend="down">
        <ValueChangeIndicator>Indicator</ValueChangeIndicator>
      </ValueChange>,
    )

    expect(container.querySelector('svg')).toBeNull()

    const customIndicator = getByText('Indicator')
    expect(customIndicator).toBeInTheDocument()
  })
})
