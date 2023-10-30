import clsx from 'clsx'
import type { HtmlHTMLAttributes } from 'react'
import { useState, useEffect } from 'react'
import { IconChevronLeft, IconChevronRight } from '@consolelabs/icons'

interface PaginationProps {
  initalPage?: number
  totalPages?: number
  totalItems: number
  initItemsPerPage?: number
  className?: string
  onPageChange?: (page: number) => void
  onItemPerPageChange?: (page: number) => void
}

function PageButton({
  active,
  children,
  ...props
}: {
  active: boolean
  children: number
} & HtmlHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={`Page ${children}`}
      className={clsx(
        'w-6 h-6 py-1 px-2.5 rounded-full flex-col justify-center items-center inline-flex border-none cursor-pointer',
        'text-neutral-800',
        {
          'hover:bg-stone-100': !active,
          'bg-neutral-800 text-white': active,
        },
      )}
      tabIndex={0}
      type="button"
      {...props}
    >
      <span className="text-sm font-medium leading-tight">{children}</span>
    </button>
  )
}

export function Pagination({
  initalPage = 1,
  totalPages: initTotalPage = 1,
  initItemsPerPage = 25,
  totalItems,
  onPageChange,
  onItemPerPageChange,
  className,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initalPage)
  const [currentItemPerPage, setCurrentItemPerPage] = useState(initItemsPerPage)

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage)
    }
  }, [currentPage, onPageChange])

  useEffect(() => {
    if (onItemPerPageChange) {
      onItemPerPageChange(currentItemPerPage)
    }
  }, [currentItemPerPage, onItemPerPageChange])

  const totalPages = Math.ceil(totalItems / currentItemPerPage) || initTotalPage

  const renderPagination = () => {
    const pages = []

    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PageButton
            active={i === currentPage}
            key={i}
            onClick={() => {
              setCurrentPage(i)
            }}
          >
            {i}
          </PageButton>,
        )
      }
    } else if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(
          <PageButton
            active={i === currentPage}
            key={i}
            onClick={() => {
              setCurrentPage(i)
            }}
          >
            {i}
          </PageButton>,
        )
      }
      pages.push(
        <button
          className="w-6 h-6 bg-transparent border-none"
          key="ellipsis1"
          type="button"
        >
          ...
        </button>,
      )
      pages.push(
        <PageButton
          active={totalPages === currentPage}
          key={totalPages}
          onClick={() => {
            setCurrentPage(totalPages)
          }}
        >
          {totalPages}
        </PageButton>,
      )
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        <PageButton
          active={currentPage === 1}
          key={1}
          onClick={() => {
            setCurrentPage(1)
          }}
        >
          {1}
        </PageButton>,
      )
      pages.push(
        <button
          className="w-6 h-6 bg-transparent border-none"
          key="ellipsis1"
          type="button"
        >
          ...
        </button>,
      )
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(
          <PageButton
            active={i === currentPage}
            key={i}
            onClick={() => {
              setCurrentPage(i)
            }}
          >
            {i}
          </PageButton>,
        )
      }
    } else {
      pages.push(
        <PageButton
          active={currentPage === 1}
          key={1}
          onClick={() => {
            setCurrentPage(1)
          }}
        >
          {1}
        </PageButton>,
      )
      pages.push(
        <button
          className="w-6 h-6 bg-transparent border-none"
          key="ellipsis1"
          type="button"
        >
          ...
        </button>,
      )
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(
          <PageButton
            active={i === currentPage}
            key={i}
            onClick={() => {
              setCurrentPage(i)
            }}
          >
            {i}
          </PageButton>,
        )
      }
      pages.push(
        <button
          className="w-6 h-6 bg-transparent border-none"
          key="ellipsis2"
          type="button"
        >
          ...
        </button>,
      )
      pages.push(
        <PageButton
          active={totalPages === currentPage}
          key={totalPages}
          onClick={() => {
            setCurrentPage(totalPages)
          }}
        >
          {totalPages}
        </PageButton>,
      )
    }

    return pages
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-between w-full space-x-6',
        className,
      )}
    >
      {/* TODO: replace with our select component */}
      <div className="inline-flex justify-start items-center space-x-2">
        <div>Showing</div>
        <select
          className="py-2 px-3 text-sm font-medium leading-tight rounded text-neutral-800 bg-stone-50"
          onChange={(e) => setCurrentItemPerPage(Number(e.target.value))}
        >
          <option selected={currentItemPerPage === 5} value={5}>
            5
          </option>
          <option selected={currentItemPerPage === 15} value={15}>
            15
          </option>
          <option selected={currentItemPerPage === 25} value={25}>
            25
          </option>
          <option selected={currentItemPerPage === 50} value={50}>
            50
          </option>
          <option selected={currentItemPerPage === 100} value={100}>
            100
          </option>
        </select>
        <div>of {totalItems}</div>
      </div>

      <div className="inline-flex justify-center items-center space-x-2">
        <button
          aria-label="Previous page"
          className="inline-flex gap-2 justify-center items-center py-1 px-1.5 w-8 h-8 rounded border-none cursor-pointer hover:bg-stone-100"
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1)
          }}
          tabIndex={0}
          type="button"
        >
          <IconChevronLeft className="w-4 h-4 text-stone-500" />
        </button>
        {renderPagination()}
        <button
          aria-label="Next page"
          className="inline-flex gap-2 justify-center items-center py-1 px-1.5 w-8 h-8 rounded border-none cursor-pointer hover:bg-stone-100"
          disabled={currentPage === totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}
          tabIndex={0}
          type="button"
        >
          <IconChevronRight className="w-4 h-4 text-stone-500" />
        </button>
      </div>
    </div>
  )
}
