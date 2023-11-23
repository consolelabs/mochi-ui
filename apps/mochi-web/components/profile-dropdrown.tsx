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
  IconUser,
  IconDiscord,
  IconSetting,
  IconAddUser,
  IconLogout,
  IconSuperGroup,
  IconCoding,
} from '@consolelabs/icons'

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
        <Link href="/profile">
          <DropdownMenuItem leftIcon={<IconUser />}>Profile</DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<IconSuperGroup />}>
            Gift Your Friends
          </DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<IconSetting />}>
            Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#">
          <DropdownMenuItem leftIcon={<IconDiscord />}>
            My Servers
          </DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<IconDiscord />}>
            Install Mochi
          </DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<IconAddUser />}>
            Invite Friends
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <Link href="#">
          <DropdownMenuItem leftIcon={<IconCoding />}>
            Create Application
          </DropdownMenuItem>
        </Link>

        <Link href="#">
          <DropdownMenuItem leftIcon={<IconCoding />}>
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
          <DropdownMenuItem leftIcon={<IconLogout />}>Logout</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
