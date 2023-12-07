import { fireEvent, render } from '@testing-library/react'
import Pagination from '../src/pagination'

describe('Pagination', () => {
  it('renders the correct number of pages when totalPages <= 9', () => {
    const { getByText } = render(
      <Pagination totalItems={24 * 9 + 6} initItemsPerPage={25} />,
    )
    for (let i = 1; i <= 9; i++) {
      const pageButton = getByText(i, { selector: 'span' })
      expect(pageButton).toBeInTheDocument()
    }
  })

  it('renders the correct number of pages when currentPage <= 4', () => {
    const { getByText } = render(
      <Pagination totalItems={500} initItemsPerPage={10} initalPage={3} />,
    )
    for (let i = 1; i <= 5; i++) {
      const pageButton = getByText(i, { selector: 'span' })
      expect(pageButton).toBeInTheDocument()
    }
    const ellipsisButton = getByText('...')
    expect(ellipsisButton).toBeInTheDocument()
    const lastPageButton = getByText('50', { selector: 'span' })
    expect(lastPageButton).toBeInTheDocument()
  })

  it('renders the correct number of pages when currentPage >= totalPages - 3', () => {
    const { getByText, queryAllByText, queryByText } = render(
      <Pagination totalItems={660} initItemsPerPage={25} initalPage={25} />,
    )
    const firstPageButton = getByText('1')
    expect(firstPageButton).toBeInTheDocument()
    const ellipsisButton = queryAllByText('...')
    expect(ellipsisButton.length).toBe(1)
    for (let i = 24; i <= 27; i++) {
      const pageButton = getByText(i, {
        selector: 'button:not([role]) span',
      })
      expect(pageButton).toBeInTheDocument()
    }

    const notExistedPage = queryByText(30, { selector: 'span' })
    expect(notExistedPage).not.toBeInTheDocument()
  })

  it('calls setCurrentPage when a page button is clicked', () => {
    const setCurrentPage = jest.fn()
    const { getByText } = render(
      <Pagination
        totalItems={100}
        initalPage={5}
        onPageChange={setCurrentPage}
      />,
    )
    const pageButton = getByText(3, { selector: 'span' })
    fireEvent.click(pageButton)
    expect(setCurrentPage).toHaveBeenCalledWith(3)
  })
})
