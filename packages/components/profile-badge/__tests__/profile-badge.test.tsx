import { render } from '@testing-library/react'
import { ProfileBadge } from '../src/profile-badge'

const platform =
  'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png'

describe('ProfileBadge', () => {
  it('renders the name and avatar', () => {
    const name = 'John Doe'
    const avatar = 'https://example.com/avatar.png'
    const { getByText } = render(
      <ProfileBadge name={name} avatar={avatar} platform={platform} />,
    )
    const nameElement = getByText(name)
    expect(nameElement).toBeInTheDocument()
  })

  it('passes through additional props', () => {
    const onClick = jest.fn()
    const { getByRole } = render(
      <ProfileBadge
        name="John Doe"
        avatar="https://example.com/avatar.png"
        onClick={onClick}
        platform={platform}
      />,
    )
    const buttonElement = getByRole('button')
    buttonElement.click()
    expect(onClick).toHaveBeenCalled()
  })
})
