import { useHasMounted } from '@dwarvesf/react-hooks'
import { useAuthStore } from '~store'
import Link from 'next/link'
import {
  LifeBuoySolid,
  X,
  Discord,
  AddUserSolid,
  CodingSolid,
  SettingSolid,
  UserSolid,
  TwinkleSolid,
} from '@consolelabs/icons'
import { Sidebar, Badge } from '@consolelabs/core'
import { Layout } from '@consolelabs/layout'
import { PageContent } from '@consolelabs/page-content'
import { DISCORD_LINK, TWITTER_LINK } from '~envs'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import clsx from 'clsx'
import { AuthPanel } from './AuthWidget'
import { NativeImage } from './NativeImage'

const SidebarHeader = ({ expanded }: { expanded?: boolean }) => {
  return expanded ? (
    <NativeImage
      alt="header"
      className="object-cover w-full h-20"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  ) : (
    <span />
  )
}

export const getSidebarBadge = {
  NEW: <Badge icon={<TwinkleSolid />} label="New" appearance="success" />,
  FEATURED: <Badge label="Featured" appearance="primary" />,
  SOON: <Badge label="Soon" appearance="secondary" />,
  FREE_TRIAL: <Badge label="Free trial" appearance="warning" />,
} as const

export default function AuthenticatedLayout({
  children,
  pageHeader,
  footer,
  childSEO,
  className,
}: {
  childSEO?: React.ReactNode
  children: React.ReactNode
  pageHeader?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}) {
  const { pathname } = useRouter()
  const mounted = useHasMounted()
  const { isLoggedIn, isLoadingSession } = useAuthStore()

  if (!mounted) {
    return childSEO
  }

  return (
    <Layout className="w-screen bg-white-pure">
      {!isLoadingSession && isLoggedIn ? (
        <Layout className="flex-1">
          <Sidebar
            Header={SidebarHeader}
            headerItems={[
              {
                title: 'Profile',
                Icon: UserSolid,
                type: 'link',
                as: Link,
                href: ROUTES.MY_PROFILE,
              },
              { title: 'Servers', Icon: Discord },
              { title: 'Settings', Icon: SettingSolid },
              {
                title: 'Developer',
                Icon: CodingSolid,
                type: 'link',
                as: Link,
                href: ROUTES.APPLICATON_LIST,
                badge: getSidebarBadge['NEW'],
              },
              { title: 'Invite Friends', Icon: AddUserSolid },
            ]}
            footerItems={[
              { title: 'Support', Icon: LifeBuoySolid },
              {
                title: 'Follow Us',
                Icon: X,
                type: 'link',
                href: TWITTER_LINK,
              },
              {
                title: 'Join Community',
                Icon: Discord,
                type: 'link',
                href: DISCORD_LINK,
              },
            ]}
            className="!sticky !top-16 !h-[calc(100vh-64px)]"
            isSelected={(item) => !!item.href && pathname.startsWith(item.href)}
          />

          <Layout
            className={clsx(
              'flex-1 max-w-[calc(100vw-72px)] h-[calc(100vh-64px)]',
              className,
            )}
          >
            {pageHeader}

            <PageContent>
              {childSEO}
              {children}
            </PageContent>
          </Layout>
        </Layout>
      ) : null}

      {!isLoadingSession && !isLoggedIn ? (
        <div className="flex items-center justify-center flex-1 w-full !min-h-[calc(100vh-64px)] bg-black/40">
          <AuthPanel />
        </div>
      ) : null}

      {footer}
    </Layout>
  )
}
