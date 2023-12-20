import {
  Badge,
  ColumnProps,
  Table,
  Typography,
  useLoginWidget,
} from '@mochi-ui/core'
import { useMemo } from 'react'
import {
  TransactionActionType,
  TransactionPlatform,
} from '~constants/transactions'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'
import { ModelProfileTransaction } from '~types/mochi-pay-schema'
import { formatDate } from '~utils/time'
import { utils } from '@consolelabs/mochi-ui'
import { TransactionUsernameCell } from './TransactionUsernameCell'
import {
  formatTransactionAmount,
  ignoreOptionAll,
  transformActionType,
} from './utils'

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

  const columns: ColumnProps<ModelProfileTransaction>[] = [
    {
      header: 'wen',
      width: 180,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row: { original: transaction } }) => {
        return (
          <>
            <Typography level="p5">
              {transaction.created_at
                ? formatDate(transaction.created_at, 'dd/MM/yyyy hh:mma')
                : null}
            </Typography>
            <Typography level="p6" className="capitalize" color="textSecondary">
              {transaction.source_platform}
            </Typography>
          </>
        )
      },
    },
    {
      header: 'username',
      width: 412,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row: { original } }) => (
        <TransactionUsernameCell {...original} />
      ),
    },
    {
      header: 'amount',
      width: 150,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row: { original } }) => {
        const { amount, token, type, usd_amount } = original
        const isReceive = type === 'in'
        return (
          <div>
            <Typography
              level="p5"
              color={isReceive ? 'success' : 'textPrimary'}
            >
              {`${isReceive ? '+' : '-'} ${formatTransactionAmount(
                amount ?? '0',
                token?.decimal ?? 0,
              )} ${token?.symbol}`}
            </Typography>
            <Typography level="p6" color="textSecondary">
              {utils.formatUsdDigit(usd_amount ?? 0)}
            </Typography>
          </div>
        )
      },
    },
    {
      header: 'type',
      width: 120,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row: { original } }) => (
        <span className="capitalize">
          {transformActionType(original.action as TransactionActionType)}
        </span>
      ),
    },
    {
      header: 'status',
      width: 100,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: ({ row: { original } }) => {
        const { status } = original
        return (
          <Badge
            appearance={status === 'success' ? 'success' : 'danger'}
            label={status === 'success' ? 'success' : 'fail'}
            className="capitalize w-fit"
          />
        )
      },
    },
  ]

  return (
    <>
      <div className="overflow-x-auto max-w-full">
        <Table<ModelProfileTransaction>
          className="min-w-[600px]"
          columns={columns}
          data={transactions ?? []}
          isLoading={isLoading}
        />
      </div>
      {!isLoading && (transactions?.length ?? 0) <= 0 && (
        <div className="flex flex-col justify-center items-center w-full h-64 tracking-tight text-center">
          <Typography level="h7">No transactions</Typography>
          <Typography level="p4" color="textSecondary">
            You haven&apos;t made any transactions yet{' '}
          </Typography>
        </div>
      )}
    </>
  )
}
