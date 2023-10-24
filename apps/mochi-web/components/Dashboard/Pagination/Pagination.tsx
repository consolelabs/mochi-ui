import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useMemo } from 'react'
import { pagination } from '~utils/pagination'

type Props = {
  page: number
  totalPage: number
  onChange: (page: number) => void
}

export const Pagination = (props: Props) => {
  const { page, totalPage, onChange } = props

  const paginationArray = useMemo(() => {
    return pagination(page, totalPage)
  }, [page, totalPage])

  return (
    <div className="flex gap-x-2 gap-4 items-center">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        className="p-1 rounded-full transition hover:bg-gray-200"
      >
        <Icon className="w-4 h-4" icon="heroicons:chevron-left" />
      </button>
      <div className="flex gap-2 items-center py-1 px-2 text-sm font-medium rounded">
        {paginationArray.map((i: any, index: number) => {
          return (
            <button
              type="button"
              key={index}
              disabled={i === '...'}
              className={clsx('transition hover:opacity-80 w-4', {
                'opacity-30': i !== page,
                'opacity-100 underline': i === page,
              })}
              onClick={() => onChange(i)}
            >
              {i}
            </button>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPage - 1}
        className="p-1 rounded-full transition hover:bg-gray-200"
      >
        <Icon className="w-4 h-4" icon="heroicons:chevron-right" />
      </button>
    </div>
  )
}
