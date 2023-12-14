import { useState } from 'react'
import { useHasMounted } from '@dwarvesf/react-hooks'
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
  ChevronLeftLine,
  CloseLine,
  ChevronDownLine,
  ThreeDotLoading,
  Spinner,
  CheckLine,
  CategorySolid,
} from '@mochi-ui/icons'
import {
  Sidebar,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  IconButton,
  Avatar,
  Typography,
  Button,
  Item,
  useLoginWidget,
  LoginWidget,
} from '@mochi-ui/core'
import { Layout } from '@mochi-ui/layout'
import { PageContent } from '@mochi-ui/page-content'
import { DISCORD_LINK, TWITTER_LINK } from '~envs'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import clsx from 'clsx'
import { NativeImage } from './NativeImage'
import { useSidebarContext } from '../context/app/sidebar'
import { ViewApplication } from '../types/mochi-pay-schema'
import { matchUrl } from '../utils/url'

const MainSidebarHeader = ({ expanded }: { expanded?: boolean }) => {
  return expanded ? (
    <NativeImage
      alt="header"
      className="object-cover h-20 w-[240px]"
      src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
    />
  ) : (
    <span />
  )
}

const AppDropdownOption = ({
  data,
  onOptionSelect,
  isSelected = false,
}: {
  data: ViewApplication
  onOptionSelect: () => void
  isSelected?: boolean
}) => {
  const { push } = useRouter()

  const optionContent = (
    <div className="flex gap-3.5 justify-start items-center w-full">
      <Avatar src={data?.avatar || ''} />
      <div className="flex-1 max-w-[94px]">
        <Typography
          fontWeight="md"
          level="p5"
          color="textPrimary"
          className="text-left !tracking-normal truncate"
        >
          {data?.name || ''}
        </Typography>
      </div>
      {isSelected ? <CheckLine className="text-primary-plain-fg" /> : null}
    </div>
  )

  return isSelected ? (
    <div className="!px-2.5 !py-2 w-full">{optionContent}</div>
  ) : (
    <Button
      variant="ghost"
      color="neutral"
      className="w-full !justify-between !px-2.5 !py-2 !h-max"
      onClick={() => {
        push(ROUTES.APPLICATION_DETAIL.getPath(String(data?.id) || ''))
        onOptionSelect()
      }}
    >
      {optionContent}
    </Button>
  )
}

const ApplicationDetailSidebarHeader = ({
  expanded,
}: {
  expanded?: boolean
}) => {
  const { selectedApp, isSelectedAppLoading, appList, isAppListLoading } =
    useSidebarContext()
  const { push, query } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return expanded ? (
    <div className="relative h-20 w-[240px] bg-neutral-solid-active">
      <NativeImage
        alt="header"
        className="absolute top-0 left-0 object-cover w-full h-full opacity-50"
        src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
      />
      <div className="absolute top-0 left-0 z-50 flex items-stretch justify-center w-full h-full">
        {!isSelectedAppLoading && selectedApp ? (
          <div className="flex items-center w-full">
            <IconButton
              variant="link"
              color="info"
              label="Back"
              onClick={() => push(ROUTES.APPLICATON_LIST)}
            >
              <ChevronLeftLine className="text-2xl shrink-0 text-text-contrast" />
            </IconButton>

            <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <DropdownMenuTrigger className="flex items-center justify-between flex-1 gap-4 pr-6">
                <div className="flex items-center flex-1 gap-3">
                  <Avatar src={selectedApp?.avatar || ''} />
                  <h3 className="text-left text-sm font-semibold text-text-contrast max-w-[100px] truncate">
                    {selectedApp?.name || ''}
                  </h3>
                </div>
                {isOpen ? (
                  <CloseLine className="text-text-contrast" />
                ) : (
                  <ChevronDownLine className="text-text-contrast" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-7 -ml-6 !min-w-[216px] max-h-[320px] overflow-auto">
                <div className="flex flex-col items-center w-full gap-1">
                  {!isAppListLoading && appList !== undefined ? (
                    appList.map((app) => (
                      <AppDropdownOption
                        data={app}
                        key={app.id}
                        isSelected={
                          !!query?.id && (query.id as string) === String(app.id)
                        }
                        onOptionSelect={() => setIsOpen(false)}
                      />
                    ))
                  ) : (
                    <Spinner className="text-2xl shrink-0 text-text-primary" />
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <ThreeDotLoading className="text-4xl text-text-contrast" />
          </div>
        )}
      </div>
    </div>
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
  const { pathname, query } = useRouter()
  const mounted = useHasMounted()
  const { isLoggedIn, isLoggingIn } = useLoginWidget()

  const { variant } = useSidebarContext()

  if (!mounted) {
    return childSEO as JSX.Element
  }

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

  return (
    <Layout>
      {!isLoggingIn && isLoggedIn ? (
        <Layout className="flex-1">
          <Sidebar
            Header={sideBarItems[variant].Header}
            headerItems={sideBarItems[variant].headerItems as Item[]}
            footerItems={sideBarItems[variant].footerItems as Item[]}
            isSelected={(item) => !!item.href && matchUrl(item.href, pathname)}
            className="!h-[calc(100vh-56px)]"
          />

          <Layout
            className={clsx(
              'flex-1 max-w-[calc(100vw-72px)] h-[calc(100vh-56px)]',
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

      {!isLoggingIn && !isLoggedIn ? (
        <div className="flex items-center justify-center flex-1 w-full !min-h-[calc(100vh-56px)] bg-black/40">
          <LoginWidget />
        </div>
      ) : null}

      {footer}
    </Layout>
  )
}
