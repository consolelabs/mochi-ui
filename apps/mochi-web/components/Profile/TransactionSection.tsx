import { Button, Typography } from '@mochi-ui/core'
import { ArrowRightLine } from '@mochi-ui/icons'
import { useLoginWidget } from '@mochi-web3/login-widget'
import clsx from 'clsx'
import { useState } from 'react'
import { ROUTES } from '~constants/routes'
import { TransactionActionType } from '~constants/transactions'
import { ignoreOptionAll } from '~cpn/Transaction/utils'
import { TransactionTable } from '~cpn/TransactionTable'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'

type OverviewTransactionTabs = 'Transaction' | 'Pay Me' | 'Pay Link'
const OverviewTransactionFilters: Record<
  OverviewTransactionTabs,
  TransactionActionType | 'all'
> = {
  Transaction: 'all',
  'Pay Me': 'payme',
  'Pay Link': 'paylink',
}

export const TransactionOverviewSection = () => {
  const [selectedTab, setSelectedTab] =
    useState<OverviewTransactionTabs>('Transaction')

  const { profile } = useLoginWidget()
  const { transactions, isLoading, pagination } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
    {
      action: ignoreOptionAll(OverviewTransactionFilters[selectedTab]),
      page: 0,
      size: 5,
    },
  )

  return (
    <div className="bg-background-level2 shadow-input rounded-lg overflow-hidden">
      <div className="border-b border-b-divider">
        {(
          ['Transaction', 'Pay Me', 'Pay Link'] as OverviewTransactionTabs[]
        ).map((t) => (
          <Button
            color="white"
            variant={t === selectedTab ? 'solid' : 'ghost'}
            key={t}
            className={clsx(
              'font-semibold border-divider border-b-0 !rounded-b-none',
              {
                'hover:!bg-background-popup': selectedTab === t,
              },
            )}
            onClick={() => setSelectedTab(t)}
          >
            {t}
          </Button>
        ))}
      </div>
      <div className="bg-background-popup">
        {/* NOTE: Fix 5 rows height for ensure empty render do not overflow */}
        <div className="h-[404px]">
          <TransactionTable
            className="min-w-[1320px]"
            data={transactions || []}
            isLoading={isLoading}
            hideLastBorder
            componentsProps={{
              empty: {
                className: 'h-full',
              },
            }}
            onRow={(tx) => {
              return {
                onClick: () => {
                  window.open(ROUTES.TX_RECEIPTS(tx.code))
                },
              }
            }}
          />
        </div>
        <div className="flex gap-4 p-3 items-center justify-end">
          {(transactions?.length ?? 0) >= 5 && (
            <Typography level="p6" color="textSecondary" className="flex-1">
              Showing {transactions?.length} latest items of {pagination?.total}
            </Typography>
          )}
          <Button
            size="sm"
            color="white"
            variant="outline"
            as="a"
            href={ROUTES.TRANSACTIONS}
          >
            View all transactions
            <ArrowRightLine />
          </Button>
        </div>
      </div>
    </div>
  )
}
