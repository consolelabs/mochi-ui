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
  SafeBoxSolid,
  HomeSolid,
  ChevronLeftLine,
  CloseLine,
  ChevronDownLine,
  ThreeDotLoading,
  Spinner,
  CheckLine,
} from '@consolelabs/icons'
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
} from '@consolelabs/core'
import { Layout } from '@consolelabs/layout'
import { PageContent } from '@consolelabs/page-content'
import { DISCORD_LINK, TWITTER_LINK } from '~envs'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import clsx from 'clsx'
import { useState } from 'react'
import { AuthPanel } from './AuthWidget'
import { NativeImage } from './NativeImage'
import { useSidebarContext } from '../context/app/sidebar'
import { APPLICATION_DETAIL_ROUTE_REGEX } from '../constants/regex'
import { ViewApplication } from '../types/mochi-pay-schema'

const MainSidebarHeader = ({ expanded }: { expanded?: boolean }) => {
  return expanded ? (
    <NativeImage
      alt="header"
      className="object-cover w-[240px] h-20"
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
    <div className="w-full flex justify-between items-center gap-3.5">
      <Avatar src={data?.avatar || ''} />
      <Typography className="text-text-primary text-left !font-medium !text-sm flex-1 !tracking-normal">
        {data?.name || ''}
      </Typography>
      {isSelected ? <CheckLine className="text-primary-solid" /> : null}
    </div>
  )

  return isSelected ? (
    <div className="!px-2.5 !py-2 w-full">{optionContent}</div>
  ) : (
    <Button
      variant="ghost"
      className="w-full !justify-between !px-2.5 !py-2 !h-max"
      onClick={() => {
        push(ROUTES.APPLICATION_DETAIL(String(data?.id) || ''))
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
    <div className="relative w-[240px] h-20 bg-neutral-solid-active">
      <NativeImage
        alt="header"
        className="object-cover w-full h-full absolute top-0 left-0 opacity-50"
        src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
      />

      <div className="absolute w-full h-full top-0 left-0 flex z-50 justify-center items-center">
        {!isSelectedAppLoading && selectedApp ? (
          <div className="flex w-full items-center">
            <IconButton
              variant="link"
              color="info"
              onClick={() => push(ROUTES.APPLICATON_LIST)}
            >
              <ChevronLeftLine className="text-2xl shrink-0 text-neutral-solid-fg" />
            </IconButton>

            <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
              <DropdownMenuTrigger className="flex-1 flex items-center justify-between gap-4 pr-6">
                <div className="flex-1 flex items-center gap-3">
                  <Avatar src={selectedApp?.avatar || ''} />
                  <Typography
                    fontWeight="lg"
                    className="!text-neutral-solid-fg text-sm"
                  >
                    {selectedApp?.name || ''}
                  </Typography>
                </div>
                {isOpen ? (
                  <CloseLine className="text-neutral-solid-fg" />
                ) : (
                  <ChevronDownLine className="text-neutral-solid-fg" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-7 -ml-6 !min-w-[216px] flex flex-col items-center gap-1">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <ThreeDotLoading className="text-neutral-solid-fg text-3xl" />
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
  const { pathname } = useRouter()
  const mounted = useHasMounted()
  const { isLoggedIn, isLoadingSession } = useAuthStore()

  const { variant } = useSidebarContext()

  if (!mounted) {
    return childSEO
  }

  return (
    <Layout className="w-screen min-h-screen bg-white-pure">
      {!isLoadingSession && isLoggedIn ? (
        <Layout className="flex-1">
          <Sidebar
            Header={
              variant === 'main'
                ? MainSidebarHeader
                : ApplicationDetailSidebarHeader
            }
            headerItems={
              variant === 'main'
                ? [
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
                  ]
                : [
                    {
                      title: 'Overview',
                      Icon: HomeSolid,
                      pattern: APPLICATION_DETAIL_ROUTE_REGEX,
                    },
                    { title: 'Revenue', Icon: SafeBoxSolid },
                  ]
            }
            footerItems={
              variant === 'main'
                ? [
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
                  ]
                : []
            }
            className="!sticky !top-16 !h-[calc(100vh-64px)]"
            isSelected={(item) =>
              (!!item.href && pathname.startsWith(item.href)) ||
              (!!item.pattern && item.pattern.test(pathname))
            }
          />

          <Layout
            className={clsx('flex-1 max-w-[calc(100vw-72px)]', className)}
          >
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
