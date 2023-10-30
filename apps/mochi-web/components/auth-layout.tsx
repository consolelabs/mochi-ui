import clsx from 'clsx'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { useAuthStore } from '~store'
import Link from 'next/link'
import Login from './login'
import {
  Sidebar,
  IconLifeBuoy,
  IconX,
  IconDiscord,
  IconStar,
  IconAddUser,
  IconCoding,
  IconSetting,
  IconGame,
  IconUser,
  IconSuperGroup,
  Badge,
  IconTwinkle,
} from '@consolelabs/ui-components'
import { DISCORD_LINK } from '~envs'
import { useRouter } from 'next/router'

const SidebarHeader = ({ expanded }: { expanded?: boolean }) => {
  return expanded ? (
    <img
      alt="header"
      className="object-cover w-full h-20"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  ) : (
    <span />
  )
}

export const getSidebarBadge = {
  'NEW': <Badge icon={<IconTwinkle/>} label='New' appearance="success" />,
  'FEATURED': <Badge label='Featured'  appearance="primary" />,
  'SOON': <Badge label='Soon' appearance="secondary"/>,
  'FREE_TRIAL': <Badge label='Free trial' appearance="warning" />,
} as const

export default function AuthenticatedLayout({
  children,
  fullWidth = false,
  footer,
  childSEO,
}: {
  childSEO?: React.ReactNode
  children: React.ReactNode
  fullWidth?: boolean
  footer?: React.ReactNode
}) {
  const { pathname } = useRouter()
  const mounted = useHasMounted()
  const { isLoggedIn, isLoadingSession } = useAuthStore()

  if (!mounted) return <>{childSEO}</>

  return (
    <div className="flex flex-col w-screen min-h-screen bg-dashboard-gray-1">
      <div className="relative z-10 flex flex-1">
        {isLoadingSession ? null : isLoggedIn ? (
          <>
            <div
              style={{ top: 80, height: 'calc(100vh - 80px)' }}
              className="sticky left-0 z-10"
            >
              <Sidebar
                Header={SidebarHeader}
                headerItems={[
                  {
                    title: 'Profile',
                    Icon: IconUser,
                    type: 'link',
                    as: Link,
                    href: '/profile',
                  },
                  { title: 'Servers', Icon: IconDiscord },
                  { title: 'App Store', Icon: IconGame, badge: getSidebarBadge['SOON'], disabled: true},
                  { title: 'Settings', Icon: IconSetting },
                  { type: 'break' },
                  {
                    title: 'Developer',
                    Icon: IconCoding,
                    type: 'link',
                    as: Link,
                    href: '/app',
                    badge: getSidebarBadge['NEW']
                  },
                  {
                    title: 'Send gifts',
                    Icon: IconSuperGroup,
                    badge: getSidebarBadge['SOON'],
                    disabled: true
                  },
                  { title: 'Invite Friends', Icon: IconAddUser },
                  {
                    title: 'Feedback', Icon: IconStar,
                    badge: getSidebarBadge['SOON'],
                    disabled: true
                  },
                ]}
                footerItems={[
                  { title: 'Support', Icon: IconLifeBuoy },
                  {
                    title: 'Follow Us',
                    Icon: IconX,
                    type: 'link',
                    href: 'https://twitter.com/mochi_gg_',
                  },
                  {
                    title: 'Join Community',
                    Icon: IconDiscord,
                    type: 'link',
                    href: DISCORD_LINK,
                  },
                ]}
                className="absolute"
                isSelected={(item) =>
                  !!item.href && pathname.startsWith(item.href)
                }
              />
            </div>
            <div
              className={clsx(
                'flex items-start gap-x-24 mx-auto flex-1 relative',
                {
                  'max-w-5xl my-10 px-4': !fullWidth,
                },
              )}
            >
              <div className="flex-1 h-full">
                {childSEO}
                {children}
              </div>
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
      {footer}
    </div>
  )
}
