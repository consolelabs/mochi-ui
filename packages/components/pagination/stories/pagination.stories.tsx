import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  Pagination,
  PaginationItemsPerPage,
  PaginationNav,
} from '../src/pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Data display/Pagination',
  component: Pagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- we're in a component
    const [currentPage, setCurrentPage] = useState<number | undefined>()
    // eslint-disable-next-line react-hooks/rules-of-hooks -- we're in a component
    const [itemPerPage, setItemPerPage] = useState<number | undefined>(15)

    return (
      <div className="md:min-w-[32rem] space-y-4">
        <Pagination>
          <PaginationItemsPerPage />
          <PaginationNav totalItems={50} />
        </Pagination>

        <Pagination onPageChange={setCurrentPage}>
          <PaginationItemsPerPage
            value={itemPerPage}
            onItemPerPageChange={setItemPerPage}
          />
          <PaginationNav totalItems={100000} currentPage={currentPage} />
        </Pagination>
      </div>
    )
  },
}
