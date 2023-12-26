import { OffchainTx } from '@consolelabs/mochi-rest'
import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { MonitorLine } from '@mochi-ui/icons'
import { utils } from 'ethers'
import { Tx } from '~cpn/TransactionTable'
import { appLogo, discordLogo, telegramLogo, webLogo } from '~utils/image'
import { formatRelative } from '~utils/time'

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
      fromPlatformIcon = webLogo.src
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

      if ([Platform.Web, 'web'].includes(d.source_platform)) {
        where.text = 'Web'
        where.avatar = MonitorLine as any
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

  const action = actionString[d.action as OffchainTx['action']] ?? 'tip'

  if (from?.platform === Platform.Mochi) {
    from.plain = '🍡 Mochi user'
  }

  if (to?.platform === Platform.Mochi) {
    to.plain = '🍡 Mochi user'
  }

  return {
    code: d.external_id,
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
