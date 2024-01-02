import { useLoginWidget } from '@mochi-web3/login-widget'
import { useEffect, useState } from 'react'
import {
  TransactionActionType,
  TransactionPlatform,
} from '~constants/transactions'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'
import { TransactionTable } from '~cpn/TransactionTable'
import { ROUTES } from '~constants/routes'
import { ignoreOptionAll } from './utils'

type Props = {
  filterType: TransactionActionType | 'all'
  filterPlatform: TransactionPlatform | 'all'
  chainId?: string
  showPagination?: boolean
  defaultPageSize?: number
}

export default function Transaction({
  filterPlatform,
  filterType,
  chainId = '',
  showPagination = false,
  defaultPageSize = 15,
}: Props) {
  const { profile } = useLoginWidget()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(defaultPageSize)
  const [total, setTotal] = useState(0)

  const { transactions, isLoading, pagination } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
    {
      action: ignoreOptionAll(filterType),
      platform: ignoreOptionAll(filterPlatform),
      chain_ids: ignoreOptionAll(chainId),
      page: page - 1,
      size,
    },
  )

  useEffect(() => {
    if (pagination?.total) {
      setTotal(pagination.total)
    }
  }, [pagination?.total])

  return (
    <div className="max-w-full overflow-x-auto overflow-y-hidden">
      <TransactionTable
        className="min-w-[1320px]"
        data={transactions || []}
        isLoading={isLoading}
        hideLastBorder
        onRow={(tx) => {
          return {
            onClick: () => {
              window.open(ROUTES.TX_RECEIPTS(tx.code))
            },
          }
        }}
        componentsProps={{
          pagination:
            showPagination && total > 1
              ? {
                  initalPage: page,
                  initItemsPerPage: size,
                  totalItems: total,
                  onItemPerPageChange: setSize,
                  onPageChange: setPage,
                }
              : undefined,
        }}
      />
    </div>
  )
}
