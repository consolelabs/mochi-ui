import { useEffect, useRef } from 'react'
import { ROUTES } from '~constants/routes'
import { TransactionTable } from '~cpn/TransactionTable'
import {
  DEFAULT_PAGE_SIZE,
  useTransactionStore,
} from '../stores/useTransactionStore'

export const TransactionSection = () => {
  const {
    loading,
    txns,
    fetchTxns,
    page,
    total = 0,
    setPage,
    setSize,
    ws,
    initWs,
  } = useTransactionStore()
  const txnsCurrentPage = txns[page - 1]

  useEffect(() => {
    fetchTxns()
    initWs()

    return () => {
      ws?.close()
    }
  }, []) // eslint-disable-line

  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    // Scroll top when page change
    containerRef.current?.scrollIntoView()
  }, [page])

  const isLoading = loading || !txnsCurrentPage

  return (
    <div className="px-6" ref={containerRef}>
      <TransactionTable
        loadingRows={10}
        data={txnsCurrentPage}
        isLoading={isLoading}
        onRow={(tx) => {
          return {
            onClick: () => {
              window.open(ROUTES.TX_RECEIPTS(tx.code))
            },
          }
        }}
        componentsProps={{
          pagination: {
            initalPage: 1,
            initItemsPerPage: DEFAULT_PAGE_SIZE,
            totalItems: total,
            onItemPerPageChange: setSize,
            onPageChange: setPage,
          },
        }}
      />
    </div>
  )
}
