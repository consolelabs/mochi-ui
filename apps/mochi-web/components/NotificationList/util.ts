import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { ActivityType } from '@consolelabs/mochi-rest'
import emojiStrip from 'emoji-strip'
import { utils } from 'ethers'
import { formatRelative } from '~utils/time'
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import { api } from '~constants/mochi'

export const MAX_PER_PAGE = 20
const actions = [8, 9, 10, 11, 12]

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
  }
}

async function transform(raw: any) {
  const [from, to] = await UI.formatProfile(
    Platform.Web,
    raw.user_profile_id || raw.target_profile_id,
    raw.target_profile_id || raw.user_profile_id,
  )
  const amount = raw.changes.find((c: any) => c.key === 'amount')?.value
  const symbol = raw.changes.find((c: any) => c.key === 'token')?.value
  const decimal = Number(
    raw.changes.find((c: any) => c.key === 'decimal')?.value,
  )
  const validDecimal = typeof decimal === 'number' && !Number.isNaN(decimal)

  let token
  if (symbol) {
    token = {
      symbol,
      decimal: -1,
      icon: '',
    }
  }

  if (validDecimal && token) {
    token.decimal = decimal
  }

  return {
    id: raw.id,
    type: raw.type,
    time: formatRelative(raw.created_at),
    isNew: raw.status === 'new',
    from: {
      address: emojiStrip(from?.plain ?? ''),
      avatar: '',
    },
    to: {
      address: emojiStrip(to?.plain ?? ''),
      avatar: '',
    },
    amount:
      amount && validDecimal && token
        ? mochiUtils.formatTokenDigit(utils.formatUnits(amount, token.decimal))
        : amount,
    token,
  }
}

export function useUnreadNotiCount(profileId?: string) {
  const { data: unreadCount = 0 } = useSWR(
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
  )
  return unreadCount
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
  )

  const currentPageLen = res.data?.[res.size - 1]?.length ?? 0

  return {
    ...res,
    data: res.data?.flat(1) ?? [],
    refresh: res.mutate,
    nextPage: () => res.setSize(res.size + 1),
    isEnd: currentPageLen === 0 || currentPageLen < MAX_PER_PAGE,
  }
}
