import { render, screen } from '@testing-library/react'
import { Badge, BadgeIcon } from '../src/badge'

describe('Badge', () => {
  it('renders label only', () => {
    render(<Badge>Label</Badge>)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('renders icon only', () => {
    render(
      <Badge>
        <BadgeIcon>
          <span>Icon</span>
        </BadgeIcon>
      </Badge>,
    )
    expect(screen.getByText('Icon')).toBeInTheDocument()
  })

  it('renders label and icon', () => {
    render(
      <Badge>
        <BadgeIcon>
          <span>Icon</span>
        </BadgeIcon>
        Label
      </Badge>,
    )
    expect(screen.getByText('Label')).toBeInTheDocument()
    expect(screen.getByText('Icon')).toBeInTheDocument()
  })

  it('renders with custom class name', () => {
    render(
      <Badge className="custom-class">
        <BadgeIcon>
          <span>Icon</span>
        </BadgeIcon>
        Label
      </Badge>,
    )
    expect(screen.getByText('Label')).toHaveClass('custom-class')
  })
})
