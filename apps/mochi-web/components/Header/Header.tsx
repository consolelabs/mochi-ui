import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore, useProfileStore } from '~store'
import { logo } from '~utils/image'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  IconButton,
} from '@consolelabs/ui-components'
import { IconMenu, IconClose } from '@consolelabs/icons'
import { useState } from 'react'
import ProfileDropdown from '~cpn/profile-dropdrown'
import { AuthPanel } from '~cpn/AuthWidget'
import { MobileNav } from './MobileNav'

const authenticatedRoute = ['/profile', '/app', '/server']

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
          <Button loading={isLogging}>Login</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={clsx('!p-0 hidden sm:block', {
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

const HeaderLogo = () => {
  const { isLoggedIn } = useAuthStore()
  const { pathname } = useRouter()

  return (
    <div className="flex items-center gap-x-2">
      <Link href={ROUTES.HOME} className="flex items-center gap-x-2">
        <Image
          src={logo}
          alt="Logo"
          width={32}
          height={32}
          className="block rounded-full"
        />
        <span className="text-xl font-black uppercase text-foreground">
          Mochi<span className="text-mochi">.</span>
        </span>
      </Link>
      {isLoggedIn && authenticatedRoute.includes(pathname) && (
        <Link href={ROUTES.PROFILE} className="text-base text-gray-500">
          Dashboard
        </Link>
      )}
    </div>
  )
}

export const Header = () => {
  const { pathname } = useRouter()
  const { me } = useProfileStore()
  const { isLoggedIn, isLogging } = useAuthStore()
  const [openMobileNav, setOpenMobileNav] = useState(false)

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
      <HeaderLogo />
      <Popover open={openMobileNav} onOpenChange={setOpenMobileNav}>
        <PopoverTrigger asChild className="sm:hidden">
          <div>
            <IconButton
              size="lg"
              variant="ghost"
              className="bg-white-pure !p-2 rounded-none"
            >
              {openMobileNav ? (
                <IconClose className="text-2xl text-neutral-800" />
              ) : (
                <IconMenu className="text-2xl text-neutral-800" />
              )}
            </IconButton>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-screen h-screen !p-0 !pb-16 bg-white-pure rounded-none sm:hidden flex flex-col"
          sideOffset={12}
          collisionPadding={0}
        >
          <MobileNav onClose={() => setOpenMobileNav(false)} />
        </PopoverContent>
      </Popover>

      <div className="hidden sm:flex flex-col self-start order-1 gap-y-2 gap-x-6 sm:flex-row sm:self-center sm:ml-auto md:order-2">
        <div className="flex flex-wrap items-stretch gap-5">
          <Link
            href="/features"
            className="flex items-center text-sm font-semibold"
          >
            Features
          </Link>
        </div>
        {isLoggedIn && me ? (
          <ProfileDropdown />
        ) : (
          <LoginPopover isLogging={isLogging} />
        )}
      </div>
    </nav>
  )
}
