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
  vault_transfer: 'Vault Transfer',
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
  transfer: 'border-[#A6F4C5]',
  vault_transfer: 'border-[#EAECF0]',
  payme: 'border-[#B2DDFF]',
  paylink: 'border-[#B2DDFF]',
  swap: 'border-[#D9D6FE]',
  airdrop: 'border-[#FEDF89]',
  deposit: 'border-[#EAECF0]',
  withdraw: 'border-[#EAECF0]',
}

export const transactionActionAppearance: Record<
  TransactionActionType,
  string
> = {
  transfer: 'success',
  deposit: 'black',
  withdraw: 'black',
  vault_transfer: 'black',
  airdrop: 'warning',
  payme: 'primary',
  paylink: 'primary',
  swap: 'secondary',
}

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
