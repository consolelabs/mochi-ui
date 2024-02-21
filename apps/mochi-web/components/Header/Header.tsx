'use client'

import { isMobile } from '~utils/isMobile'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  IconButton,
  LogoWithText,
  Typography,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  TopBar,
  MobileNav,
  DesktopNav,
  Avatar,
  PopoverPortal,
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
} from '@mochi-ui/core'
import {
  DiscordColored,
  TelegramColored,
  SlackColored,
  AppleColored,
  ChromeColored,
  TipSolid,
  MagnifierLine,
  WalletSolid,
  CodingSolid,
  Github,
  DocumentStarSolid,
  DollarBubbleSolid,
  LinkSquircledSolid,
  WalletAddSolid,
  MoonLine,
  SunLine,
} from '@mochi-ui/icons'
import { useTheme } from '~context/theme'
import NotificationList from '~cpn/NotificationList'
import clsx from 'clsx'
import { DISCORD_LINK, GITHUB_LINK, TELEGRAM_LINK } from '~envs'
import { useCallback, useState } from 'react'
import events from '~constants/events'
import { LoginWidget, useLoginWidget } from '@mochi-web3/login-widget'
import ProfileDropdown from '~cpn/ProfileDropdown'
import NotificationModal from '~cpn/NotificationList/NotificationModal'
import { useFetchChangelogLatest } from '~hooks/app/useFetchChangelogLatest'
import { MobileNavAccordionItem } from './MobileNavAccordionItem'
import { DashboardMobileSidebar } from './DashboardMobileSidebar'
import { useIsNavOpenStore } from './util'

const authenticatedRoute = [
  ROUTES.MY_PROFILE,
  ROUTES.APPLICATON_LIST,
  '/server',
]

const LoginPopover = () => {
  const { isLoadingProfile } = useLoginWidget()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        className="text-left"
        asChild
        // wrap Button by div to prevent event loss when use `asChild` props
      >
        <div>
          <Button className="justify-center w-20" loading={isLoadingProfile}>
            Login
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="!p-3" sideOffset={10} collisionPadding={20}>
          <LoginWidget raw />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

export const Header = () => {
  const { pathname, push } = useRouter()
  const { profile, isLoggedIn, socials } = useLoginWidget()
  const { setIsNavOpen } = useIsNavOpenStore()
  const { data: changelogData } = useFetchChangelogLatest()
  const { theme, setTheme } = useTheme()

  const redirectToTipWidget = useCallback(async () => {
    if (pathname !== ROUTES.HOME) {
      await push(ROUTES.HOME)
    }
    window.dispatchEvent(new Event(events.TIP_WIDGET.FOCUS_AMOUNT))
  }, [pathname, push])

  const mobileNavItems = [
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <div
      key="mobile-nav-login"
      className="flex flex-col gap-y-3 pb-3 border-b border-divider"
    >
      <Typography level="h6" fontWeight="md" color="textPrimary">
        Login
      </Typography>
      <Button size="lg">
        <WalletAddSolid className="w-6 h-6" />
        Connect Wallet
      </Button>
      <Typography level="p5" color="textTertiary" className="!font-light">
        Don&apos;t have a crypto wallet? Login social instead.
      </Typography>
      <div className="flex flex-wrap gap-2">
        {socials.map((social) => {
          return (
            <IconButton
              label=""
              type="button"
              key={social.name}
              onClick={() =>
                social.onClick?.(window.location.href.split('#')[0])
              }
              disabled={social.disabled}
              variant="outline"
              color="neutral"
              size="lg"
              className="!p-2 flex justify-center items-center !w-12 !h-12"
            >
              {social.icon}
            </IconButton>
          )
        })}
      </div>
    </div>,
    <Link
      href={ROUTES.EXPLORE}
      className="flex items-center py-3 px-2 text-sm"
      key="mobile-nav-api"
    >
      <Typography
        level="p6"
        color="neutral"
        className="!text-base transition-colors duration-300 hover:!text-primary-plain-fg"
      >
        Explore
      </Typography>
    </Link>,
    <Link
      href={ROUTES.DEVELOPER}
      className="flex items-center py-3 px-2 text-sm"
      key="mobile-nav-api"
    >
      <Typography
        level="p6"
        color="neutral"
        className="!text-base transition-colors duration-300 hover:!text-primary-plain-fg"
      >
        Developer
      </Typography>
    </Link>,
    <MobileNavAccordionItem
      key="mobile-nav-accordion-resource"
      label="Resources"
      items={[
        {
          title: '',
          data: [
            {
              label: 'Documentation',
              iconLeft: <CodingSolid />,
              href: '#',
            },
            {
              label: 'Github',
              iconLeft: <Github />,
              href: '#',
            },
            {
              label: 'Changelog',
              iconLeft: <DocumentStarSolid />,
              href: '#',
            },
          ],
        },
      ]}
    />,
    <MobileNavAccordionItem
      key="mobile-nav-accordion-download"
      label="Download"
      items={[
        {
          title: '',
          data: [
            {
              label: 'Discord',
              iconLeft: <DiscordColored />,
              href: '#',
            },
            {
              label: 'Telegram',
              iconLeft: <TelegramColored />,
              href: '#',
            },
          ],
        },
        {
          title: 'Soon available on',
          data: [
            {
              label: <span className="text-text-tertiary">Extension</span>,
              iconLeft: <ChromeColored />,
              href: '#',
            },
            {
              label: <span className="text-text-tertiary">Discord</span>,
              iconLeft: <SlackColored className="opacity-50" />,
              href: '#',
            },
            {
              label: <span className="text-text-tertiary">iOS</span>,
              iconLeft: <AppleColored className="opacity-50" />,
              href: '#',
            },
          ],
        },
      ]}
    />,
  ]

  const desktopNavItems = [
    ...(isLoggedIn && profile
      ? [
          <div
            className="flex gap-x-2 items-stretch mr-1 lg:gap-x-3 lg:mr-0"
            key="desktop-nav-items"
          >
            <div
              className={clsx('hidden lg:flex gap-x-2 items-center w-[400px]')}
            >
              <MagnifierLine />
              <input
                className="flex-1 text-sm bg-transparent outline-none placeholder:text-text-disabled"
                placeholder="Search token, ID or address"
              />
              <div className="flex gap-x-1">
                <span
                  style={{
                    boxShadow: '0px 2px 0px 0px rgba(212, 211, 208, 1)',
                  }}
                  className="text-center leading-[1.1rem] rounded-sm font-mono w-4 h-4 bg-[#eeedec] text-black"
                >
                  ⌘
                </span>
                <span
                  style={{
                    boxShadow: '0px 2px 0px 0px rgba(212, 211, 208, 1)',
                  }}
                  className="text-[10px] text-center leading-[1.1rem] rounded-sm font-mono w-4 h-4 bg-[#eeedec] text-black"
                >
                  K
                </span>
              </div>
            </div>
            <div className="hidden py-1.5 ml-2 w-px lg:block">
              <div className="w-full h-full bg-divider" />
            </div>
            <Button
              onClick={redirectToTipWidget}
              size="md"
              className="hidden lg:flex"
            >
              <TipSolid />
              Tip
            </Button>
            {[
              <DollarBubbleSolid
                key="header-icon-button-1"
                className="mx-auto w-5 h-5 align-middle text-text-primary"
              />,
              // <DollarBubbleCircleSolid
              //   key="header-icon-button-1"
              //   className="w-full h-full text-text-primary"
              // />,
              <LinkSquircledSolid
                key="header-icon-button-2"
                className="mx-auto w-5 h-5 align-middle text-text-primary"
              />,
            ].map((icon) => {
              return (
                <IconButton
                  key={icon.key}
                  color="neutral"
                  variant="outline"
                  label=""
                  className="!p-1 !w-8 !h-8 my-auto hidden lg:block"
                >
                  {icon}
                </IconButton>
              )
            })}
            <NotificationList key="header-icon-button-3" />
            <IconButton
              className="!w-5 !h-5 self-center lg:hidden"
              color="neutral"
              label="search"
              variant="link"
            >
              <MagnifierLine className="w-full h-full text-text-primary" />
            </IconButton>
            <NotificationModal />
            <IconButton
              className="!w-6 !h-6 self-center lg:hidden"
              color="neutral"
              label="scan"
              variant="link"
              onClick={redirectToTipWidget}
            >
              <TipSolid className="w-full h-full text-text-primary" />
            </IconButton>
          </div>,
          <ProfileDropdown
            className="hidden lg:flex"
            key="desktop-profile-dropdown-with-badge"
          />,
          <ProfileDropdown
            className="flex lg:hidden"
            key="desktop-profile-dropdown"
          >
            <Button variant="link" className="!px-0 relative">
              <Avatar src={profile?.avatar || '/logo.png'} />
              <div className="absolute -right-1 -bottom-1 p-0.5 rounded-full bg-background-surface">
                <WalletSolid className="text-sm text-text-primary" />
              </div>
            </Button>
          </ProfileDropdown>,
        ]
      : [
          <Link
            href={ROUTES.EXPLORE}
            className={clsx(
              'px-4 text-sm font-medium transition-colors duration-300 hover:text-primary-plain-fg',
              {
                'text-primary-plain-fg': pathname === ROUTES.EXPLORE,
              },
            )}
            key="desktop-nav-explore"
          >
            Explore
          </Link>,
          <Link
            href={ROUTES.FEATURES}
            className={clsx(
              'hidden px-4 text-sm font-medium transition-colors duration-300 hover:text-primary-plain-fg',
              {
                'text-primary-plain-fg': pathname === ROUTES.FEATURES,
              },
            )}
            key="desktop-nav-features"
          >
            Features
          </Link>,
          <Link
            href={ROUTES.DEVELOPER}
            className="px-4 text-sm font-medium transition-colors duration-300 hover:text-primary-plain-fg"
            key="desktop-nav-api"
          >
            Developer
          </Link>,
          <DropdownMenu key="desktop-nav-dropdown">
            <DropdownMenuTrigger asChild>
              <button type="button" className="px-4">
                <Typography
                  level="p6"
                  fontWeight="md"
                  className="!text-sm transition-colors duration-300 hover:text-primary-plain-fg"
                >
                  Resources
                </Typography>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white-pure"
              sideOffset={20}
              align="center"
            >
              <DropdownMenuItem
                leftIcon={<CodingSolid />}
                onClick={() => window.open(ROUTES.DOCS, '_blank')}
              >
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<Github />}
                onClick={() => window.open(GITHUB_LINK, '_blank')}
              >
                Github
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<DocumentStarSolid />}
                onClick={() => window.open(ROUTES.CHANGELOG, '_blank')}
              >
                Changelog
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>,
          <DropdownMenu key="desktop-nav-dropdown">
            <DropdownMenuTrigger asChild>
              <button type="button" className="px-4">
                <Typography
                  level="p6"
                  fontWeight="md"
                  className="!text-sm transition-colors duration-300 hover:text-primary-plain-fg"
                >
                  Download
                </Typography>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white-pure"
              sideOffset={20}
              align="center"
            >
              <DropdownMenuItem
                leftIcon={<DiscordColored />}
                onClick={() => window.open(DISCORD_LINK, '_blank')}
              >
                Discord
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<TelegramColored />}
                onClick={() => window.open(TELEGRAM_LINK, '_blank')}
              >
                Telegram
              </DropdownMenuItem>
              <DropdownMenuLabel>Soon available on</DropdownMenuLabel>
              <DropdownMenuItem
                leftIcon={<ChromeColored className="opacity-50" />}
                disabled
              >
                Extension
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<SlackColored className="opacity-50" />}
                disabled
              >
                Slack
              </DropdownMenuItem>
              <DropdownMenuItem
                leftIcon={<AppleColored className="opacity-50" />}
                disabled
              >
                iOS
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>,
          <div
            className="flex items-center -ml-4 w-px h-full"
            key="desktop-nav-divider"
          >
            <div className="w-full h-6 bg-[#eeedec]" />
          </div>,
          <IconButton
            label="dark/light mode toggle button"
            key="dark/light mode toggle"
            variant="outline"
            color="neutral"
            className="!p-1.5"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <MoonLine className="w-5 h-5" />
            ) : (
              <SunLine className="w-5 h-5" />
            )}
          </IconButton>,
          <LoginPopover key="desktop-login-popover" />,
        ]),
  ]

  return (
    <TopBar
      className={clsx('relative z-30', {
        'border-b border-divider':
          isLoggedIn || !authenticatedRoute.includes(pathname),
        'bg-dashboard-gray-1':
          !isLoggedIn && authenticatedRoute.includes(pathname),
      })}
      leftSlot={
        !isLoggedIn ? (
          <Link href={ROUTES.HOME} className="gap-x-2 items-center">
            <LogoWithText
              logoProps={{ size: 'xs' }}
              className="!gap-2"
              textClassName={clsx('w-18 h-8')}
            />
          </Link>
        ) : (
          <>
            <Link
              href={ROUTES.HOME}
              className="hidden gap-x-2 items-center lg:flex"
            >
              <LogoWithText
                logoProps={{ size: 'xs' }}
                className="!gap-2"
                textClassName="w-18 h-8"
              />
            </Link>
            <DashboardMobileSidebar
              triggerClassName="block lg:hidden"
              contentClassName={clsx({
                '!top-[112px]': pathname === ROUTES.HOME && !!changelogData,
                '!top-[56px]': pathname !== ROUTES.HOME,
              })}
            />
          </>
        )
      }
      rightSlot={
        <>
          <MobileNav
            navItems={mobileNavItems}
            className={isLoggedIn && profile ? '!hidden' : ''}
            onNavStateChanged={setIsNavOpen}
            login={
              <Drawer anchor="bottom">
                <DrawerTrigger asChild>
                  <Button size="md">Login</Button>
                </DrawerTrigger>
                <DrawerPortal>
                  <DrawerOverlay />
                  <DrawerContent className="!bg-transparent [&>div]:!w-auto [&>div]:!max-w-screen [&>div]:sm:!max-w-max [&>div]:mx-auto [&>div]:!rounded-t-lg [&>div]:!rounded-b-none">
                    <LoginWidget />
                  </DrawerContent>
                </DrawerPortal>
              </Drawer>
            }
          />
          <DesktopNav
            navItems={desktopNavItems}
            className={
              isLoggedIn && profile && isMobile() && window.innerWidth <= 1024
                ? '!flex'
                : ''
            }
          />
        </>
      }
    />
  )
}
