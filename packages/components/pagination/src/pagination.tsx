import type { HtmlHTMLAttributes } from 'react'
import { useState, useEffect } from 'react'
import { ChevronLeftLine, ChevronRightLine } from '@mochi-ui/icons'
import { pagination } from '@mochi-ui/theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@mochi-ui/select'
import { formatNumber } from './utils'

const {
  paginationButtonClsx,
  paginationButtonLabelClsx,
  paginationEllipsisButtonClsx,
  paginationWrapperClsx,
  paginationAmountPerPageWrapperClsx,
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
  recordName?: string
}

function PageButton({
  active,
  children,
  ...props
}: {
  active: boolean
  children: number | string
} & HtmlHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label={`Go to page ${children}`}
      aria-current={active ? 'true' : 'false'}
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
  recordName = 'members',
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
          aria-hidden="true"
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
          1
        </PageButton>,
      )
      pages.push(
        <button
          className={paginationEllipsisButtonClsx()}
          key="ellipsis1"
          type="button"
          aria-hidden="true"
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
          1
        </PageButton>,
      )
      pages.push(
        <button
          className={paginationEllipsisButtonClsx()}
          key="ellipsis1"
          type="button"
          aria-hidden="true"
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
          aria-hidden="true"
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
      className={paginationWrapperClsx({ className })}
      aria-label="Pagination"
    >
      <div className={paginationAmountPerPageWrapperClsx()}>
        <div>Showing</div>
        <Select
          defaultValue={String(currentItemPerPage)}
          onChange={(value) => {
            setCurrentPage(1)
            setCurrentItemPerPage(Number(value))
          }}
        >
          <SelectTrigger appearance="form" color="gray" className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 15, 25, 50, 100].map((value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          {recordName} of {formatNumber(totalItems)}
        </div>
      </div>

      <div className={paginationNavigationClsx()} aria-controls="content">
        <button
          aria-label="Previous page"
          className={paginationNavigationButtonClsx({
            disabled: currentPage === 1,
          })}
          disabled={currentPage === 1}
          aria-disabled={currentPage === 1 ? 'true' : 'false'}
          onClick={() => {
            setCurrentPage(currentPage - 1)
          }}
          tabIndex={0}
          type="button"
        >
          <ChevronLeftLine className={paginationNavigationIconClsx()} />
        </button>
        <div className={pagination.paginationPageNavigateButtonGroupClsx()}>
          {renderPagination()}
        </div>
        <div className={pagination.paginationMobilePageNumerClsx()}>
          Page {formatNumber(currentPage) ?? 1} of {formatNumber(totalPages)}
        </div>
        <button
          aria-label="Next page"
          className={paginationNavigationButtonClsx({
            disabled: currentPage === totalPages,
          })}
          disabled={currentPage === totalPages}
          aria-disabled={currentPage === totalPages ? 'true' : 'false'}
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
