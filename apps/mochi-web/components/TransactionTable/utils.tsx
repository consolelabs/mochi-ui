import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { WebSolid } from '@mochi-ui/icons'
import { utils } from 'ethers'
import ReactDOMServer from 'react-dom/server'
import { ROUTES } from '~constants/routes'
import { appLogo, discordLogo, telegramLogo } from '~utils/image'
import { formatRelative } from '~utils/time'
import { Tx } from './types'

function isVault(source: string) {
  return source === 'mochi-vault'
}

export async function transform(d: any): Promise<Tx> {
  let [from, to] = UI.render(Platform.Web, d.from_profile, d.other_profile)
  let [fromAvatar, toAvatar] = [
    d.from_profile?.avatar || '',
    d.other_profile?.avatar || '',
  ]

  const fromPlatform = d.source_platform
  let fromPlatformIcon
  switch (d.source_platform) {
    case Platform.Discord: {
      fromPlatformIcon = discordLogo.src
      break
    }
    case Platform.Telegram: {
      fromPlatformIcon = telegramLogo.src
      break
    }
    case 'web':
    case Platform.Web: {
      fromPlatformIcon = `data:image/svg+xml,${escape(
        ReactDOMServer.renderToStaticMarkup(<WebSolid />),
      )}`
      break
    }
    case 'app':
    case Platform.App: {
      fromPlatformIcon = appLogo.src
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
      if ([Platform.App, 'app', 'application'].includes(d.source_platform)) {
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

      if ([Platform.Web, 'web'].includes(d.source_platform)) {
        // hard-code for now
        // later tip widget could be used anywhere so need to get from api response
        where.text = d.metadata.channel_name || 'beta.mochi.gg'
        where.avatar = WebSolid as any
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

  const toPlatform = to?.platform
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

  if (from?.platform === Platform.Mochi) {
    from.plain = '🍡 Mochi user'
  }

  if (to?.platform === Platform.Mochi) {
    to.plain = '🍡 Mochi user'
  }

  if (to && d.action === 'withdraw') {
    to.plain = d.other_profile_source
  } else if (from && d.action === 'deposit') {
    from.plain = d.from_profile_source
  }

  const paycode = ['payme', 'paylink'].includes(d.action) ? d.metadata.code : ''

  const siblingTxs = await Promise.all((d.sibling_txs || []).map(transform))
  const otherTxs = await Promise.all((d.other_txs || []).map(transform))

  return {
    code: d.external_id,
    paycode,
    siblingTxs,
    otherTxs,
    from: {
      address: from?.plain ?? '?',
      avatar: fromAvatar,
      platform: fromPlatform,
      platformIcon: fromPlatformIcon,
    },
    to: {
      address: to?.plain ?? '?',
      avatar: toAvatar,
      platform: toPlatform,
      platformIcon: toPlatformIcon,
    },
    where,
    token: {
      icon: d.token?.icon,
      symbol: d.token?.symbol,
    },
    amount: mochiUtils.formatTokenDigit(
      utils.formatUnits(d.amount, d.token?.decimal),
    ),
    amountUsd: mochiUtils.formatUsdDigit(d.usd_amount),
    date: formatRelative(d.created_at),
    status: d.status,
    action: d.action,
  }
}

export const openTx = (tx: Tx) => {
  if (tx.action === 'payme') {
    window.open(ROUTES.PAYME(tx.paycode))
  } else if (tx.action === 'paylink') {
    window.open(ROUTES.PAYLINK(tx.to.address, tx.paycode))
  } else {
    window.open(ROUTES.TX_RECEIPTS(tx.code))
  }
}
