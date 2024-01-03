import type { HtmlHTMLAttributes } from 'react'
import { useEffect } from 'react'
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
import {
  DEFAULT_ITEMS_PER_PAGE_OPTIONS,
  PaginationContextProvider,
  usePaginationContext,
} from './context'

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
  children: React.ReactNode
  onPageChange?: (page?: number) => void
  className?: string
}

interface PaginationItemsPerPageProps {
  options?: number[]
  defaultValue?: number
  value?: number
  recordName?: string
  onItemPerPageChange?: (page?: number) => void
}

interface PaginationNavProps {
  totalItems: number
  currentPage?: number
  totalPages?: number
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

function Pagination({ children, onPageChange, className }: PaginationProps) {
  return (
    <PaginationContextProvider onPageChange={onPageChange}>
      <div
        className={paginationWrapperClsx({ className })}
        aria-label="Pagination"
      >
        {children}
      </div>
    </PaginationContextProvider>
  )
}

function PaginationItemsPerPage({
  options = DEFAULT_ITEMS_PER_PAGE_OPTIONS,
  defaultValue,
  value,
  recordName = 'members',
  onItemPerPageChange,
}: PaginationItemsPerPageProps) {
  const {
    totalItems,
    itemsPerPage,
    setItemsPerPage,
    setCurrentPage,
    onPageChange,
  } = usePaginationContext()

  useEffect(() => {
    setItemsPerPage(
      value ??
        defaultValue ??
        (options.length ? options[0] : DEFAULT_ITEMS_PER_PAGE_OPTIONS[0]),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setItemsPerPage, value])

  return (
    <div className={paginationAmountPerPageWrapperClsx()}>
      <div>Showing</div>
      <Select
        defaultValue={String(defaultValue)}
        value={value !== undefined ? String(value) : String(itemsPerPage)}
        onChange={(newValue) => {
          if (value === undefined) {
            setItemsPerPage(Number(newValue))
          }
          onItemPerPageChange?.(Number(newValue))
          setCurrentPage(1)
          onPageChange?.(1)
        }}
      >
        <SelectTrigger appearance="form" color="gray" className="h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(options.length ? options : DEFAULT_ITEMS_PER_PAGE_OPTIONS).map(
            (value) => (
              <SelectItem key={value} value={String(value)}>
                {value}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>
      <div>
        {recordName} of {formatNumber(totalItems)}
      </div>
    </div>
  )
}

function PaginationNav(props: PaginationNavProps) {
  const {
    itemsPerPage,
    setTotalItems,
    currentPage,
    setCurrentPage,
    onPageChange,
  } = usePaginationContext()

  useEffect(() => {
    setCurrentPage(props?.currentPage ?? 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.currentPage, setCurrentPage])

  useEffect(() => {
    setTotalItems(props?.totalItems)
  }, [setTotalItems, props?.totalItems])

  const internalSetCurrentPage = (page: number) => {
    setCurrentPage(page)
    onPageChange?.(page)
  }

  const totalPages =
    props?.totalPages ?? Math.ceil(props.totalItems / itemsPerPage)

  const renderPagination = () => {
    const pages = []

    if (totalPages <= 9) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PageButton
            active={i === currentPage}
            key={i}
            onClick={() => {
              internalSetCurrentPage(i)
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
              internalSetCurrentPage(i)
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
            internalSetCurrentPage(totalPages)
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
            internalSetCurrentPage(1)
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
              internalSetCurrentPage(i)
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
            internalSetCurrentPage(1)
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
              internalSetCurrentPage(i)
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
            internalSetCurrentPage(totalPages)
          }}
        >
          {totalPages}
        </PageButton>,
      )
    }

    return pages
  }

  return (
    <div className={paginationNavigationClsx()} aria-controls="content">
      <button
        aria-label="Previous page"
        className={paginationNavigationButtonClsx({
          disabled: currentPage === 1,
        })}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1 ? 'true' : 'false'}
        onClick={() => {
          internalSetCurrentPage(currentPage - 1)
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
          internalSetCurrentPage(currentPage + 1)
        }}
        tabIndex={0}
        type="button"
      >
        <ChevronRightLine className={paginationNavigationIconClsx()} />
      </button>
    </div>
  )
}

export {
  Pagination,
  PaginationItemsPerPage,
  PaginationNav,
  type PaginationProps,
  type PaginationItemsPerPageProps,
  type PaginationNavProps,
}
