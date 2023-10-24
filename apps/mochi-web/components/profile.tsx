import { useProfileStore } from '~store'
import { api, UI } from '~constants/mochi'
import useSWR from 'swr'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { Icon } from '@iconify/react'
import { Stats } from '@consolelabs/mochi-rest'
import { discordLogo, telegramLogo } from '~utils/image'
import { Pagination } from './Dashboard/Pagination'
import { Avatar } from '@consolelabs/ui-components'

const Box = ({
  children,
  icon,
}: {
  icon?: React.ReactNode
  children?: React.ReactNode
}) => {
  return (
    <div className="flex flex-1 gap-x-2 items-center py-3 px-4 bg-white rounded-lg border border-gray-200 shadow">
      <div className="flex justify-center items-center w-8 h-8 aspect-square">
        {icon}
      </div>
      {children}
    </div>
  )
}

export default function Profile() {
  const { me } = useProfileStore()
  const { data: stats } = useSWR(['monthly-stats', me?.id], async ([_, id]) => {
    if (!id) return null
    const { ok, data } = await api.pay.profile.stats(id)
    if (!ok) return null
    const r = data as Stats & {
      most_send: { profile?: any }
      most_receive: { profile?: any }
    }

    const [from] = await UI.resolve(
      Platform.Web,
      data.most_send.other_profile_id,
    )

    r.most_send.profile = from
    switch (from?.platform) {
      case Platform.Discord:
        r.most_send.profile.platformIcon = discordLogo.src
        break
      case Platform.Telegram:
        r.most_send.profile.platformIcon = telegramLogo.src
      default:
        break
    }
    const { data: send } = await api.profile.mochi.getById(
      r.most_send.other_profile_id,
    )
    r.most_send.profile.avatar = send?.avatar

    ////////////////////

    const [to] = await UI.resolve(
      Platform.Web,
      data.most_receive.other_profile_id,
    )

    r.most_receive.profile = to
    switch (from?.platform) {
      case Platform.Discord:
        r.most_receive.profile.platformIcon = discordLogo.src
        break
      case Platform.Telegram:
        r.most_receive.profile.platformIcon = telegramLogo.src
      default:
        break
    }
    const { data: receive } = await api.profile.mochi.getById(
      r.most_receive.other_profile_id,
    )
    r.most_receive.profile.avatar = receive?.avatar

    return r
  })

  return (
    <div className="flex flex-col max-w-3xl">
      <div className="flex flex-col gap-y-2 items-center mx-auto mb-10">
        <Avatar src={me?.avatar ?? ''} fallback={me?.profile_name} size="xl" />
        <span className="font-semibold">{me?.profile_name}</span>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3 w-4/5">
          <div className="flex gap-x-3">
            <Box
              icon={
                <Icon
                  icon="game-icons:pay-money"
                  className="w-full h-full opacity-80"
                />
              }
            >
              <div className="flex flex-col">
                <p className="text-sm">Total spend</p>
                <span className="font-medium">
                  {mochiUtils.formatUsdDigit(stats?.total_spending ?? 0)}
                </span>
              </div>
            </Box>
            <Box
              icon={
                <Icon
                  icon="game-icons:receive-money"
                  className="w-full h-full opacity-80"
                />
              }
            >
              <div className="flex flex-col">
                <p className="text-sm">Total receive</p>
                <span className="font-medium">
                  {mochiUtils.formatUsdDigit(stats?.total_receive ?? 0)}
                </span>
              </div>
            </Box>
            <Box
              icon={
                <Icon
                  icon="game-icons:money-stack"
                  className="w-full h-full opacity-80"
                />
              }
            >
              <div className="flex flex-col">
                <p className="text-sm">Total volume</p>
                <span className="font-medium">
                  {mochiUtils.formatUsdDigit(stats?.total_volume ?? 0)}
                </span>
              </div>
            </Box>
          </div>

          <div className="flex gap-x-3">
            <Box
              icon={
                stats?.most_send.profile.platformIcon ? (
                  <Avatar
                    src={stats.most_send.profile.avatar}
                    smallSrc={stats.most_send.profile.platformIcon}
                    size="sm"
                  />
                ) : null
              }
            >
              <span className="text-sm">
                You send the most{' '}
                <img
                  className="inline w-4 h-4"
                  src={stats?.most_send.token.icon}
                  alt=""
                />{' '}
                <span className="font-medium">
                  {stats?.most_send.token.symbol}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {stats?.most_send.profile.plain}
                </span>
              </span>
            </Box>
            <Box
              icon={
                stats?.most_receive.profile.platformIcon ? (
                  <Avatar
                    src={stats?.most_receive.profile.avatar}
                    smallSrc={stats.most_receive.profile.platformIcon}
                    size="sm"
                  />
                ) : null
              }
            >
              <span className="text-sm">
                You receive the most{' '}
                <img
                  className="inline w-4 h-4"
                  src={stats?.most_receive.token.icon}
                  alt=""
                />{' '}
                <span className="font-medium">
                  {stats?.most_receive.token.symbol}
                </span>{' '}
                from{' '}
                <span className="font-medium">
                  {stats?.most_receive.profile.plain}
                </span>
              </span>
            </Box>
          </div>
        </div>

        <div className="flex flex-col py-3 px-4 w-1/5 bg-white rounded-lg border border-gray-200 shadow">
          <span className="flex items-center font-medium">
            <Icon icon="heroicons:inbox-20-solid" className="mr-1 w-4 h-4" />
            Inbox
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-3">
        <div className="flex flex-col py-3 px-4 bg-white rounded-lg border border-gray-200 shadow">
          <div className="flex justify-between items-center">
            <span className="flex items-center font-medium">
              <Icon
                icon="octicon:feed-star-16"
                className="mr-1 w-4 h-4 text-yellow-500"
              />
              Recent transactions
            </span>
            <span className="text-sm">Showing 10 txns</span>
          </div>
          <div className="flex flex-col gap-y-2 h-96"></div>
          <div className="mx-auto">
            <Pagination page={1} onChange={() => {}} totalPage={10} />
          </div>
        </div>
      </div>
    </div>
  )
}
