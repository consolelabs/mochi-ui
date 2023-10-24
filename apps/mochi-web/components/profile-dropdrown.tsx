import { Popover } from '~components/Popover'
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
    <Popover
      trigger={
        <div className="flex justify-center items-center w-8 h-8 rounded-full border border-gray-300">
          <Icon
            icon="heroicons-outline:user"
            className="w-5 h-5 text-gray-500"
          />
        </div>
      }
    >
      <div className="flex flex-col gap-y-1 py-2 px-2 rounded-xl border border-gray-200 w-[250px] bg-white-pure">
        <Link
          href="/profile"
          className="flex flex-col py-1 px-3 rounded-md transition hover:bg-gray-100"
        >
          <span className="text-sm text-gray-500">Logged in as</span>
          <span>{name}</span>
        </Link>
        <hr className="my-1 w-full h-px bg-gray-200" />
        <a
          href="#"
          className="flex justify-between items-center py-1 px-3 rounded-md transition hover:bg-gray-100"
        >
          <span className="text-sm">Docs</span>
          <Icon icon="eva:diagonal-arrow-right-up-fill" className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="flex justify-between items-center py-1 px-3 rounded-md transition hover:bg-gray-100"
        >
          <span className="text-sm">Mochi Web</span>
          <Icon icon="eva:diagonal-arrow-right-up-fill" className="w-4 h-4" />
        </a>
        <hr className="my-1 w-full h-px bg-gray-200" />
        <Link
          href="/#logout"
          onClick={logout}
          className="py-1 px-3 text-sm text-left text-red-400 rounded-md transition hover:bg-gray-100"
        >
          Log Out
        </Link>
      </div>
    </Popover>
  )
}
