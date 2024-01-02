import { Typography } from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { useState } from 'react'
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

  const { transactions, isLoading, pagination } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
    {
      action: ignoreOptionAll(filterType),
      platform: ignoreOptionAll(filterPlatform),
      chain_ids: chainId || undefined,
      page,
      size,
    },
  )

  return (
    <>
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
            pagination: showPagination
              ? {
                  initalPage: page,
                  initItemsPerPage: size,
                  totalItems: pagination?.total || 0,
                  onItemPerPageChange: setSize,
                  onPageChange: setPage,
                }
              : undefined,
          }}
        />
      </div>
      {!isLoading && (transactions?.length ?? 0) <= 0 && (
        <div className="flex flex-col items-center justify-center w-full h-64 tracking-tight text-center">
          <Typography level="h7">No transactions</Typography>
          <Typography level="p4" color="textSecondary">
            You haven&apos;t made any transactions yet{' '}
          </Typography>
        </div>
      )}
    </>
  )
}
