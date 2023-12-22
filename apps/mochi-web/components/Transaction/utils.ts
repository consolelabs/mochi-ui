import UI, { Platform, utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'
import { TransactionActionType } from '~constants/transactions'
import {
  MochiprofileMochiProfile,
  ModelProfileTransactionMetadata,
  ModelToken,
} from '~types/mochi-pay-schema'

export const ignoreOptionAll = <T>(value: T | 'all') => {
  return value === 'all' ? undefined : value
}

export const transformActionType = (action: TransactionActionType) =>
  ({
    transfer: 'tip',
    vault_transfer: 'vault transfer',
    swap: 'swap',
    payme: 'pay me',
    paylink: 'pay link',
    airdrop: 'airdrop',
    deposit: 'deposit',
    withdraw: 'widthdraw',
  })[action]

export type TransactionType = 'in' | 'out'

export function isVault(source: string) {
  return source === 'mochi-vault'
}

export const formatTransactionAmount = (amount: string, decimal: number) =>
  mochiUtils.formatTokenDigit(utils.formatUnits(amount, decimal))

export const createTransactionMesssage = ({
  type = 'in',
  action,
  token,
  amount,
  profile,
  otherProfile,
  metadata,
}: {
  type?: TransactionType
  action?: TransactionActionType
  profile?: MochiprofileMochiProfile
  otherProfile?: MochiprofileMochiProfile
  amount?: string
  token?: ModelToken
  metadata?: ModelProfileTransactionMetadata
}) => {
  const schemaType = (() => {
    if (action === 'withdraw') return 'withdraw'
    return type === 'in' ? 'received' : 'tip'
  })()

  const formatedAmount = formatTransactionAmount(
    amount ?? '',
    token?.decimal ?? 0,
  )

  const { from, to } = transformProfilePair(
    profile,
    otherProfile,
    type,
    metadata ?? {},
  )

  return {
    received: `Received ${formatedAmount} ${token?.symbol} from ${from}`,
    tip: `Tip ${to} ${formatedAmount} ${token?.symbol}`,
    withdraw: `Withdrawed - ${formatedAmount} ${token?.symbol}`,
  }[schemaType]
}

// NOTE: implement url param sync later
// export const isValidFilterType = (key: string) =>
//   typeFilters.find(({ key: validKey }) => validKey === key) !== undefined

// export const isValidFilterPlatform = (key: string) =>
//   platformFilters.find(({ key: validKey }) => validKey === key) !== undefined

export function transformProfilePair(
  formProfile: any,
  otherProfile: any,
  type: string,
  metaData: ModelProfileTransactionMetadata,
) {
  let [from, to] = UI.render(Platform.Web, formProfile, otherProfile)
  let [fromAvatar, toAvatar] = [formProfile?.avatar, otherProfile?.avatar]

  if (type === 'in') {
    ;[from, to] = [to, from]
    ;[fromAvatar, toAvatar] = [toAvatar, fromAvatar]
  }

  if (isVault(formProfile) && 'vault' in formProfile) {
    const [newFrom] = UI.render(Platform.Web, metaData.vault)
    from = newFrom
  }
  if (isVault(otherProfile) && 'vault' in metaData) {
    const [newTo] = UI.render(Platform.Web, metaData.vault)
    to = newTo
  }
  if (from?.platform === Platform.Mochi) {
    from.plain = '🍡 Mochi user'
  }

  if (to?.platform === Platform.Mochi) {
    to.plain = '🍡 Mochi user'
  }

  return {
    from: from?.plain ?? '?',
    fromAvatar,
    to: to?.plain ?? '?',
    toAvatar,
  }
}
