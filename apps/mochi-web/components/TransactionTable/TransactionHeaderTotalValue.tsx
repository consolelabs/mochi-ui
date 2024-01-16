import { ArrowDownLine, ArrowUpDownLine, ArrowUpLine } from '@mochi-ui/icons'
import { useCallback, useMemo } from 'react'
import { useTransactionStore } from '~cpn/explore/index/stores/useTransactionStore'

interface Props {
  disabled: boolean
}

export const TransactionHeaderTotalValue = ({ disabled }: Props) => {
  const { sort, setSort: _setSort, fetching } = useTransactionStore()

  const icon = useMemo(() => {
    if (sort === 'total_usd+') return <ArrowUpLine className="w-3 h-3" />
    if (sort === 'total_usd-') return <ArrowDownLine className="w-3 h-3" />
    return <ArrowUpDownLine className="w-4 h-4" />
  }, [sort])

  const setSort = useCallback(() => {
    if (sort === 'total_usd+') return _setSort('')
    if (sort === 'total_usd-') return _setSort('total_usd+')
    _setSort('total_usd-')
  }, [_setSort, sort])

  if (disabled) return 'TOTAL VALUE'
  return (
    <button
      type="button"
      disabled={fetching}
      className="flex gap-x-1 justify-between items-center focus:outline-none"
      onClick={setSort}
    >
      <span>TOTAL VALUE</span>
      {icon}
    </button>
  )
}
