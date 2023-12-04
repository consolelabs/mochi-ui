import Link from 'next/link'
import { useAuthStore, useProfileStore } from '~store'
import clsx from 'clsx'
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
} from '@consolelabs/core'
import {
  DiscordColored,
  TelegramColored,
  SlackColored,
  AppleColored,
  ChromeColored,
  TipSolid,
  DollarBubbleCircleSolid,
  LinkCircledSolid,
  BellSolid,
  MagnifierLine,
  ChevronRightLine,
} from '@consolelabs/icons'
import { DISCORD_LINK, TELEGRAM_LINK } from '~envs'
import { useState } from 'react'
import ProfileDropdown from '~cpn/profile-dropdrown'
import { AuthPanel } from '~cpn/AuthWidget'
import { MobileNavAccordionItem } from './MobileNavAccordionItem'

const authenticatedRoute = [
  ROUTES.MY_PROFILE,
  ROUTES.APPLICATON_LIST,
  '/server',
]

interface LoginPopoverProps {
  isLogging: boolean
}

const LoginPopover = (props: LoginPopoverProps) => {
  const { isLogging } = props
  const [forceHide, setForceHide] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        className="text-left"
        asChild
        // wrap Button by div to prevent event loss when use `asChild` props
      >
        <div>
          <Button className="justify-center w-20" loading={isLogging}>
            Login
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={clsx('!p-0', {
          hidden: forceHide,
        })}
        sideOffset={10}
        collisionPadding={20}
      >
        <AuthPanel onOpenConnectWalletChange={setForceHide} />
      </PopoverContent>
    </Popover>
  )
}

const MobileLoginPanel = () => {
  const [isOpenLoginPanel, setOpenLoginPanel] = useState(false)
  const [hideLoginPanel, setHideLoginPanel] = useState(false)
  const { isLogging } = useAuthStore()

  return (
    <Modal open={isOpenLoginPanel} onOpenChange={setOpenLoginPanel}>
      <Button
        className="justify-center w-full sm:hidden"
        size="lg"
        onClick={() => setOpenLoginPanel(true)}
        loading={isLogging}
      >
        Login
      </Button>
      <ModalContent
        className={clsx('w-full !p-0', { hidden: hideLoginPanel })}
        style={{
          width: 'calc(100% - 32px)',
        }}
      >
        <AuthPanel
          onOpenConnectWalletChange={(open) => setHideLoginPanel(open)}
        />
      </ModalContent>
    </Modal>
  )
}

const MobileHeader = ({ onClose }: { onClose: () => void }) => {
  const { me } = useProfileStore()
  return (
    <button className="" onClick={onClose}>
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
            fallback={me?.profile_name}
            smallSrc={me?.platformIcon}
            src={me?.avatar as string}
          />
          <div className="flex flex-1 items-center font-medium">
            <span className="inline-block w-40 whitespace-nowrap truncate">
              {me?.profile_name}
            </span>
          </div>
          <ChevronRightLine className="text-lg transition group-hover:translate-x-1" />
        </div>
      </Link>
    </button>
  )
}

export const Header = () => {
  const { pathname } = useRouter()
  const { me } = useProfileStore()
  const { isLoggedIn, isLogging } = useAuthStore()

  const mobileNavItems = [
    <Link
      href={ROUTES.FEATURES}
      className="flex items-center text-sm"
      key="mobile-nav-features"
    >
      <Button
        variant="link"
        color="neutral"
        className="flex w-full !justify-start !text-base !px-2 py-3 bg-background-surface !text-neutral-800 !font-normal hover:!text-black !h-max"
      >
        <Typography level="p6" className="!text-base">
          Features
        </Typography>
      </Button>
    </Link>,
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link href="#" className="flex items-center text-sm" key="mobile-nav-api">
      <Button
        variant="link"
        color="neutral"
        className="flex w-full !justify-start !text-base !px-2 py-3 bg-background-surface !text-neutral-800 !font-normal hover:!text-black !h-max"
      >
        <Typography level="p6" className="!text-base">
          API
        </Typography>
      </Button>
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
    ...(!(isLoggedIn && me)
      ? [<MobileLoginPanel key="mobile-login-panel" />]
      : []),
  ]

  const desktopNavItems = [
    ...(isLoggedIn && me
      ? [
          <div className="flex gap-x-3 items-stretch" key="desktop-nav-items">
            <div className="flex gap-x-2 items-center w-[400px]">
              <MagnifierLine />
              <input
                className="flex-1 text-sm outline-none"
                placeholder="Search token, ID or address"
              />
              <div className="flex gap-x-1">
                <span
                  style={{
                    boxShadow: '0px 2px 0px 0px rgba(212, 211, 208, 1)',
                  }}
                  className="text-center leading-[1.1rem] rounded-sm font-mono w-4 h-4 bg-[#eeedec]"
                >
                  ⌘
                </span>
                <span
                  style={{
                    boxShadow: '0px 2px 0px 0px rgba(212, 211, 208, 1)',
                  }}
                  className="text-[10px] text-center leading-[1.1rem] rounded-sm font-mono w-4 h-4 bg-[#eeedec]"
                >
                  K
                </span>
              </div>
            </div>
            <div className="py-1.5 ml-2 w-px">
              <div className="w-full h-full bg-[#eeedec]" />
            </div>
            <Button size="md">
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
              <BellSolid
                key="header-icon-button-3"
                className="w-full h-full text-neutral-800"
              />,
            ].map((icon) => {
              return (
                <IconButton
                  key={icon.key}
                  color="info"
                  variant="outline"
                  className="!p-1 !w-8 !h-8 my-auto"
                >
                  {icon}
                </IconButton>
              )
            })}
          </div>,
          <ProfileDropdown key="desktop-profile-dropdown" />,
        ]
      : [
          <Link
            href={ROUTES.EXPLORE}
            className="flex items-center text-sm font-medium"
            key="desktop-nav-explore"
          >
            Explore
          </Link>,
          <Link
            href={ROUTES.FEATURES}
            className="flex items-center text-sm font-medium"
            key="desktop-nav-features"
          >
            Features
          </Link>,
          <Link
            href={ROUTES.DOCS}
            className="flex items-center text-sm font-medium"
            key="desktop-nav-api"
          >
            Docs
          </Link>,
          <DropdownMenu key="desktop-nav-dropdown">
            <DropdownMenuTrigger asChild>
              <button type="button">
                <Typography level="p5" fontWeight="md">
                  Download
                </Typography>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white-pure">
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
            className="flex items-center -mx-2 w-px h-full"
            key="desktop-nav-divider"
          >
            <div className="w-full h-6 bg-[#eeedec]" />
          </div>,
          <LoginPopover isLogging={isLogging} key="desktop-login-popover" />,
        ]),
  ]

  return (
    <TopBar
      className={
        isLoggedIn || !authenticatedRoute.includes(pathname)
          ? 'border-b border-b-dashboard-gray-6'
          : 'bg-dashboard-gray-1'
      }
      leftSlot={
        <Link href={ROUTES.HOME} className="flex gap-x-2 items-center">
          <LogoWithText
            logoProps={{ size: 'xs' }}
            className="!gap-2"
            textClassName="w-18 h-8"
          />
        </Link>
      }
      rightSlot={
        <>
          <MobileNav
            navItems={mobileNavItems}
            Header={isLoggedIn && me ? MobileHeader : undefined}
          />
          <DesktopNav navItems={desktopNavItems} />
        </>
      }
    />
  )
}
