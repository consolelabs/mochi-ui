'use client'

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
  Modal,
  ModalContent,
  Avatar,
  ModalPortal,
  ModalOverlay,
  PopoverPortal,
} from '@mochi-ui/core'
import {
  DiscordColored,
  TelegramColored,
  SlackColored,
  AppleColored,
  ChromeColored,
  TipSolid,
  DollarBubbleCircleSolid,
  LinkCircledSolid,
  MagnifierLine,
  ChevronRightLine,
  WalletSolid,
  CodingSolid,
  Github,
  TwinkleSolid,
} from '@mochi-ui/icons'
import NotificationList from '~cpn/NotificationList'
import clsx from 'clsx'
import { DISCORD_LINK, GITHUB_LINK, TELEGRAM_LINK } from '~envs'
import { useState } from 'react'
import events from '~constants/events'
import { LoginWidget, useLoginWidget } from '@mochi-web3/login-widget'
import ProfileDropdown from '~cpn/ProfileDropdown'
import { MobileNavAccordionItem } from './MobileNavAccordionItem'
import { DashboardMobileSidebar } from './DashboardMobileSidebar'

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
        <PopoverContent sideOffset={10} collisionPadding={20}>
          <LoginWidget raw />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

const MobileLoginPanel = () => {
  const [isOpenLoginPanel, setOpenLoginPanel] = useState(false)
  const { isLoadingProfile } = useLoginWidget()

  return (
    <Modal open={isOpenLoginPanel} onOpenChange={setOpenLoginPanel}>
      <Button
        className="justify-center w-full sm:hidden"
        size="lg"
        onClick={() => setOpenLoginPanel(true)}
        loading={isLoadingProfile}
      >
        Login
      </Button>
      <ModalPortal>
        <ModalOverlay />
        <ModalContent
          className="p-5 w-full sm:w-auto"
          style={{
            maxWidth: 'calc(100% - 32px)',
          }}
        >
          <LoginWidget raw />
        </ModalContent>
      </ModalPortal>
    </Modal>
  )
}

const MobileHeader = ({ onClose }: { onClose: () => void }) => {
  const { profile } = useLoginWidget()
  return (
    <button onClick={onClose}>
      <Link
        href={ROUTES.MY_PROFILE}
        className="block relative w-full h-20 group"
      >
        <div className="absolute inset-0 bg-transparent">
          <img
            className="object-cover w-full h-full"
            alt="Header"
            src="https://pbs.twimg.com/profile_banners/1168522102410010626/1684159976/300x100"
          />
        </div>
        <div className="flex relative z-10 gap-4 items-center p-4 w-full h-full text-white">
          <Avatar
            fallback={profile?.profile_name}
            /* smallSrc={me?.platformIcon} */
            src={profile?.avatar as string}
          />
          <div className="flex flex-1 items-center font-medium">
            <span className="inline-block w-max whitespace-nowrap max-w-40 truncate">
              {profile?.profile_name}
            </span>
          </div>
          <ChevronRightLine className="text-lg transition group-hover:translate-x-1" />
        </div>
      </Link>
    </button>
  )
}

export const Header = ({
  layoutType,
}: {
  layoutType?: 'dashboard' | 'landing'
}) => {
  const { pathname, push } = useRouter()
  const { profile, isLoggedIn } = useLoginWidget()

  const mobileNavItems = [
    <Link
      href={ROUTES.FEATURES}
      className="flex hidden items-center py-3 px-2 text-sm"
      key="mobile-nav-features"
    >
      <Typography
        level="p6"
        color="neutral"
        className={clsx(
          '!text-base transition-colors duration-300 hover:!text-primary-plain-fg',
          {
            '!text-primary-plain-fg': pathname === ROUTES.FEATURES,
          },
        )}
      >
        Features
      </Typography>
    </Link>,
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      href="#"
      className="flex items-center py-3 px-2 text-sm"
      key="mobile-nav-api"
    >
      <Typography
        level="p6"
        color="neutral"
        className="!text-base transition-colors duration-300 hover:!text-primary-plain-fg"
      >
        API
      </Typography>
    </Link>,
    <MobileNavAccordionItem
      key="mobile-nav-accordion"
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
              label: <span className="text-neutral-500">Extension</span>,
              iconLeft: <ChromeColored />,
              href: '#',
            },
            {
              label: <span className="text-neutral-500">Discord</span>,
              iconLeft: <SlackColored className="opacity-50" />,
              href: '#',
            },
            {
              label: <span className="text-neutral-500">iOS</span>,
              iconLeft: <AppleColored className="opacity-50" />,
              href: '#',
            },
          ],
        },
      ]}
    />,
    ...(!(isLoggedIn && profile)
      ? [<MobileLoginPanel key="mobile-login-panel" />]
      : []),
  ]

  const desktopNavItems = [
    ...(isLoggedIn && profile
      ? [
          <div
            className="flex gap-x-0 items-stretch -mr-2 lg:gap-x-3 lg:mr-0"
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
              onClick={async () => {
                if (
                  pathname !== ROUTES.HOME &&
                  pathname !== ROUTES.MY_PROFILE
                ) {
                  await push('/profile')
                }
                window.dispatchEvent(new Event(events.TIP_WIDGET.FOCUS_AMOUNT))
              }}
              size="md"
              className="hidden lg:flex"
            >
              <TipSolid />
              Tip
            </Button>
            {[
              <DollarBubbleCircleSolid
                key="header-icon-button-1"
                className="w-full h-full text-neutral-800"
              />,
              <LinkCircledSolid
                key="header-icon-button-2"
                className="w-full h-full text-neutral-800"
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
                <WalletSolid className="text-sm text-neutral-800" />
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
                leftIcon={<TwinkleSolid />}
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
        layoutType === 'landing' || !isLoggedIn ? (
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
              contentClassName="!top-[56px]"
            />
          </>
        )
      }
      rightSlot={
        <>
          <MobileNav
            navItems={mobileNavItems}
            Header={isLoggedIn && profile ? MobileHeader : undefined}
            className={layoutType === 'dashboard' ? '!hidden' : ''}
          />
          <DesktopNav
            navItems={desktopNavItems}
            className={layoutType === 'dashboard' ? '!flex' : ''}
          />
        </>
      }
    />
  )
}
