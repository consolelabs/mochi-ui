import { fireEvent, render } from '@testing-library/react'
import Pagination from '../src/pagination'

describe('Pagination', () => {
  it('renders the correct number of pages when totalPages <= 9', () => {
    const { getAllByText } = render(
      <Pagination totalItems={24 * 9 + 6} initItemsPerPage={25} />,
    )
    for (let i = 1; i <= 9; i++) {
      const pageButton = getAllByText(i, { selector: 'span' })
      expect(pageButton[0]).toBeInTheDocument()
    }
  })

  it('renders the correct number of pages when currentPage <= 4', () => {
    const { getAllByText } = render(
      <Pagination totalItems={500} initItemsPerPage={10} initalPage={3} />,
    )
    for (let i = 1; i <= 5; i++) {
      const pageButton = getAllByText(i, { selector: 'span' })
      expect(pageButton[0]).toBeInTheDocument()
    }
    const ellipsisButton = getAllByText('...')
    expect(ellipsisButton[0]).toBeInTheDocument()
    const lastPageButton = getAllByText('50', { selector: 'span' })
    expect(lastPageButton[0]).toBeInTheDocument()
  })

  it('renders the correct number of pages when currentPage >= totalPages - 3', () => {
    const { getAllByText, queryAllByText, queryByText } = render(
      <Pagination totalItems={660} initItemsPerPage={25} initalPage={30} />,
    )
    const firstPageButton = getAllByText('1')
    expect(firstPageButton[0]).toBeInTheDocument()
    const ellipsisButton = queryAllByText('...')
    expect(ellipsisButton.length).toBe(1)
    for (let i = 24; i <= 27; i++) {
      const pageButton = getAllByText(i, { selector: 'span' })
      expect(pageButton[0]).toBeInTheDocument()
    }

    const notExistedPage = queryByText(30, { selector: 'span' })
    expect(notExistedPage).not.toBeInTheDocument()
  })

  it('calls setCurrentPage when a page button is clicked', () => {
    const setCurrentPage = jest.fn()
    const { getAllByText } = render(
      <Pagination
        totalItems={100}
        initalPage={5}
        onPageChange={setCurrentPage}
      />,
    )
    const pageButton = getAllByText(3, { selector: 'span' })
    fireEvent.click(pageButton[0])
    expect(setCurrentPage).toHaveBeenCalledWith(3)
  })
})
