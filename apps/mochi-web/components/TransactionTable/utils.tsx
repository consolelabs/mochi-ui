import emojiStrip from 'emoji-strip'
import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import type { AssociatedAccount } from '@consolelabs/mochi-rest'
import { WebSolid } from '@mochi-ui/icons'
import { utils } from 'ethers'
import ReactDOMServer from 'react-dom/server'
import { ROUTES } from '~constants/routes'
import { appLogo, discordLogo, telegramLogo } from '~utils/image'
import { formatDate, formatRelative } from '~utils/time'
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

      const isSenderApp =
        'sender_profile_type' in d.metadata &&
        d.metadata.sender_profile_type === 'application'
      const isReceiverApp =
        'recipient_profile_type' in d.metadata &&
        d.metadata.recipient_profile_type === 'application'

      if (isSenderApp) {
        where.text = emojiStrip(
          (d.type === 'in' ? to?.plain : from?.plain) ?? 'App',
        )
        where.avatar = d.from_profile.application.avatar

        fromAvatar = d.from_profile.application.avatar
      }

      if (isReceiverApp) {
        where.text = emojiStrip(
          (d.type === 'in' ? from?.plain : to?.plain) ?? 'App',
        )
        where.avatar = d.other_profile.application.avatar

        toAvatar = d.other_profile.application.avatar
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

  let subject = to

  // handle domain name when dealing with external addresses
  if (['withdraw', 'deposit'].includes(d.action)) {
    // withdraw & deposit always target the other_profile
    const address = d.other_profile_source
    const account = d.from_profile?.associated_accounts?.find(
      (aa: any) =>
        aa.platform_identifier.toLowerCase() === address.toLowerCase(),
    )

    if (d.action === 'deposit') {
      subject = from
    }

    if (!account && subject) {
      subject.plain = d.other_profile_source
    } else if (subject) {
      const domainName = mochiUtils.string.formatAddressUsername(account)
      subject.plain = domainName
      if (mochiUtils.address.isShorten(domainName)) {
        subject.plain = d.other_profile_source
      }
      subject.plain ||= d.other_profile_source
    }
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
    singleAmount: mochiUtils.formatTokenDigit(
      utils.formatUnits(d.amount, d.token?.decimal),
    ),
    amount: mochiUtils.formatTokenDigit(
      utils.formatUnits(d.group_total_amount || d.amount, d.token?.decimal),
    ),
    amountUsd: mochiUtils.formatUsdDigit(d.group_total_usd || d.usd_amount),
    date: formatRelative(d.created_at),
    full_date: formatDate(d.created_at, 'MMMM d, yyyy HH:mm:ss'),
    rawDate: d.created_at,
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

// Build an address string that looks like this:
// 0xabc...123 & N person/people (first tx & remaining N)
export const buildAddressString = (
  addresses: Array<string | AssociatedAccount>,
) => {
  const initialAddresses = addresses.slice(0, 1)
  const remainingAddresses = addresses.slice(1)

  const initialAddressString = initialAddresses
    .map((s) => mochiUtils.string.formatAddressUsername(s))
    .join(', ')
  const remainingAddressCount = remainingAddresses.length

  if (remainingAddressCount === 0) {
    return initialAddressString
  }

  return `${initialAddressString} & ${remainingAddressCount} ${
    remainingAddressCount > 1 ? 'people' : 'person'
  }`
}

// Build a platform string that looks like this:
// Discord, Twitter & 2 other (first 2 platforms & remaining N)
export const buildPlatformString = (platforms: string[]) => {
  const initialPlatforms = platforms.slice(0, 2)
  const remainingPlatforms = platforms.slice(2)

  const initialPlatformsNameString = initialPlatforms.join(', ')
  const remainingPlatformsCount = remainingPlatforms.length

  if (remainingPlatformsCount === 0) {
    return initialPlatformsNameString
  }

  return `${initialPlatformsNameString} & ${remainingPlatformsCount} other${
    remainingPlatformsCount > 1 ? 's' : ''
  }`
}
