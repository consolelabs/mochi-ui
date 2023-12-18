import {
  Badge,
  ColumnProps,
  PageHeader,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  Typography,
  useLoginWidget,
} from '@mochi-ui/core'
import { useRouter } from 'next/router'
import { SEO } from '~app/layout/seo'
import { ROUTES } from '~constants/routes'
import {
  TransactionActionType,
  TransactionPlatform,
  platformFilters,
  typeFilters,
} from '~constants/transactions'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'
import { NextPageWithLayout } from '~pages/_app'
import { ModelProfileTransaction } from '~types/mochi-pay-schema'
import { TransactionUsernameCell } from '~cpn/Transaction/TransactionUsernameCell'
import {
  formatTransactionAmount,
  ignoreOptionAll,
  transformActionType,
} from '~cpn/Transaction/utils'
import { useMemo, useState } from 'react'
import { utils } from '@consolelabs/mochi-ui'
import { DashboardBody } from '~cpn/DashboardBody'
import { formatDate } from '~utils/time'

interface AppPageHeaderProps {
  filterType: TransactionActionType | 'all'
  filterPlatform: TransactionPlatform | 'all'
  onFilterTypeChange: (_: TransactionActionType | 'all') => void
  onFilterPlatformChange: (_: TransactionPlatform | 'all') => void
}

const AppPageHeader = (props: AppPageHeaderProps) => {
  const {
    filterType,
    filterPlatform,
    onFilterPlatformChange,
    onFilterTypeChange,
  } = props
  const { push } = useRouter()

  return (
    <PageHeader
      title="Transactions"
      onBack={() => push(ROUTES.MY_PROFILE)}
      actions={[
        <Select
          key="filter-types"
          onChange={onFilterTypeChange}
          value={filterType}
        >
          <SelectTrigger className="border border-divider min-w-[130px] justify-between px-4">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent align="end">
            {typeFilters.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
        <Select
          key="filter-platforms"
          onChange={onFilterPlatformChange}
          value={filterPlatform}
        >
          <SelectTrigger className="border border-divider min-w-[150px] justify-between px-4">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent align="end">
            {platformFilters.map((platform) => (
              <SelectItem key={platform.value} value={platform.value}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
      ]}
    />
  )
}

const MAX_TRANSACTION_TO_DISPLAY = 30

const App: NextPageWithLayout = () => {
  const { profile } = useLoginWidget()

  const [filterPlatform, setFilterPlatform] = useState<
    TransactionPlatform | 'all'
  >('all')
  const [filterType, setFilterType] = useState<TransactionActionType | 'all'>(
    'all',
  )

  const { transactions: _transactions, isLoading } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
    {
      action: ignoreOptionAll(filterType),
      platform: ignoreOptionAll(filterPlatform),
    },
  )
  const transactions = useMemo(
    () => _transactions?.slice(0, MAX_TRANSACTION_TO_DISPLAY),
    [_transactions],
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
      <SEO title={`${profile?.profile_name}'s transactions`} />
      <AppPageHeader
        filterType={filterType}
        filterPlatform={filterPlatform}
        onFilterPlatformChange={setFilterPlatform}
        onFilterTypeChange={setFilterType}
      />
      <DashboardBody>
        <div className="max-w-full overflow-x-auto">
          <Table<ModelProfileTransaction>
            className="min-w-[600px]"
            columns={columns}
            data={transactions ?? []}
            isLoading={isLoading}
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
      </DashboardBody>
    </>
  )
}

export default App
