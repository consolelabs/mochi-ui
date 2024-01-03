import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { discordLogo, telegramLogo, xlogo } from '~utils/image'
import { utils } from 'ethers'
import { api } from '~constants/mochi'
import { HOME_URL } from '~envs'
import { templates, type TemplateName } from './Template'

export async function transformData(rawData: any) {
  const templateName =
    rawData.metadata?.template?.slug.toLowerCase() as TemplateName
  const template = templates[templateName] ?? null

  const { type, action } = rawData
  const isMultipleReceivers =
    Array.isArray(rawData.other_profiles) && rawData.other_profiles.length > 1
  const isMultipleSenders =
    action !== 'airdrop' &&
    Array.isArray(rawData.other_txs) &&
    rawData.other_txs.length
  const success = rawData.status === 'success'

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
    const rawAvatar = rawData.other_profile.avatar
    avatar = rawAvatar
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

  const { data: emojiData } = await api.base.metadata.getEmojis({
    codes: [rawData.token.symbol],
  })
  const image = emojiData?.[0]?.emoji_url

  const ogDataOnly = {
    from: (sender?.plain ?? '') as string | { name: string; url: string }[],
    native: rawData?.token.native,
    tokenIcon: image || `${HOME_URL}/assets/coin.png`,
    to: (receiver?.plain ?? '') as string | { name: string; url: string }[],
    symbol: rawData?.token.symbol,
    amount: mochiUtils.formatTokenDigit({
      value: utils.formatUnits(
        rawData?.amount ?? 0,
        rawData?.token.decimal ?? 0,
      ),
    }),
    usd_amount: mochiUtils.formatUsdDigit(rawData.usd_amount),
    short_date: '',
    full_date: '',
    external_id: rawData.external_id,
    moniker: rawData.metadata.moniker || '',
    original_amount: rawData.metadata.original_amount || '',
    template,
    success,
    action: action.replaceAll('_', ' '),
  }

  const data = {
    ...ogDataOnly,
    template,
  }

  if (isMultipleSenders) {
    data.from = [
      { name: sender?.plain ?? '', url: `/tx/${data.external_id}` },
      ...rawData.other_txs.map((tx: any) => {
        const [profile] = UI.render(Platform.Web, tx.from_profile)
        return {
          name: profile?.plain ?? '',
          url: `/tx/${tx.external_id}`,
        }
      }),
    ]
  }

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
        }
      })
      .filter(Boolean)
  }

  if (rawData) {
    data.short_date = rawData?.created_at
    data.full_date = rawData?.created_at
  }

  const amountSymbol = data.amount
  const amountDisplay = rawData.metadata.moniker
    ? rawData.metadata.original_amount
    : amountSymbol
  const unitCurrency = rawData.metadata.moniker
    ? rawData.metadata.moniker
    : rawData.token.symbol
  const amountApproxMoniker = rawData.metadata.moniker
    ? `${amountSymbol} ${rawData.token.symbol}`
    : ``
  const amountSection = rawData.metadata.moniker
    ? `${amountDisplay} ${rawData.metadata.moniker}`
    : `${amountDisplay} ${rawData.token.symbol}`
  const unitAmountSection = rawData.metadata.moniker
    ? `(${amountSymbol} ${rawData.token.symbol})`
    : null

  const amountUsd = mochiUtils.formatUsdDigit(rawData.usd_amount)

  // @ts-ignore
  const groupAmountDisplay = mochiUtils.formatTokenDigit({
    value: utils.formatUnits(
      rawData.group_total_amount ?? 0,
      rawData?.token.decimal ?? 0,
    ),
    scientificFormat: true,
  })
  // @ts-ignore
  const groupAmountUsdDisplay = mochiUtils.formatUsdDigit(
    rawData.group_total_usd,
  )

  const isLongNumber = groupAmountDisplay.length >= 12

  const originalTxId = rawData.original_tx_id

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
    isLongNumber,
    amountUsd,
    message: rawData.metadata?.message ?? '',
    groupAmountDisplay,
    groupAmountUsdDisplay,
    originalTxId,
  }
}
