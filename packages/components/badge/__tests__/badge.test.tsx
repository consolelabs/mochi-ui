import { render, screen } from '@testing-library/react'
import Badge from '../src/badge'

describe('Badge', () => {
  it('renders label only', () => {
    render(<Badge label="Label" />)
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('renders icon only', () => {
    render(<Badge icon={<span>Icon</span>} />)
    expect(screen.getByText('Icon')).toBeInTheDocument()
  })

  it('renders label and icon', () => {
    render(<Badge icon={<span>Icon</span>} label="Label" />)
    expect(screen.getByText('Label')).toBeInTheDocument()
    expect(screen.getByText('Icon')).toBeInTheDocument()
  })

  it('renders with custom class name', () => {
    render(
      <Badge icon={<span>Icon</span>} label="Label" className="custom-class" />,
    )
    expect(screen.getByText('Label')).toHaveClass('custom-class')
  })
})
