import React from 'react'
import type { ReactElement } from 'react'
import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { shallow } from 'zustand/shallow'
import { useProfileStore } from '~store'
import { API, GET_PATHS } from '~constants/api'
import useSWR from 'swr'
import Alert from '~cpn/base/alert'
import Avatar from '~cpn/base/avatar'
import { logo } from '~utils/image'
import Profile from '~components/profile'
import { boringAvatar } from '~utils/string'
import Link from 'next/link'

export type App = {
  id: string
  profileId: string
  name: string
  key: string
}

export type Server = {
  id: string
  name: string
  icon: string
  owner: boolean
}

const Home: NextPageWithLayout = () => {
  const { id } = useProfileStore(
    (s) => ({
      id: s.me?.id,
      name: s.me?.profile_name,
      avatar: s.me?.avatar,
    }),
    shallow,
  )

  const { data: servers } = useSWR(['get-list-servers', id], async () => {
    const guilds = await API.MOCHI_PROFILE.get(GET_PATHS.GUILDS).json(
      (r) => r.data,
    )
    return [
      ...guilds.owning.map((g: any) => ({
        ...g,
        icon:
          g.icon &&
          `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.webp?size=240`,
      })),
      ...guilds.others.map((g: any) => ({
        ...g,
        icon:
          g.icon &&
          `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.webp?size=240`,
      })),
    ]
  })

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col gap-y-12">
        <Profile />
        <div className="flex flex-col gap-y-3">
          <span className="text-lg font-medium">Server list</span>
          <div className="flex flex-wrap gap-3 max-w-3xl">
            {servers?.length ? (
              servers?.map((s: any) => {
                return (
                  <Link
                    href={`/server/${s.id}`}
                    key={s.id}
                    className="flex flex-col gap-y-2 items-center w-20"
                  >
                    <div className="p-1 w-20 h-20 rounded-lg border border-gray-300 hover:bg-gray-200 aspect-square">
                      {s.hasMochi ? (
                        <Avatar
                          src={s.icon || boringAvatar(s.id)}
                          cutoutSrc={logo.src}
                          size="parent"
                        />
                      ) : (
                        <img
                          src={s.icon || boringAvatar(s.id)}
                          alt=""
                          className="w-full h-full rounded-full"
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium break-words">
                      {s.name}
                    </span>
                  </Link>
                )
              })
            ) : (
              <Alert title="There are nothing yet" className="w-full">
                <span className="text-sm">
                  You have no Discord server, might consider creating one
                </span>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Home
