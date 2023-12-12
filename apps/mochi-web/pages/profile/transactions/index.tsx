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
import { platformFilters, typeFilters } from '~constants/transactions'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'
import { NextPageWithLayout } from '~pages/_app'
import { ModelProfileTransaction } from '~types/mochi-pay-schema'
import { format } from 'date-fns'
import { TransactionUsernameCell } from '~cpn/Transaction/TransactionUsernameCell'
import {
  ActionType,
  formatTransactionAmount,
  transformActionType,
} from '~cpn/Transaction/utils'
import { useMemo } from 'react'

const AppPageHeader = () => {
  const { push } = useRouter()

  return (
    <PageHeader
      title="Transactions"
      onBack={() => push(ROUTES.MY_PROFILE)}
      actions={[
        <Select key="filter-types">
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
        <Select key="filter-platforms">
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
  const { transactions: _transactions, isLoading } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
  )
  const transactions = useMemo(
    () => _transactions?.slice(0, MAX_TRANSACTION_TO_DISPLAY),
    [_transactions],
  )

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
                  <div>
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
                  </div>
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
                const { amount, token, type } = original
                const isReceive = type === 'in'
                return (
                  <Typography
                    level="p5"
                    color={isReceive ? 'success' : 'textPrimary'}
                  >
                    {`${isReceive ? '+' : '-'} ${formatTransactionAmount(
                      amount ?? '0',
                      token?.decimal ?? 0,
                    )} ${token?.symbol}`}
                  </Typography>
                )
              },
            },
            {
              header: 'TYPE',
              // eslint-disable-next-line react/no-unstable-nested-components
              cell: ({ row: { original } }) => (
                <span className="capitalize">
                  {transformActionType(original.action as ActionType)}
                </span>
              ),
            },
            {
              header: 'STATUS',
              cell: ({ row: { original } }) => {
                return {
                  success: (
                    <Badge
                      appearance="success"
                      label="success"
                      className="w-fit"
                    />
                  ),
                  fail: (
                    <Badge appearance="danger" label="fail" className="w-fit" />
                  ),
                }[original.status ?? 'success']
              },
            },
          ]}
          data={transactions ?? []}
          isLoading={isLoading}
        />
      </AuthLayout>
    </>
  )
}

export default App
