import Image from 'next/image'
import Link from 'next/link'
import { LoginPanel } from '~components/login'
import { Popover } from '~components/Popover'
import { useAuthStore, useProfileStore } from '~store'
import { logo } from '~utils/image'
import { ProfileBadge } from '@consolelabs/ui-components'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ROUTES } from '~constants/routes'
import ProfileDropdown from './profile-dropdrown'

const authenticatedRoute = ['/profile', '/app', '/server']

export const Header = () => {
  const { pathname } = useRouter()
  const { me } = useProfileStore()
  const { isLoggedIn, isLogging } = useAuthStore()

  return (
    <nav
      className={clsx(
        'sticky top-0 flex px-3 py-5 md:px-7 flex-shrink-0 justify-between z-20 h-fit sm:h-20 w-screen flex-col sm:flex-row gap-y-4',
        {
          'border-b border-b-dashboard-gray-6 bg-dashboard-gray-5':
            isLoggedIn || !authenticatedRoute.includes(pathname),
          'bg-dashboard-gray-1':
            !isLoggedIn && authenticatedRoute.includes(pathname),
        },
      )}
    >
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
      <div className="flex flex-col self-start order-1 gap-y-2 gap-x-5 sm:flex-row sm:self-center sm:ml-auto md:order-2">
        <div className="flex flex-wrap items-stretch gap-5">
          <Link
            href="/features"
            className="flex items-center text-sm font-semibold"
          >
            Features
          </Link>
        </div>
        {isLoggedIn && me ? (
          <div className="flex items-center gap-x-5">
            <Link href={ROUTES.PROFILE}>
              <ProfileBadge
                avatar={me.avatar}
                name={me.profile_name}
                platform={me.platformIcon}
              />
            </Link>
            <ProfileDropdown />
          </div>
        ) : (
          <Popover
            trigger={
              <span className="text-sm font-semibold">
                {isLogging ? 'Logging into your account...' : 'Login'}
              </span>
            }
            panelClassname="-translate-x-[8%] sm:-translate-x-[94%]  px-6 py-4 bg-white-pure border border-gray-200 rounded-xl shadow-md"
          >
            <LoginPanel />
          </Popover>
        )}
      </div>
    </nav>
  )
}
