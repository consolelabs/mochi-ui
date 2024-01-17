import { noop } from '@dwarvesf/react-utils'
import { ArrowDownLine, ArrowUpDownLine, ArrowUpLine } from '@mochi-ui/icons'
import { useCallback, useMemo } from 'react'

interface Props {
  disabled: boolean
  fetching?: boolean
  sort?: string
  setSort?: (sort: string) => void
}

export const TransactionHeaderTotalValue = ({
  disabled,
  sort,
  setSort: _setSort = noop,
  fetching,
}: Props) => {
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
