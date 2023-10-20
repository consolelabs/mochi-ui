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

export default {
  title: 'ui/Sidebar',
}

function Header() {
  return (
    <img
      alt="header"
      className="ui-h-20 ui-w-full ui-object-cover"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  )
}

export function Default() {
  return (
    <div className="ui-h-[700px] ui-border">
      <Sidebar
        Header={Header}
        footerItems={[
          { title: 'Support', Icon: IconLifeBuoy },
          { title: 'Follow Us', Icon: IconX },
          { title: 'Join Community', Icon: IconDiscord },
        ]}
        headerItems={[
          { title: 'Profile', Icon: IconUser },
          { title: 'Server', Icon: IconDiscord },
          { title: 'App Store', Icon: IconGame },
          { title: 'Settings', Icon: IconSetting },
          { type: 'break' },
          { title: 'Developer', Icon: IconCoding },
          { title: 'Gift your friend', Icon: IconSuperGroup },
          { title: 'Invite Friends', Icon: IconAddUser },
          { title: 'Feedback', Icon: IconStar },
          {
            title: 'List',
            Icon: IconStar,
            type: 'list',
            children: [
              { title: 'item 1', Icon: IconStar },
              { title: 'item 2', Icon: IconStar },
            ],
          },
        ]}
      />
    </div>
  )
}
