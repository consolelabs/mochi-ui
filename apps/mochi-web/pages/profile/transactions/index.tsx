import {
  Badge,
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
import AuthLayout from '~components/auth-layout'
import { ROUTES } from '~constants/routes'
import {
  TransactionPlatformFilterKey,
  TransactionTypeFilterKey,
  platformFilters,
  typeFilters,
} from '~constants/transactions'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'
import { NextPageWithLayout } from '~pages/_app'
import { ModelProfileTransaction } from '~types/mochi-pay-schema'
import { format } from 'date-fns'
import { TransactionUsernameCell } from '~cpn/Transaction/TransactionUsernameCell'
import {
  TransactionActionType,
  actionTypeFilter,
  formatTransactionAmount,
  isValidFilterPlatform,
  isValidFilterType,
  platformFilter,
  transformActionType,
} from '~cpn/Transaction/utils'
import { useMemo } from 'react'
import { utils } from '@consolelabs/mochi-ui'

const AppPageHeader = () => {
  const { push, query } = useRouter()
  const handlePlarformChange = (value: string) => {
    push(
      {
        query: {
          ...query,
          platform: value,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  const handleTypeChange = (value: string) => {
    push(
      {
        query: {
          ...query,
          type: value,
        },
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <PageHeader
      title="Transactions"
      onBack={() => push(ROUTES.MY_PROFILE)}
      actions={[
        <Select key="filter-types" onChange={handleTypeChange}>
          <SelectTrigger className="border border-divider min-w-[130px] justify-between px-4">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent align="end">
            {typeFilters.map((type) => (
              <SelectItem key={type.key} value={type.key}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>,
        <Select key="filter-platforms" onChange={handlePlarformChange}>
          <SelectTrigger className="border border-divider min-w-[150px] justify-between px-4">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent align="end">
            {platformFilters.map((platform) => (
              <SelectItem key={platform.key} value={platform.key}>
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
  const { query } = useRouter()
  // const [ ] = useState()
  const { transactions: _transactions, isLoading } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
  )
  const transactions = useMemo(
    () => _transactions?.slice(0, MAX_TRANSACTION_TO_DISPLAY),
    [_transactions],
  )
  const [filterType, filterPlatform] = useMemo(() => {
    let validType = 'all'
    let validPlatform = 'all'

    if (typeof query.type === 'string') {
      validType = isValidFilterType(
        typeof query.type === 'string' ? query.type : '',
      )
        ? query.type
        : validType
    }
    if (typeof query.platform === 'string') {
      validPlatform = isValidFilterPlatform(query.platform)
        ? query.platform
        : validPlatform
    }
    return [validType, validPlatform] as [
      TransactionTypeFilterKey,
      TransactionPlatformFilterKey,
    ]
  }, [query.platform, query.type])

  const filteredTransactions = useMemo(() => {
    return transactions
      ?.filter((t) => actionTypeFilter(t.action ?? '', filterType))
      .filter((t) => platformFilter(t.source_platform ?? '', filterPlatform))
  }, [filterPlatform, filterType, transactions])

  return (
    <>
      <SEO title={`${profile?.profile_name}'s transactions`} />
      <AuthLayout pageHeader={<AppPageHeader />}>
        <Table<ModelProfileTransaction>
          columns={[
            {
              header: 'WEN',
              // eslint-disable-next-line react/no-unstable-nested-components
              cell: ({ row: { original: transaction } }) => {
                return (
                  <>
                    <Typography level="p5">
                      {format(new Date(transaction.created_at ?? ''), 'Pp')}
                    </Typography>
                    <Typography
                      level="p6"
                      className="capitalize"
                      color="textSecondary"
                    >
                      {transaction.source_platform}
                    </Typography>
                  </>
                )
              },
            },
            {
              header: 'USERNAME',
              // eslint-disable-next-line react/no-unstable-nested-components
              cell: ({ row: { original } }) => (
                <TransactionUsernameCell {...original} />
              ),
            },
            {
              header: 'AMOUNT',
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
              header: 'TYPE',
              // eslint-disable-next-line react/no-unstable-nested-components
              cell: ({ row: { original } }) => (
                <span className="capitalize">
                  {transformActionType(
                    original.action as TransactionActionType,
                  )}
                </span>
              ),
            },
            {
              header: 'STATUS',
              // eslint-disable-next-line react/no-unstable-nested-components
              cell: ({ row: { original } }) => {
                const { status } = original
                const badgeProps = {
                  appearance:
                    status === 'success'
                      ? 'success'
                      : ('danger' as 'success' | 'danger'),
                  label: status === 'success' ? 'success' : 'fail',
                  className: 'capitalize w-fit',
                }
                return <Badge {...badgeProps} />
              },
            },
          ]}
          data={filteredTransactions ?? []}
          isLoading={isLoading}
        />
      </AuthLayout>
    </>
  )
}

export default App
