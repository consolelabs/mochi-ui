import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  ProfileBadge,
  Switch,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Typography,
  DropdownMenuLabel,
  DropdownMenuPortal,
  ScrollAreaThumb,
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaCorner,
} from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import Link from 'next/link'
import { truncateWallet } from '~utils/string'
import {
  UserSolid,
  AddUserSolid,
  EyeShowSolid,
  StarSolid,
  HomeSolid,
  ShieldDoneSolid,
  ComputerPcLaptopSolid,
} from '@mochi-ui/icons'
import { ROUTES } from '~constants/routes'
import { ReactNode } from 'react'
import { DISCORD_INSTALL_BOT_LINK, TELEGRAM_LINK } from '~constants/resources'
import { appVersion } from '~constants/common'
import { useTheme } from '~hooks/useTheme'
import { useIsNavOpenStore } from './Header/util'

export default function ProfileDropdown({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  const { setIsNavOpen } = useIsNavOpenStore()
  const { isLoggedIn, profile } = useLoginWidget()
  const { activeTheme, setTheme, theme } = useTheme()

  let triggerRender = null
  if (children) {
    triggerRender = children
  } else {
    triggerRender =
      isLoggedIn && profile ? (
        <ProfileBadge
          avatar={profile?.avatar || '/logo.png'}
          name={truncateWallet(profile.profile_name) || 'unknown'}
          platform="/logo.png"
        />
      ) : null
  }

  return (
    <DropdownMenu
      onOpenChange={(b) => {
        if (window.innerWidth > 1024) return

        setIsNavOpen(b)
      }}
    >
      <DropdownMenuTrigger className={className} asChild>
        {triggerRender}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          wrapperClassName="z-[60]"
          className="w-screen rounded-none lg:m-0 lg:block lg:w-auto lg:rounded-lg !p-0"
          sideOffset={9}
          collisionPadding={{
            right: 32,
            bottom: 32,
          }}
        >
          <ScrollArea className="h-[calc(100vh-56px)] lg:h-auto">
            <ScrollAreaViewport className="lg:max-h-[calc(100vh-100px-56px)]">
              <div className="flex flex-col h-[calc(100vh-56px)] lg:h-auto p-2">
                <DropdownMenuLabel leftIcon={<UserSolid />}>
                  Profile
                </DropdownMenuLabel>

                <Link href={ROUTES.MY_PROFILE}>
                  <DropdownMenuItem hasPaddingLeft>Overview</DropdownMenuItem>
                </Link>

                <Link href={ROUTES.SETTINGS()}>
                  <DropdownMenuItem hasPaddingLeft>Settings</DropdownMenuItem>
                </Link>

                <DropdownMenuLabel leftIcon={<EyeShowSolid />}>
                  View Options
                </DropdownMenuLabel>

                <DropdownMenuItem
                  disabled={theme === 'system'}
                  hasPaddingLeft
                  rightExtra={
                    <Switch
                      disabled={theme === 'system'}
                      checked={theme !== 'system' && activeTheme === 'dark'}
                    />
                  }
                  onClick={(e) => {
                    if (theme === 'system') return
                    e.preventDefault()
                    setTheme(activeTheme === 'dark' ? 'light' : 'dark')
                  }}
                >
                  Dark Mode
                </DropdownMenuItem>
                <DropdownMenuItem
                  hasPaddingLeft
                  rightExtra={
                    <Switch id="theme-toggle" checked={theme === 'system'} />
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setTheme(theme === 'system' ? 'light' : 'system')
                  }}
                >
                  System Theme
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <Link href="#friends">
                  <DropdownMenuItem leftIcon={<AddUserSolid />}>
                    Invite Friends
                  </DropdownMenuItem>
                </Link>

                <Link href="#Feedback">
                  <DropdownMenuItem leftIcon={<StarSolid />}>
                    Feedback
                  </DropdownMenuItem>
                </Link>

                <Link href="#TermAndPolicy">
                  <DropdownMenuItem leftIcon={<ShieldDoneSolid />}>
                    Terms and Policies
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <Accordion
                  type="multiple"
                  className="!p-0 shadow-none bg-transparent"
                  defaultValue={['Download']}
                >
                  <AccordionItem value="Mochi">
                    <AccordionTrigger
                      className="py-0.5"
                      leftIcon={
                        <div className="p-0.5">
                          <HomeSolid />
                        </div>
                      }
                    >
                      Mochi
                    </AccordionTrigger>
                    <AccordionContent className="!p-0">
                      <Link href={ROUTES.HOME}>
                        <DropdownMenuItem hasPaddingLeft>Home</DropdownMenuItem>
                      </Link>
                      <Link href={ROUTES.EXPLORE}>
                        <DropdownMenuItem hasPaddingLeft>
                          Explore
                        </DropdownMenuItem>
                      </Link>
                      <Link href={ROUTES.DOCS}>
                        <DropdownMenuItem hasPaddingLeft>
                          API docs
                        </DropdownMenuItem>
                      </Link>
                      <Link href={ROUTES.CHANGELOG}>
                        <DropdownMenuItem hasPaddingLeft>
                          Changelog
                        </DropdownMenuItem>
                      </Link>
                      <Link href={ROUTES.DEVELOPER}>
                        <DropdownMenuItem hasPaddingLeft>
                          Developer
                        </DropdownMenuItem>
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="Download">
                    <AccordionTrigger
                      className="py-0.5"
                      leftIcon={
                        <div className="p-0.5">
                          <ComputerPcLaptopSolid />
                        </div>
                      }
                    >
                      Download
                    </AccordionTrigger>
                    <AccordionContent className="!p-0">
                      <Link href="#Explore">
                        <DropdownMenuItem hasPaddingLeft>
                          Extension
                        </DropdownMenuItem>
                      </Link>
                      <Link target="_blank" href={DISCORD_INSTALL_BOT_LINK}>
                        <DropdownMenuItem hasPaddingLeft>
                          Discord
                        </DropdownMenuItem>
                      </Link>
                      <Link target="_blank" href={TELEGRAM_LINK}>
                        <DropdownMenuItem hasPaddingLeft>
                          Telegram
                        </DropdownMenuItem>
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <DropdownMenuSeparator className="hidden lg:flex" />
                <DropdownMenuSeparator className="lg:hidden !mt-auto" />
                <DropdownMenuLabel className="flex flex-col">
                  <Typography level="p6" color="textDisabled" fontWeight="sm">
                    Powered by Console Labs
                  </Typography>
                  <Typography level="p6" color="textDisabled" fontWeight="sm">
                    Version {appVersion}
                  </Typography>
                </DropdownMenuLabel>
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar>
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
