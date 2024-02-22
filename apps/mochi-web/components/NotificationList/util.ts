import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { ActivityType } from '@consolelabs/mochi-rest'
import emojiStrip from 'emoji-strip'
import { utils } from 'ethers'
import { formatRelative } from '~utils/time'
import useSWR, { mutate } from 'swr'
import useSWRInfinite from 'swr/infinite'
import { api } from '~constants/mochi'
import { ROUTES } from '~constants/routes'

export const CHANGELOG_HEIGHT = 56
export const MAX_ROW_COUNT = 7
export const HEADER_HEIGHT = 45
export const FOOTER_HEIGHT = 46
export const NAVBAR_HEIGHT = 56
export const ROW_HEIGHT = 66

export const MAX_PER_PAGE = 20
const actions = [8, 9, 11, 13]
const REFRESH_INTERVAL_MS = 1000 * 60

export type NotificationRow = {
  id: number
  time: string
  isNew: boolean
  type: ActivityType
  from: {
    address: string
    avatar: string
  }
  to: {
    address: string
    avatar: string
  }
  amount?: string
  token?: {
    symbol: string
    icon: string
    decimal: number
    chainIcon: string
  }
  url?: string
}

async function transform(raw: any) {
  const [from, to] = UI.render(
    Platform.Web,
    raw.user_profile || raw.target_profile,
    raw.target_profile || raw.user_profile,
  )
  const symbol =
    raw.token?.symbol ?? raw.changes.find((c: any) => c.key === 'token')?.value
  const decimal = Number(
    raw.token?.decimal ??
      raw.changes.find((c: any) => c.key === 'decimal')?.value,
  )
  const amount = raw.changes.find((c: any) => c.key === 'amount')?.value
  const validDecimal = typeof decimal === 'number' && !Number.isNaN(decimal)

  let token
  if (symbol) {
    token = {
      symbol,
      decimal: -1,
      icon: raw.token?.icon ?? '',
      chainIcon: raw.token?.chain?.icon ?? '',
    }
  }

  if (validDecimal && token) {
    token.decimal = decimal
  }

  let url
  if (raw.type === ActivityType.ACTIVITY_PAY_RECEIVE && raw.external_id) {
    url = ROUTES.TX_RECEIPTS(raw.external_id)
  }

  return {
    id: raw.id,
    externalId: raw.external_id,
    type: raw.type,
    time: formatRelative(raw.created_at),
    isNew: raw.status === 'new',
    from: {
      address: emojiStrip(from?.plain ?? ''),
      avatar: raw.user_profile?.avatar ?? '',
    },
    to: {
      address: emojiStrip(to?.plain ?? ''),
      avatar: raw.target_profile?.avatar ?? '',
    },
    amount:
      amount && validDecimal && token
        ? mochiUtils.formatTokenDigit(utils.formatUnits(amount, token.decimal))
        : amount,
    token,
    url,
  }
}

export function useUnreadNotiCount(profileId?: string) {
  const { data: unreadCount = 0, mutate } = useSWR(
    ['notification-list-unread', profileId],
    async ([_, profileId]) => {
      if (!profileId) return 0
      const res = await api.profile.activities.getByUser({
        profileId,
        actions,
        status: 'new',
      })
      if (!res.ok) {
        console.error(res.error)
        return 0
      }

      return res.pagination.total
    },
    { refreshInterval: REFRESH_INTERVAL_MS },
  )
  return { count: unreadCount, refresh: mutate }
}

export function useNotificationData(
  tabValue: 'for-you' | 'unread',
  profileId?: string,
) {
  const res = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null
      return ['notification-list', profileId, tabValue, pageIndex]
    },
    async ([_, profileId, status, page]) => {
      if (!profileId) return []
      const res = await api.profile.activities.getByUser({
        profileId,
        actions,
        size: MAX_PER_PAGE,
        page,
        ...(status === 'unread' ? { status: 'new' } : {}),
      })
      if (!res.ok) {
        console.error(res.error)
        return []
      }
      return Promise.all(res.data.map(transform))
    },
    {
      refreshInterval: REFRESH_INTERVAL_MS,
    },
  )

  const currentPageLen = res.data?.[res.size - 1]?.length ?? 0

  const data = res.data?.flat(1) ?? []

  return {
    ...res,
    data,
    refresh: res.mutate,
    optimisticMarkReadAll: () => {
      const newData = res.data?.map((d) =>
        d.map((r) => ({ ...r, isNew: false })),
      )
      res
        .mutate(newData, { optimisticData: newData, revalidate: false })
        .then(() => {
          mutate(['notification-list', profileId, 'unread', res.size], [], {
            optimisticData: [],
            revalidate: false,
          })
        })
    },
    nextPage: () => res.setSize(res.size + 1),
    isEnd: currentPageLen === 0 || currentPageLen < MAX_PER_PAGE,
  }
}
