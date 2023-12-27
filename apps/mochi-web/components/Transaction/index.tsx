import { Typography, useLoginWidget } from '@mochi-ui/core'
import { useMemo } from 'react'
import {
  TransactionActionType,
  TransactionPlatform,
} from '~constants/transactions'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'
import { TransactionTable } from '~cpn/TransactionTable'
import { ignoreOptionAll } from './utils'

type Props = {
  showCount?: number
  filterType: TransactionActionType | 'all'
  filterPlatform: TransactionPlatform | 'all'
}

const MAX_TRANSACTION_TO_DISPLAY = 30

export default function Transaction({
  showCount = MAX_TRANSACTION_TO_DISPLAY,
  filterPlatform,
  filterType,
}: Props) {
  const { profile } = useLoginWidget()

  const { transactions: _transactions, isLoading } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
    {
      action: ignoreOptionAll(filterType),
      platform: ignoreOptionAll(filterPlatform),
    },
  )
  const transactions = useMemo(
    () =>
      _transactions?.slice(
        0,
        Math.min(showCount, Math.max(showCount, MAX_TRANSACTION_TO_DISPLAY)),
      ),
    [_transactions, showCount],
  )

  return (
    <>
      <div className="max-w-full overflow-x-auto">
        <TransactionTable
          data={transactions || []}
          isLoading={isLoading}
          hideLastBorder
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
