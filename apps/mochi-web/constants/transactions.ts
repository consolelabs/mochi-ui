export type TransactionTypeFilterKey =
  | 'all'
  | 'tip'
  | 'deposit'
  | 'withdraw'
  | 'payme'
  | 'paylink'

export const typeFilters: { key: TransactionTypeFilterKey; label: string }[] = [
  {
    key: 'all',
    label: 'All Types',
  },
  {
    key: 'tip',
    label: 'Tip',
  },
  {
    key: 'deposit',
    label: 'Deposit',
  },
  {
    key: 'withdraw',
    label: 'Withdraw',
  },
  {
    key: 'payme',
    label: 'Pay Me',
  },
  {
    key: 'paylink',
    label: 'Pay Link',
  },
]

export type TransactionPlatformFilterKey =
  | 'all'
  | 'discord'
  | 'telegram'
  | 'twitter'
  | 'email'
  | 'github'
  | 'reddit'
  | 'onchain'

export const platformFilters: {
  key: TransactionPlatformFilterKey
  label: string
}[] = [
  {
    key: 'all',
    label: 'All Platforms',
  },
  {
    key: 'discord',
    label: 'Discord',
  },
  {
    key: 'telegram',
    label: 'Telegram',
  },
  {
    key: 'twitter',
    label: 'Twitter',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'github',
    label: 'Github',
  },
  {
    key: 'reddit',
    label: 'Reddit',
  },
  {
    key: 'onchain',
    label: 'On-chain',
  },
]
