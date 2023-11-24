import type { HtmlHTMLAttributes } from 'react'
import { useState, useEffect } from 'react'
import { ChevronLeftLine, ChevronRightLine } from '@consolelabs/icons'
import { pagination } from '@consolelabs/theme'

const {
  paginationButtonClsx,
  paginationButtonLabelClsx,
  paginationEllipsisButtonClsx,
  paginationWrapperClsx,
  paginationAmountPerPageWrapperClsx,
  paginationAmountPerPageSelectClsx,
  paginationNavigationClsx,
  paginationNavigationButtonClsx,
  paginationNavigationIconClsx,
} = pagination

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
      className={paginationButtonClsx({ active })}
      tabIndex={0}
      type="button"
      {...props}
    >
      <span className={paginationButtonLabelClsx()}>{children}</span>
    </button>
  )
}

export default function Pagination({
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
          className={paginationEllipsisButtonClsx()}
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
          className={paginationEllipsisButtonClsx()}
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
          className={paginationEllipsisButtonClsx()}
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
          className={paginationEllipsisButtonClsx()}
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
    <div className={paginationWrapperClsx({ className })}>
      {/* TODO: replace with our select component */}
      <div className={paginationAmountPerPageWrapperClsx()}>
        <div>Showing</div>
        <select
          className={paginationAmountPerPageSelectClsx()}
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

      <div className={paginationNavigationClsx()}>
        <button
          aria-label="Previous page"
          className={paginationNavigationButtonClsx()}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1)
          }}
          tabIndex={0}
          type="button"
        >
          <ChevronLeftLine className={paginationNavigationIconClsx()} />
        </button>
        {renderPagination()}
        <button
          aria-label="Next page"
          className={paginationNavigationButtonClsx()}
          disabled={currentPage === totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}
          tabIndex={0}
          type="button"
        >
          <ChevronRightLine className={paginationNavigationIconClsx()} />
        </button>
      </div>
    </div>
  )
}

export { type PaginationProps }
