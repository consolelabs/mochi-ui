import { Tx, TransactionTable } from '~cpn/TransactionTable'
import { Badge, Button, Typography } from '@mochi-ui/core'
import { ArrowRightLine } from '@mochi-ui/icons'
import { useLoginWidget } from '@mochi-web3/login-widget'
import clsx from 'clsx'
import { useState } from 'react'
import { ROUTES } from '~constants/routes'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'

type OverviewTransactionTabs = 'Transaction' | 'Pay Me' | 'Pay Link'

export const TransactionOverviewSection = () => {
  const [selectedTab, setSelectedTab] =
    useState<OverviewTransactionTabs>('Transaction')

  const { profile } = useLoginWidget()
  const { transactions, isLoading, pagination } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
    {
      page: 0,
      size: 5,
    },
  )
  const {
    transactions: paymeTransactions,
    isLoading: isLoadingPayme,
    pagination: paginationPayme,
  } = useFetchProfileTransaction(profile?.id ?? '', Boolean(profile?.id), {
    action: 'payme',
    page: 0,
    size: 5,
  })

  const {
    transactions: paylinkTransactions,
    isLoading: isLoadingPaylink,
    pagination: paginationPaylink,
  } = useFetchProfileTransaction(profile?.id ?? '', Boolean(profile?.id), {
    action: 'paylink',
    page: 0,
    size: 5,
  })

  const transactionMapper = {
    Transaction: transactions ?? [],
    'Pay Me': paymeTransactions ?? [],
    'Pay Link': paylinkTransactions ?? [],
  }

  const displayTransactions: Tx[] = transactionMapper[selectedTab]

  const isLoadingTransaction = {
    Transaction: isLoading,
    'Pay Me': isLoadingPayme,
    'Pay Link': isLoadingPaylink,
  }[selectedTab]

  const isDisplayFooter = displayTransactions.length >= 5
  const displayTotalItems = {
    Transaction: pagination?.total,
    'Pay Me': paginationPayme?.total,
    'Pay Link': paginationPaylink?.total,
  }[selectedTab]

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
            {transactionMapper[t].length > 0 && (
              <Badge appearance="danger">{transactionMapper[t].length}</Badge>
            )}
          </Button>
        ))}
      </div>
      <div className="bg-background-popup">
        {/* NOTE: Fix 5 rows height for ensure empty render do not overflow */}
        <div className="h-[404px]">
          <TransactionTable
            className="min-w-[1320px]"
            data={displayTransactions}
            isLoading={isLoadingTransaction}
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
        <div className="flex gap-4 py-3 px-[18px] items-center justify-end">
          {isDisplayFooter && (
            <Typography level="p6" color="textSecondary" className="flex-1">
              Showing {displayTransactions.length} latest items of{' '}
              {displayTotalItems}
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
