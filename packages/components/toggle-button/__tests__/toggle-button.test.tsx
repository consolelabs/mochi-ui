import { render, screen, fireEvent } from '@testing-library/react'
import { ToggleButtonGroup, ToggleButton } from '../src'

describe('ToggleButtonGroup', () => {
  it('renders buttons correctly', () => {
    const labelText = 'Click me'
    const { getByText } = render(
      <ToggleButtonGroup type="single">
        <ToggleButton>{labelText}</ToggleButton>
      </ToggleButtonGroup>,
    )
    const label = getByText(labelText)
    expect(label).toBeInTheDocument()
  })

  it('toggles buttons correctly', () => {
    const { getByText } = render(
      <ToggleButtonGroup type="single" defaultValue="1">
        <ToggleButton value="1" data-testid="toggle-button-1">
          1
        </ToggleButton>
        <ToggleButton value="2" data-testid="toggle-button-2">
          2
        </ToggleButton>
      </ToggleButtonGroup>,
    )

    const toggleButton1 = screen.getByTestId('toggle-button-1')
    const toggleButton2 = screen.getByTestId('toggle-button-2')

    fireEvent.click(toggleButton2)
    expect(toggleButton1.getAttribute('data-state')).toBe('off')
  })

  it('disables button correctly', () => {
    const { getByText } = render(
      <ToggleButtonGroup type="multiple" defaultValue={['1']}>
        <ToggleButton value="1" data-testid="toggle-button-1">
          1
        </ToggleButton>
        <ToggleButton value="2" data-testid="toggle-button-2" disabled>
          2
        </ToggleButton>
        <ToggleButton value="3" data-testid="toggle-button-3">
          3
        </ToggleButton>
      </ToggleButtonGroup>,
    )

    const toggleButton1 = screen.getByTestId('toggle-button-1')
    const toggleButton2 = screen.getByTestId('toggle-button-2')
    const toggleButton3 = screen.getByTestId('toggle-button-3')

    fireEvent.click(toggleButton2)
    expect(toggleButton1.getAttribute('data-state')).toBe('on')

    fireEvent.click(toggleButton3)
    expect(toggleButton1.getAttribute('data-state')).toBe('on')
    expect(toggleButton3.getAttribute('data-state')).toBe('on')
  })
})
