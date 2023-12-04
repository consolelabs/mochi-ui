import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  ProfileBadge,
} from '@mochi-ui/core'
import { useAuthStore, useProfileStore } from '~store'
import Link from 'next/link'
import { truncateWallet } from '~utils/string'
import {
  UserSolid,
  Discord,
  SettingSolid,
  AddUserSolid,
  LogoutSolid,
  SuperGroupSolid,
  CodingSolid,
} from '@mochi-ui/icons'
import { ROUTES } from '~constants/routes'

export default function ProfileDropdown() {
  const { logout } = useAuthStore()
  const { me } = useProfileStore()
  const { isLoggedIn } = useAuthStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoggedIn && me && (
          <ProfileBadge
            avatar={me?.avatar || '/logo.png'}
            name={truncateWallet(me.profile_name) || 'unknown'}
            platform={me.platformIcon || '/logo.png'}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href={ROUTES.MY_PROFILE}>
          <DropdownMenuItem leftIcon={<UserSolid />}>Profile</DropdownMenuItem>
        </Link>

        <Link href="#gift">
          <DropdownMenuItem leftIcon={<SuperGroupSolid />}>
            Gift Your Friends
          </DropdownMenuItem>
        </Link>

        <Link href="#settings">
          <DropdownMenuItem leftIcon={<SettingSolid />}>
            Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#my-server">
          <DropdownMenuItem leftIcon={<Discord />}>My Servers</DropdownMenuItem>
        </Link>

        <Link href="#mochi">
          <DropdownMenuItem leftIcon={<Discord />}>
            Install Mochi
          </DropdownMenuItem>
        </Link>

        <Link href="#friends">
          <DropdownMenuItem leftIcon={<AddUserSolid />}>
            Invite Friends
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#application">
          <DropdownMenuItem leftIcon={<CodingSolid />}>
            Create Application
          </DropdownMenuItem>
        </Link>

        <Link href="#docs">
          <DropdownMenuItem leftIcon={<CodingSolid />}>
            Developer Docs
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#tos">
          <DropdownMenuItem>Terms & Policies</DropdownMenuItem>
        </Link>

        <Link href="#privacy">
          <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="/#logout" onClick={logout}>
          <DropdownMenuItem leftIcon={<LogoutSolid />}>Logout</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
