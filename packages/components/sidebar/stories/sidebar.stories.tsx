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
import { useState } from 'react'
import Sidebar from '../src/sidebar'

export default {
  title: 'ui/Sidebar',
}

function Header() {
  return (
    <img
      alt="header"
      className="h-20 w-full object-cover"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  )
}

export function Default() {
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
