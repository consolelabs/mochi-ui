import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'
import { create } from 'zustand'
import { API } from '~constants/api'
import { formatDate } from '~utils/time'
import { discordLogo, telegramLogo } from '~utils/image'

const limit = 20 as const

export interface Tx {
  code: string
  sourcePlatform: string
  platformIcon?: string
  channel: string
  from: string
  fromAvatar: string
  to: string
  toAvatar: string
  toPlatformIcon?: string
  token: {
    icon: string
    symbol: string
  }
  amount: string
  date: string
  isSuccess?: boolean
}

function isVault(source: string) {
  return source === 'mochi-vault'
}

async function transform(d: any): Promise<Tx> {
  let [from, to] = UI.render(Platform.Web, d.from_profile, d.other_profile)
  let [fromAvatar, toAvatar] = [d.from_profile.avatar, d.other_profile.avatar]

  let platformIcon
  switch (d.source_platform) {
    case Platform.Discord: {
      platformIcon = discordLogo.src
      break
    }
    case Platform.Telegram: {
      platformIcon = telegramLogo.src
      break
    }
    default:
      break
  }

  let channel = 'Unknown'
  if (d.metadata) {
    try {
      // get channel name
      if ('channel_name' in d.metadata) {
        channel = d.metadata.channel_name
      }

      // get vault name (if it's a vault_transfer tx)
      if (isVault(d.from_profile_source) && 'vault' in d.metadata) {
        const [newFrom] = UI.render(Platform.Web, d.metadata.vault)
        from = newFrom
      }
      if (isVault(d.other_profile_source) && 'vault' in d.metadata) {
        const [newTo] = UI.render(Platform.Web, d.metadata.vault)
        to = newTo
      }
    } catch (e) {
      console.log(e)
    }
  }

  if (d.type === 'in') {
    ;[from, to] = [to, from]
    ;[fromAvatar, toAvatar] = [toAvatar, fromAvatar]
  }

  let toPlatformIcon
  switch (to?.platform) {
    case Platform.Discord: {
      toPlatformIcon = discordLogo.src
      break
    }
    case Platform.Telegram: {
      toPlatformIcon = telegramLogo.src
      break
    }
    default:
      break
  }

  return {
    code: d.external_id,
    sourcePlatform: d.source_platform,
    platformIcon,
    from: from?.plain ?? '?',
    fromAvatar,
    to: to?.plain ?? '?',
    toAvatar,
    toPlatformIcon,
    channel,
    token: {
      icon: d.token.icon,
      symbol: d.token.symbol,
    },
    amount: mochiUtils.formatTokenDigit(
      utils.formatUnits(d.amount, d.token.decimal),
    ),
    date: formatDate(d.created_at, 'dd/MM/yyyy hh:mmaa'),
    isSuccess: d.status === 'success',
  }
}

interface State {
  txns: Tx[]
  addNewTx: (tx: Tx) => void
  loading: boolean
  fetchTxns: () => Promise<void>
  initWs: (override?: boolean) => void
  ws: WebSocket | null
}

export const useTipFeed = create<State>((set, get) => ({
  txns: [],
  loading: true,
  addNewTx: (tx) => {
    set((s) => ({ ...s, txns: [tx, ...s.txns].slice(0, limit) }))
  },
  fetchTxns: async () => {
    await new Promise((r) => {
      setTimeout(r, 1000)
    })
    set((s) => ({ ...s, loading: true }))
    return API.MOCHI_PAY.get('/transactions/latest')
      .json((r) => r.data)
      .then((data) => {
        Promise.allSettled(data.map(transform)).then((results) => {
          set((s) => ({
            ...s,
            loading: false,
            txns: results
              .map((c) => (c.status === 'fulfilled' ? c.value : null))
              .filter(Boolean) as any,
          }))
        })
      })
  },
  ws: null,
  initWs: (override = false) => {
    if (!override && get().ws) return
    const ws = new WebSocket(
      'wss://api-preview.mochi-pay.console.so/ws/transactions',
    )
    ws.onopen = function (e) {
      console.log('feed connected', e)
    }

    ws.onmessage = async function (e) {
      try {
        const payload = JSON.parse(e.data)
        const { event, data } = payload
        if (event !== 'TRANSFER_CREATED') return
        get().addNewTx(await transform(data))
      } catch (e) {
        console.error(e)
      }
    }

    ws.onclose = function () {
      console.log('disconnect')
    }

    ws.onerror = function (e) {
      console.log('error', e)
    }

    set((s) => ({ ...s, ws }))
  },
}))
