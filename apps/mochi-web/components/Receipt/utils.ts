import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { discordLogo, telegramLogo, xlogo } from '~utils/image'
import { utils } from 'ethers'
import { HOME_URL } from '~envs'
import { format } from 'date-fns'
import { templates, type TemplateName } from './Template'

export async function transformData(rawData: any) {
  const templateName =
    rawData.metadata?.template?.slug.toLowerCase() as TemplateName
  const template = templates[templateName] ?? null

  const { type } = rawData
  const isMultipleReceivers = Array.isArray(rawData.other_profiles)
  const success = rawData.status === 'success'

  let avatar = (rawData.from_profile.avatar || '') as string
  let [sender, receiver] = await UI.resolve(
    Platform.Web,
    rawData.from_profile_source === 'mochi-vault'
      ? {
          type: 'vault',
          id: rawData.metadata.vault_request.vault_id.toString(),
        }
      : rawData.from_profile_id,
    rawData.other_profile_source === 'mochi-vault'
      ? {
          type: 'vault',
          id: rawData.metadata.vault_request.vault_id.toString(),
        }
      : rawData.other_profile_id,
  )

  if (sender?.plain && template?.title) {
    template.title = template.title.replace('<user>', sender.plain)
  }

  if (type === 'in') {
    ;[sender, receiver] = [receiver, sender]
    avatar = rawData.other_profile.avatar
  }

  let platformIcon
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

  const { image } = await UI.components.amount({
    on: Platform.Web,
    amount: utils.formatUnits(
      rawData?.amount ?? 0,
      rawData?.token.decimal ?? 0,
    ),
    symbol: rawData.token.symbol,
  })

  const ogDataOnly = {
    from: sender?.plain ?? '',
    native: rawData?.token.native,
    tokenIcon: image || `${HOME_URL}/assets/coin.png`,
    to: receiver?.plain ?? ('' as string | string[]),
    symbol: rawData?.token.symbol,
    amount: mochiUtils.formatTokenDigit({
      value: utils.formatUnits(
        rawData?.amount ?? 0,
        rawData?.token.decimal ?? 0,
      ),
      scientificFormat: true,
    }),
    usd_amount: mochiUtils.formatUsdDigit(rawData.usd_amount),
    short_date: '',
    full_date: '',
    external_id: rawData.external_id,
    moniker: rawData.metadata.moniker || '',
    original_amount: rawData.metadata.original_amount || '',
    template,
    success,
  }

  const data = {
    ...ogDataOnly,
    template,
  }

  if (isMultipleReceivers) {
    const promises = await Promise.allSettled(
      rawData.other_profiles.map(async (p: any) => {
        const [profile] = await UI.resolve(Platform.Web, p.id)
        return profile?.plain ?? ''
      }),
    )

    data.to = promises
      .map((p) => (p.status === 'fulfilled' ? p.value : ''))
      .filter(Boolean)
  }

  if (rawData) {
    data.short_date = format(new Date(rawData?.created_at), 'MMM do, yyyy')
    data.full_date = format(new Date(rawData?.created_at), 'dd/MM/yyyy hh:mmaa')
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
  const isLongNumber = amountDisplay.length >= 12

  const amountUsd = mochiUtils.formatUsdDigit(rawData.usd_amount)

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
  }
}
