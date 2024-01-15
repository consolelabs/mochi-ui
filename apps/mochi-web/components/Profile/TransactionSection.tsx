import { TransactionTable } from '~cpn/TransactionTable'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@mochi-ui/core'
import { useLoginWidget } from '@mochi-web3/login-widget'
import { useEffect, useState } from 'react'
import { ROUTES } from '~constants/routes'
import { useFetchProfileTransaction } from '~hooks/app/useFetchProfileTransaction'
import { TransactionPlatform } from '~constants/transactions'
import { ChainPicker, PlatformPicker } from '~cpn/explore/index/components'

const ignoreOptionAll = <T extends string>(value: T | 'all') => {
  return value === 'all' ? undefined : value
}

interface Props {
  defaultPageSize?: number
}

export const TransactionOverviewSection = ({ defaultPageSize = 15 }: Props) => {
  const { profile } = useLoginWidget()
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(defaultPageSize)
  const [filterNetwork, setFilterNetwork] = useState('all')
  const [filterPlatform, setFilterPlatform] = useState('all')
  const { transactions, isLoading, pagination } = useFetchProfileTransaction(
    profile?.id ?? '',
    Boolean(profile?.id),
    {
      platform: ignoreOptionAll(filterPlatform) as TransactionPlatform,
      chain_ids: ignoreOptionAll(filterNetwork),
      page: page - 1,
      size,
    },
  )

  useEffect(() => {
    setPage(1)
  }, [filterNetwork, filterPlatform])

  return (
    <div>
      <SectionHeader className="!pt-0">
        <SectionHeaderTitle className="flex items-center">
          Transactions
        </SectionHeaderTitle>
        <SectionHeaderActions>
          <ChainPicker value={filterNetwork} onChange={setFilterNetwork} />
          <PlatformPicker value={filterPlatform} onChange={setFilterPlatform} />
        </SectionHeaderActions>
      </SectionHeader>
      <div className="overflow-hidden mt-1 rounded-lg border border-divider bg-background-body">
        <TransactionTable
          cellClassName={() => 'h-[60px]'}
          className="min-w-[1320px] min-h-[344px]"
          data={transactions || []}
          isLoading={isLoading}
          componentsProps={{
            empty: {
              className: '!h-[295px]',
            },
            pagination: {
              initalPage: page,
              initItemsPerPage: size,
              totalItems: pagination?.total || 0,
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
