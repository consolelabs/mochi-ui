import { PaginationProps, TableProps } from '@mochi-ui/core'
import {
  TransactionActionType,
  TransactionStatus,
} from '~constants/transactions'

export interface Tx {
  code: string
  paycode: string
  siblingTxs: Tx[]
  otherTxs: Tx[]
  where: {
    text: string
    avatar: string | ((...props: any[]) => JSX.Element)
  }
  from: {
    address: string
    avatar: string
    platform?: string
    platformIcon?: string
  }
  to: {
    address: string
    avatar: string
    platform?: null | string
    platformIcon?: string
  }
  token: {
    icon: string
    symbol: string
  }
  action: TransactionActionType
  singleAmount: string
  amount: string
  amountUsd: string
  date: string
  full_date: string
  rawDate: string
  status: TransactionStatus
  isNew?: boolean
}

export type TransactionTableProps = Omit<TableProps<Tx>, 'columns'> & {
  componentsProps?: {
    pagination?: false | PaginationProps
    empty?: {
      className?: string
    }
  }
  columns?: {
    from?: boolean
    arrow?: boolean
    to?: boolean
    type?: boolean
    amount?: boolean
    where?: boolean
    txId?: boolean
    wen?: boolean
    status?: boolean
  }
  enableColFilter?: boolean
  enableColSort?: boolean
  fetching?: boolean
  filters?: TransactionFilters
  setFilters?: (partialFilters: Partial<TransactionFilters>) => void
  sort?: string
  setSort?: (sort: string) => void
}

export interface TransactionFilters {
  platform?: string
  chainId?: string
  actions?: string[]
}
