import { noop } from '@dwarvesf/react-utils'
import { ArrowDownLine, ArrowUpDownLine, ArrowUpLine } from '@mochi-ui/icons'
import { useCallback, useMemo } from 'react'

interface Props {
  disabled: boolean
  fetching?: boolean
  sort?: string
  setSort?: (sort: string) => void
}

export const TransactionHeaderWen = ({
  disabled,
  sort,
  setSort: _setSort = noop,
  fetching,
}: Props) => {
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
      disabled={fetching}
      type="button"
      className="flex gap-x-1 justify-between items-center focus:outline-none"
      onClick={setSort}
    >
      <span>WEN</span>
      {icon}
    </button>
  )
}
