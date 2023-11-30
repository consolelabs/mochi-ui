import { useHasMounted } from '@dwarvesf/react-hooks'
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
} from '@consolelabs/core'
import {
  MenuSolid,
  CloseLine,
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
} from '@consolelabs/icons'
import { DISCORD_LINK, TELEGRAM_LINK } from '~envs'
import { useCallback, useState } from 'react'
import ProfileDropdown from '~cpn/profile-dropdrown'
import { AuthPanel } from '~cpn/AuthWidget'
import { useResponsiveScreen } from '~hooks/useResponsiveScreen'
import { MobileNav } from './MobileNav'

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

export const Header = () => {
  const { pathname } = useRouter()
  const { me } = useProfileStore()
  const { isLoggedIn, isLogging } = useAuthStore()
  const [openMobileNav, setOpenMobileNav] = useState(false)
  const { isMobile } = useResponsiveScreen()
  const isMounted = useHasMounted()

  const onCloseMobileNav = useCallback(() => setOpenMobileNav(false), [])

  return (
    <nav
      className={clsx(
        'sticky h-16 py-3 w-screen top-0 flex flex-shrink-0 justify-between z-20 bg-white-pure',
        'pl-4 pr-3 gap-y-4', // mobile
        'sm:px-8', // desktop
        'sm:h-16 sm:flex-row', // tablet-desktop
        {
          'border-b border-b-dashboard-gray-6':
            isLoggedIn || !authenticatedRoute.includes(pathname),
          'bg-dashboard-gray-1':
            !isLoggedIn && authenticatedRoute.includes(pathname),
        },
      )}
    >
      <button
        className="flex gap-x-2 items-center text-left"
        onClick={onCloseMobileNav}
      >
        <Link href={ROUTES.HOME} className="flex gap-x-2 items-center">
          <LogoWithText
            logoProps={{ size: 'xs' }}
            className="!gap-2"
            textClassName="w-18 h-8"
          />
        </Link>
      </button>

      {isMounted && isMobile ? (
        <>
          <IconButton
            size="lg"
            variant="ghost"
            className="bg-white-pure !p-2 rounded-none hover:border-none"
            onClick={() => setOpenMobileNav((prev) => !prev)}
          >
            {openMobileNav ? (
              <CloseLine className="text-2xl text-neutral-800" />
            ) : (
              <MenuSolid className="text-2xl text-neutral-800" />
            )}
          </IconButton>
          {openMobileNav && (
            <div
              className={clsx(
                'fixed top-16 inset-0 bg-white-pure rounded-none flex flex-col',
                'overflow-y-scroll',
              )}
            >
              <MobileNav onClose={onCloseMobileNav} />
            </div>
          )}
        </>
      ) : null}

      {isMounted && !isMobile ? (
        <div className="flex flex-row order-1 gap-y-2 gap-x-6 self-center ml-auto md:order-2">
          {isLoggedIn && me ? (
            <>
              <div className="flex gap-x-3 items-stretch">
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
                <div className="w-px h-2/3 my-auto ml-2 bg-[#eeedec]" />
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
              </div>
              <ProfileDropdown />
            </>
          ) : (
            <>
              <div className="flex gap-5 items-stretch">
                <Link
                  href={ROUTES.EXPLORE}
                  className="flex items-center text-sm font-semibold"
                >
                  Explore
                </Link>
                <Link
                  href={ROUTES.FEATURES}
                  className="flex items-center text-sm font-semibold"
                >
                  Features
                </Link>
                <Link
                  href={ROUTES.API}
                  className="flex items-center text-sm font-semibold"
                >
                  API
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button type="button">
                      <Typography level="p5" fontWeight="lg">
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
                    {/* <SectionList */}
                    {/*   rootClassName="px-1 w-[250px]" */}
                    {/*   sections={[ */}
                    {/*     { */}
                    {/*       key: '', */}
                    {/*       data: [ */}
                    {/*         { */}
                    {/*           href: DISCORD_LINK, */}
                    {/*           icon: <DiscordColored className="w-5 h-5" />, */}
                    {/*           text: 'Discord', */}
                    {/*         }, */}
                    {/*         { */}
                    {/*           href: TELEGRAM_LINK, */}
                    {/*           icon: <TelegramColored className="w-5 h-5" />, */}
                    {/*           text: 'Telegram', */}
                    {/*         }, */}
                    {/*       ], */}
                    {/*     }, */}
                    {/*     { */}
                    {/*       key: 'Soon available on', */}
                    {/*       data: [ */}
                    {/*         { */}
                    {/*           href: '', */}
                    {/*           icon: ( */}
                    {/*             <ChromeColored className="w-5 h-5 opacity-50" /> */}
                    {/*           ), */}
                    {/*           text: 'Extension', */}
                    {/*         }, */}
                    {/*         { */}
                    {/*           href: '', */}
                    {/*           icon: ( */}
                    {/*             <SlackColored className="w-5 h-5 opacity-50" /> */}
                    {/*           ), */}
                    {/*           text: 'Slack', */}
                    {/*         }, */}
                    {/*         { */}
                    {/*           href: '', */}
                    {/*           icon: ( */}
                    {/*             <AppleColored className="w-5 h-5 opacity-50" /> */}
                    {/*           ), */}
                    {/*           text: 'iOS', */}
                    {/*         }, */}
                    {/*       ], */}
                    {/*     }, */}
                    {/*   ]} */}
                    {/*   renderSectionHeader={({ key }) => ( */}
                    {/*     <Typography */}
                    {/*       level="p5" */}
                    {/*       fontWeight="sm" */}
                    {/*       color="textSecondary" */}
                    {/*     > */}
                    {/*       {key} */}
                    {/*     </Typography> */}
                    {/*   )} */}
                    {/*   renderItem={(item: any) => ( */}
                    {/*     <Button */}
                    {/*       className="!w-full !flex !justify-start !pl-2" */}
                    {/*       variant="ghost" */}
                    {/*       disabled={!item.href} */}
                    {/*       color="neutral" */}
                    {/*     > */}
                    {/*       <Link */}
                    {/*         href={item.href} */}
                    {/*         className="flex gap-x-2 items-center" */}
                    {/*       > */}
                    {/*         {item.icon} */}
                    {/*         <Typography */}
                    {/*           level="p4" */}
                    {/*           className={clsx({ */}
                    {/*             'opacity-50': !item.href, */}
                    {/*           })} */}
                    {/*           fontWeight="md" */}
                    {/*         > */}
                    {/*           {item.text} */}
                    {/*         </Typography> */}
                    {/*       </Link> */}
                    {/*     </Button> */}
                    {/*   )} */}
                    {/* /> */}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  href={ROUTES.ROADMAP}
                  className="flex items-center text-sm font-semibold"
                >
                  Roadmap
                </Link>
              </div>
              <LoginPopover isLogging={isLogging} />
            </>
          )}
        </div>
      ) : null}
    </nav>
  )
}
