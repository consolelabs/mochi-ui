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
} from '@consolelabs/core'
import { MenuSolid, CloseLine } from '@consolelabs/icons'
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
        className="flex items-center text-left gap-x-2"
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
          <div className="flex flex-wrap gap-5 items-stretch">
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
      ) : null}
    </nav>
  )
}
