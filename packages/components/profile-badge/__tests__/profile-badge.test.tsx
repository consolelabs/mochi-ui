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

  it('renders the platform icon', () => {
    const name = 'John Doe'
    const avatar = 'https://mochi.gg/logo.png'
    const { container } = render(
      <ProfileBadge name={name} avatar={avatar} platform={platform} />,
    )
    const images = container.querySelectorAll('img')
    expect(images.length).toBe(2)

    const [image1, image2] = Array.from(images)
    expect(image1).toHaveAttribute('src', platform)
    expect(image2).toHaveAttribute(
      'src',
      // fallback
      'https://source.boringavatars.com/beam/120/John%20Doe?colors=665c52,74b3a7,a3ccaf,E6E1CF,CC5B14',
    )
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
