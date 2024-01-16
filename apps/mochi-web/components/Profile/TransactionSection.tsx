import { TransactionTable } from '~cpn/TransactionTable'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { useEffect } from 'react'
import { ROUTES } from '~constants/routes'
import { ChainPicker, PlatformPicker } from '~cpn/explore/index/components'
import { useTransactionStore } from '~cpn/explore/index/stores/useTransactionStore'
import clsx from 'clsx'

export const TransactionOverviewSection = () => {
  const { profile } = useLoginWidget()
  const {
    loading,
    txns,
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
  const isLoading = loading || !txnsCurrentPage

  useEffect(() => {
    if (!profile?.id) return
    initWs(true, profile.id)
    fetchTxns()

    return () => {
      ws?.close()
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
        <TransactionTable
          cellClassName={() => 'h-[60px]'}
          className={clsx('min-w-[1320px]', {
            'min-h-[344px]': txnsCurrentPage?.length,
          })}
          data={txnsCurrentPage}
          isLoading={isLoading}
          loadingRows={size}
          componentsProps={{
            empty: {
              className: '!h-[300.5px]',
            },
            pagination: {
              initalPage: page,
              initItemsPerPage: size,
              totalItems: total,
              onItemPerPageChange: setSize,
              onPageChange: setPage,
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
    </div>
  )
}
