import Image from 'next/image'
import { logo } from '~utils/image'
import clsx from 'clsx'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { useAuthStore, useProfileStore } from '~store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ProfileDropdown from './profile-dropdrown'
import Login from './login'
import {
  ProfileBadge,
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
} from '@consolelabs/ui-components'
import { DISCORD_LINK } from '~envs'

const authenticatedRoute = ['/profile', '/app', '/server']

const Header = () => {
  return (
    <img
      alt="header"
      className="object-cover w-full h-20"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  )
}

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
  const { me } = useProfileStore()
  const { isLoggedIn, isLoadingSession } = useAuthStore()

  if (!mounted) return <>{childSEO}</>

  return (
    <div className="flex flex-col w-screen min-h-screen bg-dashboard-gray-1">
      <div
        className={clsx(
          'sticky top-0 flex px-3 py-5 md:px-7 flex-shrink-0 justify-between z-20',
          {
            'border-b border-b-dashboard-gray-6 bg-dashboard-gray-5':
              isLoggedIn || !authenticatedRoute.includes(pathname),
            'bg-dashboard-gray-1':
              !isLoggedIn && authenticatedRoute.includes(pathname),
          },
        )}
      >
        <Link href="/" className="flex gap-x-2 items-center">
          <Image
            src={logo}
            alt="Logo"
            width={32}
            height={32}
            className="block rounded-full"
          />
          <span className="text-xl font-black uppercase text-foreground">
            Mochi<span className="text-mochi">.</span>
          </span>
          <span className="text-base text-gray-500">Dashboard</span>
        </Link>
        {isLoggedIn && me ? (
          <div className="flex gap-x-5 items-center">
            <span className="text-sm font-medium">See Docs</span>
            <ProfileBadge
              avatar={me.avatar}
              name={me.profile_name}
              platform={me.platformIcon}
            />
            <ProfileDropdown />
          </div>
        ) : null}
      </div>
      <div className="flex relative z-10 flex-1">
        {isLoadingSession ? null : isLoggedIn ? (
          <>
            <div
              style={{ top: 80, height: 'calc(100vh - 80px)' }}
              className="sticky left-0 z-10"
            >
              <Sidebar
                Header={Header}
                headerItems={[
                  {
                    title: 'Profile',
                    Icon: IconUser,
                    type: 'link',
                    as: Link,
                    href: '/profile',
                  },
                  { title: 'Server', Icon: IconDiscord },
                  { title: 'App Store', Icon: IconGame },
                  { title: 'Settings', Icon: IconSetting },
                  { type: 'break' },
                  {
                    title: 'Developer',
                    Icon: IconCoding,
                    type: 'link',
                    as: Link,
                    href: '/app',
                  },
                  { title: 'Gift your friend', Icon: IconSuperGroup },
                  { title: 'Invite Friends', Icon: IconAddUser },
                  { title: 'Feedback', Icon: IconStar },
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
              />
            </div>
            <div
              className={clsx(
                'flex items-start gap-x-24 mx-auto w-full max-w-full relative',
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
