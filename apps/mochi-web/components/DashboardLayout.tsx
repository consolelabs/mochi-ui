import Link from 'next/link'
import {
  LifeBuoySolid,
  X,
  Discord,
  AddUserSolid,
  CodingSolid,
  GearSolid,
  TwinkleSolid,
  SafeBoxSolid,
  HomeSolid,
  CategorySolid,
} from '@mochi-ui/icons'
import { Sidebar, Badge, Item, BadgeIcon } from '@mochi-ui/core'
import { Layout } from '@mochi-ui/layout'
import { DISCORD_LINK, TWITTER_LINK } from '~envs'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import clsx from 'clsx'
import { LoginWidget, useLoginWidget } from '@mochi-web3/login-widget'
import { appVersion } from '~constants/common'
import { useTheme } from '~context/theme'
import { useSidebarContext } from '../context/app/sidebar'
import { matchUrl } from '../utils/url'
import { DashboardSkeleton } from './DashboardSkeleton'
import { MainSidebarHeader } from './MainSidebarHeader'
import { ApplicationDetailSidebarHeader } from './ApplicationDetailSidebarHeader'

export const getSidebarBadge = {
  NEW: (
    <Badge appearance="success">
      <BadgeIcon>
        <TwinkleSolid />
      </BadgeIcon>
      New
    </Badge>
  ),
  FEATURED: <Badge appearance="primary">Featured</Badge>,
  SOON: <Badge appearance="secondary">Soon</Badge>,
  FREE_TRIAL: <Badge appearance="warning">Free trial</Badge>,
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
  const { theme } = useTheme()
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
          selectedIconClassName: theme === 'dark' ? '!text-primary-500' : '',
        },
        {
          title: 'Servers',
          Icon: Discord,
          selectedIconClassName: theme === 'dark' ? '!text-primary-500' : '',
        },
        {
          title: 'Settings',
          type: 'link',
          Icon: GearSolid,
          as: Link,
          href: ROUTES.SETTINGS(),
          selectedIconClassName: theme === 'dark' ? '!text-primary-500' : '',
        },
        {
          title: 'Developer',
          Icon: CodingSolid,
          type: 'link',
          as: Link,
          href: ROUTES.APPLICATON_LIST,
          badge: getSidebarBadge['NEW'],
          selectedIconClassName: theme === 'dark' ? '!text-primary-500' : '',
        },
        {
          title: 'Invite Friends',
          Icon: AddUserSolid,
          selectedIconClassName: theme === 'dark' ? '!text-primary-500' : '',
        },
      ],
      footerItems: [
        {
          title: 'Support',
          type: 'link',
          href: DISCORD_LINK,
          Icon: LifeBuoySolid,
        },
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
            version={appVersion}
          />

          <Layout
            className={
              // TODO: (thanh) if not setting a fixed width here the content will go overflow
              // I still cannot get why it's like that so leaving a todo for future investigation
              clsx('flex-1 w-10 h-[calc(100vh-56px)]', className)
            }
          >
            {children}
          </Layout>
        </Layout>
      ) : (
        <div className="flex items-center justify-center flex-1 w-full !min-h-[calc(100vh-56px)] bg-background-backdrop">
          <div className="p-5 rounded-lg shadow-md bg-background-popup">
            <LoginWidget raw />
          </div>
        </div>
      )}
    </Layout>
  )
}
