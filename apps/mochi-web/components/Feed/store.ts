import { OffchainTx } from '@consolelabs/mochi-rest'
import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'
import { create } from 'zustand'
import { API } from '~constants/api'
import { formatRelative } from '~utils/time'
import { appLogo, webLogo, discordLogo, telegramLogo } from '~utils/image'

const limit = 20 as const

export interface Tx {
  code: string
  platformIcon?: string
  where: {
    text: string
    avatar: string
  }
  from: string
  fromAvatar: string
  to: string
  toAvatar: string
  toPlatformIcon?: string
  token: {
    icon: string
    symbol: string
  }
  action: string
  amount: string
  date: string
  isSuccess?: boolean
}

function isVault(source: string) {
  return source === 'mochi-vault'
}

const actionString: Record<OffchainTx['action'], string> = {
  transfer: 'tip',
  vault_transfer: 'vault transfer',
  swap: 'swap',
  payme: 'pay me',
  paylink: 'pay link',
  airdrop: 'airdrop',
  deposit: 'deposit',
  withdraw: 'widthdraw',
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
    case 'web':
    case Platform.Web: {
      platformIcon = webLogo.src
      break
    }
    case 'app':
    case Platform.App: {
      platformIcon = appLogo.src
      break
    }
    default:
      break
  }

  const where = {
    text: 'Unknown',
    avatar: '',
  }
  if (d.metadata) {
    try {
      // defaults for discord
      if (d.source_platform === Platform.Discord) {
        where.text = 'Discord'
        where.avatar = discordLogo.src
      }

      // defaults for telegram
      if (d.source_platform === Platform.Telegram) {
        where.text = 'Telegram'
        where.avatar = telegramLogo.src
      }

      if ([Platform.Web, 'web'].includes(d.source_platform)) {
        where.text = 'Web'
        where.avatar = webLogo.src
      }

      if ([Platform.App, 'app'].includes(d.source_platform)) {
        where.text = 'App'
        where.avatar = appLogo.src
      }

      // get channel name
      if ('channel_name' in d.metadata && d.metadata.channel_name) {
        where.text = d.metadata.channel_name
      }
      // get channel avatar
      if ('channel_avatar' in d.metadata && d.metadata.channel_avatar) {
        where.avatar = d.metadata.channel_avatar
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
      console.error(e)
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

  const action = actionString[d.action as OffchainTx['action']] ?? 'tip'

  if (from?.platform === Platform.Mochi) {
    from.plain = '🍡 Mochi user'
  }

  if (to?.platform === Platform.Mochi) {
    to.plain = '🍡 Mochi user'
  }

  return {
    code: d.external_id,
    platformIcon,
    from: from?.plain ?? '?',
    fromAvatar,
    to: to?.plain ?? '?',
    toAvatar,
    toPlatformIcon,
    where,
    token: {
      icon: d.token.icon,
      symbol: d.token.symbol,
    },
    amount: mochiUtils.formatTokenDigit(
      utils.formatUnits(d.amount, d.token.decimal),
    ),
    date: formatRelative(d.created_at),
    isSuccess: d.status === 'success',
    action,
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
    ws.onopen = (e) => {
      console.info('feed connected', e)
    }

    ws.onmessage = async (e) => {
      try {
        const payload = JSON.parse(e.data)
        const { event, data } = payload
        if (event !== 'TRANSFER_CREATED') return
        get().addNewTx(await transform(data))
      } catch (e) {
        console.error(e)
      }
    }

    ws.onclose = () => {
      console.info('disconnect')
    }

    ws.onerror = (e) => {
      console.error('error', e)
    }

    set((s) => ({ ...s, ws }))
  },
}))
