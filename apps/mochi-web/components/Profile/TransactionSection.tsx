import { TransactionTable } from '~cpn/TransactionTable'
import {
  Card,
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
        <SectionHeaderTitle className="!text-xl !font-semibold flex items-center">
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
      <Card className="mt-1 !p-0 !rounded-lg !bg-background-level1">
        {ready && (
          <TransactionTable
            headerCellClassName={(i) =>
              clsx({
                'pl-4': i === 0,
                'pr-4': i === 8,
              })
            }
            cellClassName={(_r, _ri, ci) =>
              clsx('h-[60px]', {
                'pl-4': ci === 0,
                'pr-4': ci === 8,
              })
            }
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
                allowCustomPage: true,
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
      </Card>
    </div>
  )
}
