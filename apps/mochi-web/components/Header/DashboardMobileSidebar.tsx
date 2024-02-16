import Link from 'next/link'
import { appVersion } from '~constants/common'
import {
  LifeBuoySolid,
  X,
  Discord,
  AddUserSolid,
  CodingSolid,
  GearSolid,
  SafeBoxSolid,
  HomeSolid,
  CategorySolid,
  CloseLine,
  MenuSolid,
} from '@mochi-ui/icons'
import {
  Button,
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerProps,
  Sidebar,
  Item,
} from '@mochi-ui/core'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { useState } from 'react'
import { useSidebarContext } from '../../context/app/sidebar'
import { ROUTES } from '../../constants/routes'
import { MainSidebarHeader } from '../MainSidebarHeader'
import { getSidebarBadge } from '../DashboardLayout'
import { DISCORD_LINK, TWITTER_LINK } from '../../envs'
import { ApplicationDetailSidebarHeader } from '../ApplicationDetailSidebarHeader'
import { matchUrl } from '../../utils/url'

export const DashboardMobileSidebar = (
  props: DrawerProps & { triggerClassName?: string; contentClassName?: string },
) => {
  const { triggerClassName, contentClassName, ...rest } = props
  const { pathname, query } = useRouter()
  const { variant } = useSidebarContext()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
          onClick: () => setIsSidebarOpen(false),
        },
        {
          title: 'Servers',
          Icon: Discord,
          onClick: () => setIsSidebarOpen(false),
        },
        {
          title: 'Settings',
          type: 'link',
          Icon: GearSolid,
          as: Link,
          href: ROUTES.SETTINGS(),
          onClick: () => setIsSidebarOpen(false),
        },
        {
          title: 'Developer',
          Icon: CodingSolid,
          type: 'link',
          as: Link,
          href: ROUTES.APPLICATON_LIST,
          badge: getSidebarBadge['NEW'],
          onClick: () => setIsSidebarOpen(false),
        },
        {
          title: 'Invite Friends',
          Icon: AddUserSolid,
          onClick: () => setIsSidebarOpen(false),
        },
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
          onClick: () => setIsSidebarOpen(false),
        },
        {
          title: 'Revenue',
          Icon: SafeBoxSolid,
          type: 'link',
          as: Link,
          href: ROUTES.APPLICATION_DETAIL_REVENUE.getPath(query?.id as string),
          onClick: () => setIsSidebarOpen(false),
        },
      ],
      footerItems: [],
    },
  }

  return (
    <Drawer
      {...rest}
      onOpenChange={() => setIsSidebarOpen(!isSidebarOpen)}
      open={isSidebarOpen}
    >
      <DrawerTrigger asChild className={triggerClassName}>
        <Button
          size="lg"
          variant="link"
          color="neutral"
          className="!px-0 h-8 w-8"
        >
          {isSidebarOpen ? (
            <CloseLine className="text-2xl text-text-tertiary" aria-hidden />
          ) : (
            <MenuSolid className="text-2xl text-text-primary" aria-hidden />
          )}
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className={contentClassName} />
        <DrawerContent
          className={clsx('text-center w-[240px]', contentClassName)}
        >
          <Sidebar
            Header={sideBarItems[variant].Header}
            headerItems={sideBarItems[variant].headerItems as Item[]}
            footerItems={sideBarItems[variant].footerItems as Item[]}
            isSelected={(item) => !!item.href && matchUrl(item.href, pathname)}
            expanded
            className="!h-[calc(100vh-56px)] !border-none"
            version={appVersion}
          />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}
