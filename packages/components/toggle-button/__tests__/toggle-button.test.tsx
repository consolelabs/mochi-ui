import { render, screen, fireEvent } from '@testing-library/react'
import { ToggleButtonGroup, ToggleButton } from '../src'

describe('ToggleButtonGroup', () => {
  it('renders buttons correctly', () => {
    const labelText = 'Click me'
    const { getByText } = render(
      <ToggleButtonGroup type="single">
        <ToggleButton value="1">{labelText}</ToggleButton>
      </ToggleButtonGroup>,
    )
    const label = getByText(labelText)
    expect(label).toBeInTheDocument()
  })

  it('toggles buttons correctly', () => {
    render(
      <ToggleButtonGroup type="single" defaultValue="1">
        <ToggleButton value="1" data-testid="toggle-button-one">
          1
        </ToggleButton>
        <ToggleButton value="2" data-testid="toggle-button-two">
          2
        </ToggleButton>
      </ToggleButtonGroup>,
    )

    const toggleButtonOne = screen.getByTestId('toggle-button-one')
    const toggleButtonTwo = screen.getByTestId('toggle-button-two')

    fireEvent.click(toggleButtonTwo)
    expect(toggleButtonOne.getAttribute('data-state')).toBe('off')
  })

  it('disables button correctly', () => {
    render(
      <ToggleButtonGroup type="multiple" defaultValue={['1']}>
        <ToggleButton value="1" data-testid="toggle-button-one">
          1
        </ToggleButton>
        <ToggleButton value="2" data-testid="toggle-button-two" disabled>
          2
        </ToggleButton>
        <ToggleButton value="3" data-testid="toggle-button-three">
          3
        </ToggleButton>
      </ToggleButtonGroup>,
    )

    const toggleButtonOne = screen.getByTestId('toggle-button-one')
    const toggleButtonTwo = screen.getByTestId('toggle-button-two')
    const toggleButtonThree = screen.getByTestId('toggle-button-three')

    fireEvent.click(toggleButtonTwo)
    expect(toggleButtonOne.getAttribute('data-state')).toBe('on')

    fireEvent.click(toggleButtonThree)
    expect(toggleButtonOne.getAttribute('data-state')).toBe('on')
    expect(toggleButtonThree.getAttribute('data-state')).toBe('on')
  })
})
