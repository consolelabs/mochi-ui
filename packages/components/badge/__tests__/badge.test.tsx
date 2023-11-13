import { render } from '@testing-library/react'
import Badge from '../src/badge'

describe('Badge', () => {
  it('renders correctly with label only', () => {
    const { container } = render(<Badge label="Label" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with icon only', () => {
    const { container } = render(<Badge icon={<span>Icon</span>} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with label and icon', () => {
    const { container } = render(
      <Badge icon={<span>Icon</span>} label="Label" />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with icon on the right', () => {
    const { container } = render(
      <Badge icon={<span>Icon</span>} label="Label" iconPosition="right" />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with custom class name', () => {
    const { container } = render(
      <Badge icon={<span>Icon</span>} label="Label" className="custom-class" />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with custom icon class name', () => {
    const { container } = render(
      <Badge
        icon={<span>Icon</span>}
        label="Label"
        iconClassName="custom-icon-class"
      />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with avatar icon', () => {
    const { container } = render(
      <Badge icon={<span>Icon</span>} label="Label" isAvatarIcon />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders correctly with appearance', () => {
    const { container } = render(
      <Badge icon={<span>Icon</span>} label="Label" appearance="primary" />,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
