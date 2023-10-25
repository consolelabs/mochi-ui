import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  IconUser,
  IconDiscord,
  IconSetting,
  IconAddUser,
  IconLogout,
  IconSuperGroup,
  IconCoding,
} from '@consolelabs/ui-components'
import { Icon } from '@iconify/react'
import { useAuthStore, useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import Link from 'next/link'

export default function ProfileDropdown() {
  const { logout } = useAuthStore()
  const { name } = useProfileStore(
    (s) => ({
      id: s.me?.id,
      name: s.me?.profile_name,
      avatar: s.me?.avatar,
    }),
    shallow,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full">
          <Icon
            icon="heroicons-outline:user"
            className="w-5 h-5 text-gray-500"
          />
        </button>
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
