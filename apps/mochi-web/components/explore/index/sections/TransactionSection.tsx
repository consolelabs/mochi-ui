import { useEffect } from 'react'
import { TransactionTable } from '~cpn/TransactionTable'
import { ChainPicker, PlatformPicker } from '../components'
import {
  DEFAULT_PAGE_SIZE,
  useTransactionStore,
} from '../stores/useTransactionStore'

export const TransactionSection = () => {
  const {
    loading,
    txns,
    lastTxns,
    fetchTxns,
    page,
    /* size, */
    total = 0,
    setPage,
    setSize,
    filters,
    setFilters,
    ws,
    initWs,
  } = useTransactionStore()
  const txnsCurrentPage = txns[page - 1]

  useEffect(() => {
    initWs(true)
    fetchTxns()

    return () => {
      ws?.close()
    }
  }, []) // eslint-disable-line

  return (
    <TransactionTable
      upper={
        <div
          style={{ maxWidth: '100vw' }}
          className="flex gap-4 justify-end py-2 px-6"
        >
          <ChainPicker
            value={filters.chainId || 'all'}
            onChange={(chainId) => setFilters({ chainId })}
          />
          <PlatformPicker
            value={filters.platform || 'all'}
            onChange={(platform) => setFilters({ platform })}
          />
        </div>
      }
      loadingRows={10}
      data={txnsCurrentPage || lastTxns}
      isLoading={loading}
      componentsProps={{
        pagination: {
          page,
          initalPage: 1,
          initItemsPerPage: DEFAULT_PAGE_SIZE,
          totalItems: total,
          onItemPerPageChange: setSize,
          onPageChange: setPage,
          allowCustomPage: true,
        },
      }}
      className="px-6"
    />
  )
}
