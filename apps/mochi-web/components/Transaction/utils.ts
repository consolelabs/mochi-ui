import { OffchainTx } from '@consolelabs/mochi-rest'
import { utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'
import {
  TransactionPlatformFilterKey,
  TransactionTypeFilterKey,
  platformFilters,
  typeFilters,
} from '~constants/transactions'
import { MochiprofileMochiProfile, ModelToken } from '~types/mochi-pay-schema'

export type TransactionType = 'in' | 'out'

export const actionString: Record<OffchainTx['action'], string> = {
  transfer: 'tip',
  vault_transfer: 'vault transfer',
  swap: 'swap',
  payme: 'pay me',
  paylink: 'pay link',
  airdrop: 'airdrop',
  deposit: 'deposit',
  withdraw: 'widthdraw',
}

export type ActionType = keyof typeof actionString

// TODO: render for vault case
// export function isVault(source: string) {
//   return source === 'mochi-vault'
// }

export const formatTransactionAmount = (amount: string, decimal: number) =>
  mochiUtils.formatTokenDigit(utils.formatUnits(amount, decimal))

export const arrangeTransactionProfile = ({
  profile,
  otherProfile,
  type,
}: {
  profile?: MochiprofileMochiProfile
  otherProfile?: MochiprofileMochiProfile
  type: TransactionType
}) => {
  if (type === 'in')
    return {
      from: profile,
      to: otherProfile,
    }
  return {
    from: otherProfile,
    to: profile,
  }
}

export const createTransactionMesssage = ({
  type,
  action,
  token,
  amount,
  from,
  to,
}: {
  type?: TransactionType
  action?: ActionType
  from?: MochiprofileMochiProfile
  to?: MochiprofileMochiProfile
  amount?: string
  token?: ModelToken
}) => {
  const schemaType = (() => {
    if (action === 'withdraw') return 'withdraw'
    return type === 'in' ? 'received' : 'tip'
  })()

  const formatedAmount = formatTransactionAmount(
    amount ?? '',
    token?.decimal ?? 0,
  )

  const fromProfileName = from?.profile_name ?? 'Unknown'
  const toProfileName = to?.profile_name ?? 'Unknown'

  return {
    received: `Received ${formatedAmount} ${token?.symbol} from ${fromProfileName}`,
    tip: `Tip ${toProfileName} ${formatedAmount} ${token?.symbol}`,
    withdraw: `Withdrawed - ${formatedAmount} {token.symbol}`,
  }[schemaType]
}

export const transformActionType = (action: string) =>
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

export const actionTypeFilter = (
  action: string,
  filterKey: TransactionTypeFilterKey,
) =>
  filterKey === 'all'
    ? true
    : {
        transfer: 'tip',
        deposit: 'deposit',
        withdraw: 'widthdraw',
        payme: 'payme',
        paylink: 'paylink',
        // FIXME?: no filter for
        // vault_transfer: 'vault transfer',
        // swap: 'swap',
        // airdrop: 'airdrop',
      }[action] === filterKey

export const platformFilter = (
  platform: string,
  filterKey: TransactionPlatformFilterKey,
) => (filterKey === 'all' ? true : platform === filterKey)

export const isValidFilterType = (key: string) =>
  typeFilters.find(({ key: validKey }) => validKey === key) !== undefined

export const isValidFilterPlatform = (key: string) =>
  platformFilters.find(({ key: validKey }) => validKey === key) !== undefined
