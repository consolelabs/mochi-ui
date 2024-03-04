import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { coinIcon, discordLogo, telegramLogo, xlogo } from '~utils/image'
import { utils } from 'ethers'
import { api } from '~constants/mochi'
import { HOME_URL } from '~envs'
import { truncate } from '@dwarvesf/react-utils'
import { formatTokenDigit } from '~utils/string'
import { templates, type TemplateName } from './Template'

function getAmountData(tx: any) {
  const amountSymbol = formatTokenDigit({
    value: utils.formatUnits(tx?.amount ?? 0, tx?.token.decimal ?? 0),
  })
  const amountDisplay = amountSymbol
  // TODO: moniker
  // const amountDisplay = tx.metadata.moniker
  //   ? tx.metadata.original_amount
  //   : amountSymbol
  // const unitCurrency = tx.metadata.moniker
  //   ? tx.metadata.moniker
  //   : tx.token.symbol
  // const amountApproxMoniker = tx.metadata.moniker
  //   ? `${amountSymbol} ${tx.token.symbol}`
  //   : ``
  const amountSection = tx.metadata.moniker
    ? `${amountDisplay} ${tx.metadata.moniker}`
    : `${amountDisplay} ${tx.token.symbol}`
  // const unitAmountSection = tx.metadata.moniker
  //   ? `(${amountSymbol} ${tx.token.symbol})`
  //   : null
  const amountUsd = mochiUtils.formatUsdDigit(tx.usd_amount)

  return {
    amountDisplay,
    unitCurrency: tx.token.symbol,
    amountApproxMoniker: '',
    amountSection,
    unitAmountSection: null,
    amountUsd,
  }
}

export async function transformData(rawData: any) {
  const templateName =
    rawData.metadata?.template?.slug.toLowerCase() as TemplateName
  const template = templates[templateName] ?? null

  const { type, action, status } = rawData
  const isMultipleReceivers =
    Array.isArray(rawData.other_profiles) && rawData.other_profiles.length > 1
  const isMultipleSenders =
    action !== 'airdrop' &&
    Array.isArray(rawData.other_txs) &&
    rawData.other_txs.length
  const isMultipleTokens =
    Array.isArray(rawData.other_txs) && rawData.other_txs.length > 0
      ? rawData.other_txs.some((tx: any) => tx.token_id !== rawData.token_id)
      : false

  let avatar = (rawData.from_profile.avatar || '') as string
  let [sender, receiver] = UI.render(
    Platform.Web,
    rawData.from_profile_source === 'mochi-vault'
      ? rawData.metadata.vault
      : rawData.from_profile,
    rawData.other_profile_source === 'mochi-vault'
      ? rawData.metadata.vault
      : rawData.other_profile,
  )

  if (sender?.plain && template?.title) {
    template.title = template.title.replace('<user>', sender.plain)
  }

  if (type === 'in') {
    ;[sender, receiver] = [receiver, sender]

    if (rawData.other_profile?.avatar) {
      const rawAvatar = rawData.other_profile.avatar
      avatar = rawAvatar
    }
  }

  // handle domain name when dealing with external addresses
  if (['withdraw', 'deposit'].includes(rawData.action)) {
    let subject = receiver
    // withdraw & deposit always target the other_profile
    const address = rawData.other_profile_source
    const account = rawData.from_profile?.associated_accounts?.find(
      (aa: any) =>
        aa.platform_identifier.toLowerCase() === address.toLowerCase(),
    )

    if (rawData.action === 'deposit') {
      subject = sender
    }

    if (!account && subject) {
      subject.plain = rawData.other_profile_source
    } else if (subject) {
      const domainName = mochiUtils.string.formatAddressUsername(account)
      subject.plain = domainName
      if (mochiUtils.address.isShorten(domainName)) {
        subject.plain = rawData.other_profile_source
      }
      subject.plain ||= rawData.other_profile_source
    }
  }

  let platformIcon = null
  switch (sender?.platform) {
    case Platform.Discord: {
      platformIcon = discordLogo.src
      break
    }
    case Platform.Telegram: {
      platformIcon = telegramLogo.src
      break
    }
    case Platform.Twitter: {
      platformIcon = xlogo.src
      break
    }
    default:
      break
  }

  const ogDataOnly = {
    from: (sender?.plain ?? '') as any,
    native: rawData?.token.native,
    tokenIcon: rawData.token.icon || `${HOME_URL}/assets/coin.png`,
    to: (receiver?.plain ?? '') as any,
    symbol: rawData?.token.symbol,
    amount: mochiUtils.formatTokenDigit({
      scientificFormat: false,
      subscript: false,
      value: utils.formatUnits(
        rawData?.amount ?? 0,
        rawData?.token.decimal ?? 0,
      ),
      bound: {
        hi: 1_000_000,
        lo: -1_000_000,
      },
    }),
    usd_amount: mochiUtils.formatUsdDigit(rawData.usd_amount),
    short_date: '',
    full_date: '',
    external_id: rawData.external_id,
    moniker: rawData.metadata.moniker || '',
    original_amount: rawData.metadata.original_amount || '',
    template,
    status,
    isSuccess: status === 'success',
    isFail: status === 'failed',
    action,
    title: '',
    description: '',
  }

  const data = {
    ...ogDataOnly,
    template,
  }

  if (rawData) {
    data.short_date = rawData?.created_at
    data.full_date = rawData?.created_at
  }

  const {
    unitAmountSection,
    amountSection,
    amountApproxMoniker,
    unitCurrency,
    amountDisplay,
    amountUsd,
  } = getAmountData(rawData)

  // @ts-ignore
  const groupAmountDisplay = mochiUtils.formatTokenDigit({
    value: utils.formatUnits(
      rawData.group_total_amount ?? 0,
      rawData?.token.decimal ?? 0,
    ),
    scientificFormat: false,
    subscript: false,
    bound: {
      hi: 1_000_000,
      lo: -1_000_000,
    },
  })
  // @ts-ignore
  const groupAmountUsdDisplay = mochiUtils.formatUsdDigit(
    rawData.group_total_usd,
  )

  const originalTxId = rawData.original_tx_id

  data.from = [
    {
      name: sender?.plain ?? '',
      url: `/tx/${data.external_id}`,
      tokenIcon: data.tokenIcon,
      amountDisplay,
      amountUsd,
      unitAmountSection,
    },
  ]
  if (isMultipleSenders) {
    data.from = data.from.concat([
      ...(await Promise.all(
        rawData.other_txs.map(async (tx: any) => {
          const [profile] = UI.render(Platform.Web, tx.from_profile)
          const { ok, data } = await api.base.metadata.getEmojis({
            codes: [tx.token.symbol],
          })
          const { amountDisplay, amountUsd, unitAmountSection } =
            getAmountData(tx)

          return {
            name: profile?.plain ?? '',
            url: `/tx/${tx.external_id}`,
            tokenIcon: ok ? data[0].emoji_url : coinIcon.src,
            amountDisplay,
            amountUsd,
            unitAmountSection,
          }
        }),
      )),
    ])
  }

  data.to = [{ name: receiver?.plain ?? '', url: `/tx/${rawData.external_id}` }]
  if (isMultipleReceivers) {
    data.to = rawData.other_profiles
      .map((p: any) => {
        const [profile] = UI.render(Platform.Web, p)

        return {
          name: profile?.plain ?? '',
          url: `/tx/${
            rawData.other_txs.find((tx: any) => tx.other_profile_id === p.id)
              ?.external_id ?? rawData.external_id
          }`,
          tokenIcon: data.tokenIcon,
          amountDisplay,
          amountUsd,
          unitAmountSection,
        }
      })
      .filter(Boolean)
  }

  switch (rawData.action) {
    case 'transfer':
      ogDataOnly.title = `Tip from ${data.from[0].name}`
      ogDataOnly.description = `${data.from[0].name} paid ${
        data.to.length > 1 ? `${data.to.length} people` : data.to[0].name
      } ${amountDisplay} ${unitCurrency}${
        rawData.metadata?.message
          ? ` with message: "${truncate(rawData.metadata.message, 30, false)}"`
          : ''
      }`
      break
    case 'deposit':
      ogDataOnly.title = `Deposit from ${data.from[0].name}`
      break
    case 'withdraw':
      ogDataOnly.title = `Withdraw to ${data.to[0].name}`
      break
    case 'vault_transfer':
      ogDataOnly.title = `${data.from[0].name} vault transfer`
      break
    case 'airdrop':
      ogDataOnly.title = `Airdrop from ${data.from[0].name}`
      break
    default:
      break
  }

  if (data.template) {
    ogDataOnly.title = data.template.title
  }

  return {
    data,
    ogDataOnly,
    platformIcon,
    senderAvatar: avatar,
    amountDisplay,
    unitCurrency,
    amountApproxMoniker,
    amountSection,
    unitAmountSection,
    amountUsd,
    message: rawData.metadata?.message ?? '',
    groupAmountDisplay,
    groupAmountUsdDisplay,
    originalTxId,
    isMultipleTokens,
  }
}
