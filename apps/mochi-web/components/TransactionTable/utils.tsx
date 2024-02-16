import { Typography } from '@mochi-ui/core'
import emojiStrip from 'emoji-strip'
import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import type { AssociatedAccount } from '@consolelabs/mochi-rest'
import { WebSolid } from '@mochi-ui/icons'
import { utils, BigNumber } from 'ethers'
import ReactDOMServer from 'react-dom/server'
import { ROUTES } from '~constants/routes'
import { appLogo, discordLogo, telegramLogo } from '~utils/image'
import { formatDate, formatRelative } from '~utils/time'
import { Tx } from './types'

function isVault(source: string) {
  return source === 'mochi-vault'
}

export async function transform(d: any, isNested = false): Promise<Tx> {
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
        ReactDOMServer.renderToStaticMarkup(
          <WebSolid className="text-text-primary" />,
        ),
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
        // service to get any website's favicon
        where.avatar = `https://icon.horse/icon/${where.text}`
        /* where.avatar = WebSolid as any */
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

  // handle domain name when dealing with external addresses
  if (['withdraw', 'deposit'].includes(d.action)) {
    let subject = to
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
      const domainName = mochiUtils.string.formatAddressUsername(account, 10)
      subject.plain = domainName
      if (mochiUtils.address.isShorten(domainName)) {
        subject.plain = d.other_profile_source
      }
      subject.plain ||= d.other_profile_source
    }
  }

  const paycode = ['payme', 'paylink'].includes(d.action) ? d.metadata.code : ''

  const siblingTxs = await Promise.all(
    (d.sibling_txs || []).map((d: any) => transform(d)),
  )
  const otherTxs = await Promise.all(
    (d.other_txs || [])
      .map((otherTx: any) =>
        isNested ? otherTx : { ...otherTx, other_txs: d.other_txs },
      )
      .map((otherTx: any) => transform(otherTx, true)),
  )

  // join tip
  let sumAmount = BigNumber.from(d.amount)
  for (const otherTx of d.other_txs ?? []) {
    if (otherTx.token.id !== d.token.id) continue
    sumAmount = sumAmount.add(otherTx.amount)
  }

  return {
    code: d.external_id,
    paycode,
    siblingTxs: !isNested && d.other_txs?.length > 0 ? otherTxs : siblingTxs,
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
      id: d.token?.id,
      icon: d.token?.icon,
      symbol: d.token?.symbol,
      decimal: d.token?.decimal,
    },
    singleAmount: mochiUtils.formatTokenDigit(
      utils.formatUnits(sumAmount, d.token?.decimal),
    ),
    amount: isNested
      ? d.amount
      : mochiUtils.formatTokenDigit(
          utils.formatUnits(d.group_total_amount || d.amount, d.token?.decimal),
        ),
    amountUsd: mochiUtils.formatUsdDigit(d.group_total_usd || d.usd_amount),
    date: formatRelative(d.created_at),
    full_date: formatDate(d.created_at, 'MMMM d, yyyy HH:mm:ss'),
    rawDate: d.created_at,
    status: d.status,
    action: d.action,
    isMultipleTokens:
      d.other_txs?.length > 0
        ? new Set(d.other_txs.map((otherTx: any) => otherTx.token.id)).size > 1
        : false,
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
  const isInitialAddress = mochiUtils.address.isAddress(
    typeof initialAddresses[0] === 'string'
      ? initialAddresses[0]
      : initialAddresses[0].platform_identifier,
  ).valid

  const remainingAddressCount = remainingAddresses.length
  const initialAddressString = initialAddresses
    .map((s) =>
      remainingAddressCount === 0 &&
      typeof s === 'string' &&
      !mochiUtils.address.isAddress(s).valid
        ? mochiUtils.string.formatAddressUsername(s, 20)
        : mochiUtils.string.formatAddressUsername(s, 10),
    )
    .join(', ')

  let first: React.ReactNode = initialAddressString

  if (isInitialAddress) {
    first = (
      <Typography className="inline font-mono" level="p5">
        {initialAddressString}
      </Typography>
    )
  }

  if (remainingAddressCount === 0) {
    return first
  }

  if (isInitialAddress) {
    return (
      <>
        {first} & {remainingAddressCount}{' '}
        {remainingAddressCount > 1 ? 'people' : 'person'}
      </>
    )
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
