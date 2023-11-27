import { useHasMounted } from '@dwarvesf/react-hooks'
import { useAuthStore } from '~store'
import Link from 'next/link'
import {
  LifeBuoySolid,
  X,
  Discord,
  StarSolid,
  AddUserSolid,
  CodingSolid,
  SettingSolid,
  GameSolid,
  UserSolid,
  SuperGroupSolid,
  TwinkleSolid,
} from '@consolelabs/icons'
import { Sidebar, Badge } from '@consolelabs/core'
import { Layout } from '@consolelabs/layout'
import { PageContent } from '@consolelabs/page-content'
import { DISCORD_LINK } from '~envs'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import { AuthPanel } from './AuthWidget'

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
}: {
  childSEO?: React.ReactNode
  children: React.ReactNode
  pageHeader?: React.ReactNode
  footer?: React.ReactNode
}) {
  const { pathname } = useRouter()
  const mounted = useHasMounted()
  const { isLoggedIn, isLoadingSession } = useAuthStore()

  if (!mounted) return <>{childSEO}</>

  return (
    <Layout className="w-screen min-h-screen bg-white-pure">
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
              {
                title: 'App Store',
                Icon: GameSolid,
                badge: getSidebarBadge['SOON'],
                disabled: true,
              },
              { title: 'Settings', Icon: SettingSolid },
              { type: 'break' },
              {
                title: 'Developer',
                Icon: CodingSolid,
                type: 'link',
                as: Link,
                href: ROUTES.APPLICATON_LIST,
                badge: getSidebarBadge['NEW'],
              },
              {
                title: 'Send gifts',
                Icon: SuperGroupSolid,
                badge: getSidebarBadge['SOON'],
                disabled: true,
              },
              { title: 'Invite Friends', Icon: AddUserSolid },
              {
                title: 'Feedback',
                Icon: StarSolid,
                badge: getSidebarBadge['SOON'],
                disabled: true,
              },
            ]}
            footerItems={[
              { title: 'Support', Icon: LifeBuoySolid },
              {
                title: 'Follow Us',
                Icon: X,
                type: 'link',
                href: 'https://twitter.com/mochi_gg_',
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

          <Layout className="flex-1 max-w-[calc(100vw-72px)]">
            {pageHeader}

            <PageContent>
              <div className="relative flex items-start flex-1 mx-auto gap-x-24">
                <div className="flex-1 h-full max-w-full">
                  {childSEO}
                  {children}
                </div>
              </div>
            </PageContent>
          </Layout>
        </Layout>
      ) : null}

      {!isLoadingSession && !isLoggedIn ? (
        <div className="flex items-center justify-center flex-1 w-full bg-black/40">
          <AuthPanel />
        </div>
      ) : null}

      {footer}
    </Layout>
  )
}
