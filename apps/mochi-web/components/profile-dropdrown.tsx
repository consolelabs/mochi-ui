import { Popover } from '~components/Popover'
import { Icon } from '@iconify/react'
import { useAuthStore, useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import Link from 'next/link'

interface Props {
  trigger: React.ReactNode
}

export default function ProfileDropdown({ trigger }: Props) {
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
        trigger || (
          <div className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-full">
            <Icon
              icon="heroicons-outline:user"
              className="w-5 h-5 text-gray-500"
            />
          </div>
        )
      }
      panelClassname="right-0 translate-x-0 left-[unset] w-fit"
    >
      <div className="flex flex-col gap-y-1 py-2 px-2 rounded-xl border border-gray-200 w-[250px] bg-white-pure">
        <Link
          href="/profile"
          className="flex flex-col px-3 py-1 transition rounded-md hover:bg-gray-100"
        >
          <span className="text-sm text-gray-500">Logged in as</span>
          <span className="ui-whitespace-nowrap ui-truncate">{name}</span>
        </Link>
        <hr className="w-full h-px my-1 bg-gray-200" />
        <a
          href="#"
          className="flex items-center justify-between px-3 py-1 transition rounded-md hover:bg-gray-100"
        >
          <span className="text-sm">Docs</span>
          <Icon icon="eva:diagonal-arrow-right-up-fill" className="w-4 h-4" />
        </a>
        <a
          href="#"
          className="flex items-center justify-between px-3 py-1 transition rounded-md hover:bg-gray-100"
        >
          <span className="text-sm">Mochi Web</span>
          <Icon icon="eva:diagonal-arrow-right-up-fill" className="w-4 h-4" />
        </a>
        <hr className="w-full h-px my-1 bg-gray-200" />
        <Link
          href="/#logout"
          onClick={logout}
          className="px-3 py-1 text-sm text-left text-red-400 transition rounded-md hover:bg-gray-100"
        >
          Log Out
        </Link>
      </div>
    </Popover>
  )
}
