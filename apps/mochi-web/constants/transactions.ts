import {
  ParachuteLine,
  ArrowDownLine,
  ArrowUpLine,
  BankLine,
  CoinSwapLine,
  DiscordColored,
  DollarBubbleCircleSolid,
  LinkCircledSolid,
  PaymentCashOutLine,
  ShapesSolid,
  WebSolid,
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
  transfer: PaymentCashOutLine,
  vault_transfer: BankLine,
  payme: DollarBubbleCircleSolid,
  swap: CoinSwapLine,
  paylink: LinkCircledSolid,
  airdrop: ParachuteLine,
  deposit: ArrowDownLine,
  withdraw: ArrowUpLine,
}

export const transactionActionColor: Record<TransactionActionType, string> = {
  transfer: 'text-[#039855] bg-[#d1fadf]',
  vault_transfer: 'text-[#5d6267] bg-[#f2f4f7]',
  payme: 'text-[#175CD3] bg-[#d1e9ff]',
  paylink: 'text-[#175CD3] bg-[#d1e9ff]',
  swap: 'text-[#6938ef] bg-[#ebe9fe]',
  airdrop: 'text-[#0891b2] bg-[#cffafe]',
  deposit: 'bg-[#f2f4f7] text-[#5d6267]',
  withdraw: 'bg-[#f2f4f7] text-[#5d6267]',
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
