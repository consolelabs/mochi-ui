import { TableProps } from '@mochi-ui/core'

export interface Tx {
  code: string
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
  action: string
  amount: string
  date: string
  isSuccess?: boolean
}

interface PaginationProps {
  initalPage?: number
  totalPages?: number
  totalItems: number
  initItemsPerPage?: number
  className?: string
  onPageChange?: (page: number) => void
  onItemPerPageChange?: (page: number) => void
  recordName?: string
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
}
