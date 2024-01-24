import { TransactionTable } from '~cpn/TransactionTable'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { useEffect, useState } from 'react'
import { ROUTES } from '~constants/routes'
import { ChainPicker, PlatformPicker } from '~cpn/explore/index/components'
import { useTransactionStore } from '~cpn/explore/index/stores/useTransactionStore'
import clsx from 'clsx'

export const TransactionOverviewSection = () => {
  const { profile } = useLoginWidget()
  const {
    loading,
    txns,
    lastTxns,
    fetchTxns,
    page,
    size,
    total = 0,
    setPage,
    setSize,
    filters,
    setFilters,
    ws,
    initWs,
  } = useTransactionStore()
  const txnsCurrentPage = txns[page - 1]
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (profile?.id) {
      initWs(true, profile.id)
      setReady(true)
      fetchTxns()
    }

    return () => {
      ws?.close()
      setReady(false)
    }
  }, [profile?.id]) // eslint-disable-line

  return (
    <div>
      <SectionHeader className="!pt-0">
        <SectionHeaderTitle className="flex items-center">
          Transactions
        </SectionHeaderTitle>
        <SectionHeaderActions>
          <ChainPicker
            value={filters.chainId || 'all'}
            onChange={(chainId) => setFilters({ chainId })}
          />
          <PlatformPicker
            value={filters.platform || 'all'}
            onChange={(platform) => setFilters({ platform })}
          />
        </SectionHeaderActions>
      </SectionHeader>
      <div className="overflow-hidden mt-1 rounded-lg border border-divider bg-background-body">
        {ready && (
          <TransactionTable
            cellClassName={() => 'h-[60px]'}
            className={clsx('!w-auto', {
              'min-h-[344px]': txnsCurrentPage?.length,
            })}
            data={txnsCurrentPage || lastTxns}
            isLoading={loading}
            loadingRows={size}
            componentsProps={{
              empty: {
                className: '!h-[300.5px]',
              },
              pagination: {
                page,
                initalPage: page,
                initItemsPerPage: size,
                totalItems: total,
                onItemPerPageChange: setSize,
                onPageChange: setPage,
                className: 'px-4',
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
        )}
      </div>
    </div>
  )
}
