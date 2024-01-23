import {
  DiscordColored,
  ShapesSolid,
  WebSolid,
  ArrowUpSquareSolid,
  ArrowDownSquareSolid,
  TipSolid,
  DollarBubbleSolid,
  LinkSquircledSolid,
  ParachuteCircleSolid,
  RefreshSolid,
} from '@mochi-ui/icons'
import { SVGProps } from 'react'
import Telegram from '~cpn/MochiWidget/PlatformPicker/icons/telegram-ic'

export type TransactionActionType =
  | 'transfer'
  | 'vault_transfer'
  | 'payme'
  | 'swap'
  | 'paylink'
  | 'airdrop'
  | 'deposit'
  | 'withdraw'

export type TransactionStatus =
  | 'submitted'
  | 'failed'
  | 'pending'
  | 'success'
  | 'expired'

export const transactionActionString: Record<TransactionActionType, string> = {
  transfer: 'Tip',
  vault_transfer: 'Vault',
  payme: 'Pay Me',
  swap: 'Swap',
  paylink: 'Pay Link',
  airdrop: 'Airdrop',
  deposit: 'Deposit',
  withdraw: 'Withdraw',
}

export const transactionActionIcon: Record<
  TransactionActionType,
  (p: SVGProps<SVGSVGElement>) => JSX.Element
> = {
  transfer: TipSolid,
  vault_transfer: TipSolid,
  payme: DollarBubbleSolid,
  swap: RefreshSolid,
  paylink: LinkSquircledSolid,
  airdrop: ParachuteCircleSolid,
  deposit: ArrowDownSquareSolid,
  withdraw: ArrowUpSquareSolid,
}

export const transactionActionColor: Record<TransactionActionType, string> = {
  transfer: 'border-success-outline-border',
  vault_transfer: 'border-neutral-outline-border',
  payme: 'border-primary-outline-border',
  paylink: 'border-primary-outline-border',
  swap: 'border-secondary-outline-border',
  airdrop: 'border-warning-outline-border',
  deposit: 'border-neutral-outline-border',
  withdraw: 'border-neutral-outline-border',
}

export const transactionActionAppearance = {
  transfer: 'success',
  deposit: 'neutral',
  withdraw: 'neutral',
  vault_transfer: 'neutral',
  airdrop: 'warning',
  payme: 'primary',
  paylink: 'primary',
  swap: 'secondary',
} as const

export const typeFilters: {
  label: string
  value: TransactionActionType | 'all'
}[] = [
  {
    label: 'All Types',
    value: 'all',
  },
  {
    label: 'Tip',
    value: 'transfer',
  },
  {
    label: 'Deposit',
    value: 'deposit',
  },
  {
    label: 'Withdraw',
    value: 'withdraw',
  },
  {
    label: 'Pay Me',
    value: 'payme',
  },
  {
    label: 'Pay Link',
    value: 'paylink',
  },
  {
    label: 'Vault',
    value: 'vault_transfer',
  },
]

export type TransactionPlatform = 'discord' | 'web' | 'telegram'

export const platformFilters: {
  label: string
  value: TransactionPlatform | 'all'
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}[] = [
  {
    label: 'All Platforms',
    value: 'all',
    icon: ShapesSolid,
  },
  {
    label: 'Web',
    value: 'web',
    icon: WebSolid,
  },
  {
    label: 'Discord',
    value: 'discord',
    icon: DiscordColored,
  },
  {
    label: 'Telegram',
    value: 'telegram',
    icon: Telegram,
  },
]
