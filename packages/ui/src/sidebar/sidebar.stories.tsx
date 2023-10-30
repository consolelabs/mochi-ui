import IconUser from '../icons/components/icon-user'
import IconDiscord from '../icons/components/icon-discord'
import IconGame from '../icons/components/icon-game'
import IconSetting from '../icons/components/icon-setting'
import IconCoding from '../icons/components/icon-coding'
import IconSuperGroup from '../icons/components/icon-super-group'
import IconAddUser from '../icons/components/icon-add-user'
import IconStar from '../icons/components/icon-star'
import IconLifeBuoy from '../icons/components/icon-life-buoy'
import IconX from '../icons/components/icon-x'
import Sidebar from './sidebar'
import { Badge } from '../badge'
import { IconTwinkle } from '../icons'

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
            badge: <Badge label='New' />,
            disabled: true
          },
          { title: 'Server Management', Icon: IconDiscord, badge: <Badge appearance="secondary" icon={<IconTwinkle/>} label="Featured"/>},
          { title: 'App Store', Icon: IconGame },
          { title: 'Settings', Icon: IconSetting },
          { type: 'break' },
          { title: 'Developer', Icon: IconCoding, disabled: true},
          { title: 'Gift your friend', Icon: IconSuperGroup, badge: <Badge appearance="secondary" icon={<IconTwinkle/>} label="Featured"/>},
          { title: 'Invite Friends', Icon: IconAddUser },
          { title: 'Feedback', Icon: IconStar },
          {
            title: 'List',
            badge: <Badge appearance="secondary" icon={<IconTwinkle/>} label="Featured"/>,
            Icon: IconStar,
            type: 'list',
            children: [
              { title: 'item 1', disabled: true, type:"link", href:"/"},
              { title: 'item 2' },
            ],
          },
        ]}
      />
    </div>
  )
}
