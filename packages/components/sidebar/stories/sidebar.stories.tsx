import { Badge, BadgeIcon } from '@mochi-ui/badge'
import { Button } from '@mochi-ui/button'
import {
  AddUserSolid,
  CodingSolid,
  Discord,
  GameSolid,
  LifeBuoySolid,
  GearSolid,
  StarSolid,
  SuperGroupSolid,
  TwinkleSolid,
  UserSolid,
  X,
} from '@mochi-ui/icons'
import { useState } from 'react'
import Sidebar from '../src/sidebar'

export default {
  title: 'Layout/Sidebar',
}

function Header() {
  return (
    <img
      alt="header"
      className="object-cover w-full h-20"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  )
}

export function Default() {
  const [section, setSection] = useState('Profile')
  return (
    <div className="border h-[700px] border-divider">
      <Sidebar
        Header={Header}
        footerItems={[
          { title: 'Support', Icon: LifeBuoySolid },
          { title: 'Follow Us', Icon: X },
          { title: 'Join Community', Icon: Discord },
        ]}
        headerItems={[
          {
            title: 'Profile',
            Icon: UserSolid,
            type: 'link',
            badge: <Badge>New</Badge>,
            onClick: () => setSection('Profile'),
            description: 'View Profile',
          },
          {
            title: 'Server Management',
            Icon: Discord,
            badge: (
              <Badge appearance="secondary">
                <BadgeIcon>
                  <TwinkleSolid />
                </BadgeIcon>
                Featured
              </Badge>
            ),
            onClick: () => setSection('Server Management'),
          },
          {
            title: 'App Store',
            Icon: GameSolid,
            onClick: () => setSection('App Store'),
            action: (
              <Button
                variant="link"
                className="!px-0"
                onClick={(event) => {
                  event.stopPropagation()
                  alert('Action')
                }}
              >
                Action
              </Button>
            ),
          },
          { title: 'Settings', Icon: GearSolid },
          { type: 'break' },
          { title: 'Developer', Icon: CodingSolid, disabled: true },
          {
            title: 'Gift your friend',
            Icon: SuperGroupSolid,
            badge: (
              <Badge appearance="secondary">
                <BadgeIcon>
                  <TwinkleSolid />
                </BadgeIcon>
                Featured
              </Badge>
            ),
          },
          { title: 'Invite Friends', Icon: AddUserSolid },
          {
            title: 'List',
            badge: (
              <Badge appearance="secondary">
                <BadgeIcon>
                  <TwinkleSolid />
                </BadgeIcon>
                Featured
              </Badge>
            ),
            Icon: StarSolid,
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
