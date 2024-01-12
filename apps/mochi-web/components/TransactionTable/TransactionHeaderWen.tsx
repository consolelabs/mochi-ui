import { ArrowDownLine, ArrowUpDownLine, ArrowUpLine } from '@mochi-ui/icons'
import { useCallback, useMemo } from 'react'
import { useTransactionStore } from '~cpn/explore/index/stores/useTransactionStore'

interface Props {
  disabled: boolean
}

export const TransactionHeaderWen = ({ disabled }: Props) => {
  const { sort, setSort: _setSort } = useTransactionStore()

  const icon = useMemo(() => {
    if (sort === 'created_at+') return <ArrowUpLine className="w-3 h-3" />
    if (sort === 'created_at-') return <ArrowDownLine className="w-3 h-3" />
    return <ArrowUpDownLine className="w-4 h-4" />
  }, [sort])

  const setSort = useCallback(() => {
    if (sort === 'created_at+') return _setSort('')
    if (sort === 'created_at-') return _setSort('created_at+')
    _setSort('created_at-')
  }, [_setSort, sort])

  if (disabled) return 'WEN'
  return (
    <button
      type="button"
      className="flex gap-x-1 justify-between items-center focus:outline-none"
      onClick={setSort}
    >
      <span>WEN</span>
      {icon}
    </button>
  )
}
