import { createContext, useContext, useMemo, useState } from 'react'

type PaginationContextValue = {
  totalItems: number
  setTotalItems: (totalItems: number) => void
  itemsPerPage: number
  setItemsPerPage: (totalItems: number) => void
  currentPage: number
  setCurrentPage: (totalItems: number) => void
  onPageChange?: (page: number) => void
}

export const DEFAULT_ITEMS_PER_PAGE_OPTIONS = [5, 15, 25, 50, 100]

const PaginationContext = createContext<PaginationContextValue | undefined>(
  undefined,
)

const usePaginationContext = () =>
  useContext(PaginationContext) as PaginationContextValue

const PaginationContextProvider = ({
  children,
  onPageChange,
}: {
  children: React.ReactNode
  onPageChange?: (page: number) => void
}) => {
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(
    DEFAULT_ITEMS_PER_PAGE_OPTIONS[0],
  )
  const [currentPage, setCurrentPage] = useState(1)

  const contextValue = useMemo(
    () => ({
      totalItems,
      setTotalItems,
      itemsPerPage,
      setItemsPerPage,
      currentPage,
      setCurrentPage,
      onPageChange,
    }),
    [
      totalItems,
      itemsPerPage,
      currentPage,
      setTotalItems,
      setItemsPerPage,
      setCurrentPage,
      onPageChange,
    ],
  )

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  )
}

export {
  type PaginationContextValue,
  PaginationContext,
  PaginationContextProvider,
  usePaginationContext,
}
