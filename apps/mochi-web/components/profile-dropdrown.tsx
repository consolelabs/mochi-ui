import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  ProfileBadge,
} from '@consolelabs/core'
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
} from '@consolelabs/icons'
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

        <Link href="#">
          <DropdownMenuItem leftIcon={<SuperGroupSolid />}>
            Gift Your Friends
          </DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<SettingSolid />}>
            Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#">
          <DropdownMenuItem leftIcon={<Discord />}>My Servers</DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<Discord />}>
            Install Mochi
          </DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<AddUserSolid />}>
            Invite Friends
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#">
          <DropdownMenuItem leftIcon={<CodingSolid />}>
            Create Application
          </DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<CodingSolid />}>
            Developer Docs
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#">
          <DropdownMenuItem>Terms & Policies</DropdownMenuItem>
        </Link>

        <Link href="#">
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
