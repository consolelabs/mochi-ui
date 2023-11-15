import { Badge } from '@consolelabs/badge'
import {
  IconAddUser,
  IconCoding,
  IconDiscord,
  IconGame,
  IconLifeBuoy,
  IconSetting,
  IconStar,
  IconSuperGroup,
  IconTwinkle,
  IconUser,
  IconX,
} from '@consolelabs/icons'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import Sidebar from '../src/sidebar'

function Header() {
  return (
    <img
      alt="header"
      className="h-20 w-full object-cover"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  )
}

function Component() {
  const [section, setSection] = useState('Profile')
  return (
    <div className="h-[700px] border">
      <Sidebar
        Header={Header}
        footerItems={[
          { title: 'Support', Icon: IconLifeBuoy },
          { title: 'Follow Us', Icon: IconX },
          { title: 'Join Community', Icon: IconDiscord },
        ]}
        headerItems={[
          {
            title: 'Profile',
            Icon: IconUser,
            type: 'link',
            badge: <Badge label="New" />,
            onClick: () => setSection('Profile'),
          },
          {
            title: 'Server Management',
            Icon: IconDiscord,
            badge: (
              <Badge
                appearance="secondary"
                icon={<IconTwinkle />}
                label="Featured"
              />
            ),
            onClick: () => setSection('Server Management'),
          },
          {
            title: 'App Store',
            Icon: IconGame,
            onClick: () => setSection('App Store'),
          },
          { title: 'Settings', Icon: IconSetting },
          { type: 'break' },
          { title: 'Developer', Icon: IconCoding, disabled: true },
          {
            title: 'Gift your friend',
            Icon: IconSuperGroup,
            badge: (
              <Badge
                appearance="secondary"
                icon={<IconTwinkle />}
                label="Featured"
              />
            ),
          },
          { title: 'Invite Friends', Icon: IconAddUser },
          { title: 'Feedback', Icon: IconStar },
          {
            title: 'List',
            badge: (
              <Badge
                appearance="secondary"
                icon={<IconTwinkle />}
                label="Featured"
              />
            ),
            Icon: IconStar,
            type: 'list',
            children: [
              { title: 'item 1', disabled: true, type: 'link', href: '/' },
              { title: 'item 2' },
            ],
          },
        ]}
        isSelected={(item) => item.title === section}
      />
    </div>
  )
}

describe('Sidebar', () => {
  it('renders the header', () => {
    const { getByAltText } = render(<Component />)
    expect(getByAltText('header')).toBeInTheDocument()
  })

  it('renders the footer items', () => {
    const { getByText } = render(<Component />)
    expect(getByText('Support')).toBeInTheDocument()
    expect(getByText('Follow Us')).toBeInTheDocument()
    expect(getByText('Join Community')).toBeInTheDocument()
  })

  it('renders the header items', () => {
    const { getByText } = render(<Component />)
    expect(getByText('Profile')).toBeInTheDocument()
    expect(getByText('Server Management')).toBeInTheDocument()
    expect(getByText('App Store')).toBeInTheDocument()
    expect(getByText('Settings')).toBeInTheDocument()
    expect(getByText('Developer')).toBeInTheDocument()
    expect(getByText('Gift your friend')).toBeInTheDocument()
    expect(getByText('Invite Friends')).toBeInTheDocument()
    expect(getByText('Feedback')).toBeInTheDocument()
    expect(getByText('List')).toBeInTheDocument()
  })

  it('updates the selected section when an item is clicked', async () => {
    const { getByText } = render(<Component />)
    const serverManagement = getByText('Server Management')
    const button = serverManagement.closest('button') as HTMLElement
    expect(button).not.toHaveClass('bg-neutral-150')
    await act(async () => {
      await userEvent.click(button)
    })
    expect(button).toHaveClass('bg-neutral-150')
  })

  it('expands and collapses the sidebar when the toggle button is clicked', async () => {
    const { container, getByTestId } = render(<Component />)
    await act(async () => {
      await userEvent.hover(container)
    })
    const toggleButton = getByTestId('collapsible-button')
    await act(async () => {
      await userEvent.click(toggleButton)
    })
    const content = getByTestId('sidebar-content')
    expect(content).not.toHaveClass('w-fit')
    await act(async () => {
      await userEvent.click(toggleButton)
    })
    expect(content).toHaveClass('w-fit')
  })
})
