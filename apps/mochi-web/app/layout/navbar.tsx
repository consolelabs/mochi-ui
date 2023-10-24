import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { LoginPanel } from '~components/login'
import { Popover } from '~components/Popover'
import { useAuthStore, useProfileStore } from '~store'
import { logo } from '~utils/image'
import { ProfileBadge } from '@consolelabs/ui-components'

const NavLinks = ({ className }: { className?: string }) => (
  <div className={['flex flex-wrap items-stretch gap-5', className].join(' ')}>
    <Link href="/features" className="flex items-center text-sm font-semibold">
      Features
    </Link>
  </div>
)

export const Navbar = () => {
  const { me } = useProfileStore()
  const { isLoggedIn } = useAuthStore()

  return (
    <nav className="sticky top-0 z-20 w-screen bg-white shadow">
      <div className="flex flex-col justify-between h-20 px-3 py-5 mx-auto gap-y-4 sm:flex-row md:px-7">
        <Link className="flex items-center self-start gap-x-2" href="/">
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
        <div className="flex flex-col self-start order-1 gap-y-2 gap-x-5 sm:flex-row sm:self-center sm:ml-auto md:order-2">
          <NavLinks />
          {isLoggedIn && me ? (
            <Link href="/profile">
              <ProfileBadge
                avatar={me.avatar}
                name={me.profile_name}
                platform={me.platformIcon}
              />
            </Link>
          ) : (
            <Popover
              trigger={<span className="text-sm font-semibold">Login</span>}
              panelClassname="px-6 py-4 bg-white-pure border border-gray-200 rounded-xl shadow-md"
            >
              <LoginPanel />
            </Popover>
          )}
        </div>
      </div>
    </nav>
  )
}
