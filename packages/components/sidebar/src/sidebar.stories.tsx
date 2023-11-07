import Sidebar from './sidebar'
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
            href: 'https://mochi.gg',
            badge: <Badge label="New" />,
            disabled: true,
          },
          { title: 'App Store', Icon: IconGame },
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
      />
    </div>
  )
}
