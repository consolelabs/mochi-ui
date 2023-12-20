import Link from 'next/link'
import {
  LifeBuoySolid,
  X,
  Discord,
  AddUserSolid,
  CodingSolid,
  SettingSolid,
  TwinkleSolid,
  SafeBoxSolid,
  HomeSolid,
  CategorySolid,
} from '@mochi-ui/icons'
import {
  Sidebar,
  Badge,
  Item,
  useLoginWidget,
  LoginWidget,
} from '@mochi-ui/core'
import { Layout } from '@mochi-ui/layout'
import { DISCORD_LINK, TWITTER_LINK } from '~envs'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import clsx from 'clsx'
import { useSidebarContext } from '../context/app/sidebar'
import { matchUrl } from '../utils/url'
import { DashboardSkeleton } from './DashboardSkeleton'
import { MainSidebarHeader } from './MainSidebarHeader'
import { ApplicationDetailSidebarHeader } from './ApplicationDetailSidebarHeader'

export const getSidebarBadge = {
  NEW: <Badge icon={<TwinkleSolid />} label="New" appearance="success" />,
  FEATURED: <Badge label="Featured" appearance="primary" />,
  SOON: <Badge label="Soon" appearance="secondary" />,
  FREE_TRIAL: <Badge label="Free trial" appearance="warning" />,
} as const

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export default function DashboardLayout({
  children,
  className,
}: DashboardLayoutProps) {
  const { pathname, query } = useRouter()
  const { isLoggedIn, isLoggingIn, isLoadingProfile } = useLoginWidget()

  const { variant } = useSidebarContext()

  const sideBarItems = {
    main: {
      Header: MainSidebarHeader,
      headerItems: [
        {
          title: 'Overview',
          Icon: CategorySolid,
          type: 'link',
          as: Link,
          href: ROUTES.MY_PROFILE,
        },
        { title: 'Servers', Icon: Discord },
        {
          title: 'Settings',
          type: 'link',
          Icon: SettingSolid,
          as: Link,
          href: ROUTES.SETTINGS(),
        },
        {
          title: 'Developer',
          Icon: CodingSolid,
          type: 'link',
          as: Link,
          href: ROUTES.APPLICATON_LIST,
          badge: getSidebarBadge['NEW'],
        },
        { title: 'Invite Friends', Icon: AddUserSolid },
      ],
      footerItems: [
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
      ],
    },
    'app-detail': {
      Header: ApplicationDetailSidebarHeader,
      headerItems: [
        {
          title: 'Overview',
          Icon: HomeSolid,
          type: 'link',
          as: Link,
          href: ROUTES.APPLICATION_DETAIL.getPath(query?.id as string),
        },
        {
          title: 'Revenue',
          Icon: SafeBoxSolid,
          type: 'link',
          as: Link,
          href: ROUTES.APPLICATION_DETAIL_REVENUE.getPath(query?.id as string),
        },
      ],
      footerItems: [],
    },
  }

  if (isLoggingIn || isLoadingProfile) {
    return <DashboardSkeleton />
  }

  return (
    <Layout>
      {isLoggedIn ? (
        <Layout className="flex-1">
          <Sidebar
            Header={sideBarItems[variant].Header}
            headerItems={sideBarItems[variant].headerItems as Item[]}
            footerItems={sideBarItems[variant].footerItems as Item[]}
            isSelected={(item) => !!item.href && matchUrl(item.href, pathname)}
            className="!h-[calc(100vh-56px)] hidden lg:block"
          />

          <Layout
            className={clsx(
              'flex-1 w-screen lg:w-full h-[calc(100vh-56px)]',
              className,
            )}
          >
            {children}
          </Layout>
        </Layout>
      ) : (
        <div className="flex items-center justify-center flex-1 w-full !min-h-[calc(100vh-56px)] bg-black/40">
          <div className="p-5 rounded-lg shadow-md bg-white-pure">
            <LoginWidget raw />
          </div>
        </div>
      )}
    </Layout>
  )
}
