import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Pagination from '../src/pagination'

const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination',
  component: Pagination,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      type: 'number',
      defaultValue: 1,
    },
    initalPage: {
      type: 'number',
      defaultValue: 1,
    },
    initItemsPerPage: {
      type: 'number',
      defaultValue: 25,
    },
    className: {
      type: 'string',
    },
    onPageChange: {
      type: 'function',
    },
    onItemPerPageChange: {
      type: 'function',
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- we're in a component
    const [currentPage, setCurrentPage] = useState(1)
    // eslint-disable-next-line react-hooks/rules-of-hooks -- we're in a component
    const [itemPerPage, setItemPerPage] = useState(15)

    return (
      <div className="min-w-[32rem] space-y-4">
        <Pagination totalItems={25} />
        <Pagination
          initItemsPerPage={itemPerPage}
          initalPage={currentPage}
          onItemPerPageChange={setItemPerPage}
          onPageChange={setCurrentPage}
          totalItems={100}
          totalPages={Math.ceil(100 / itemPerPage)}
        />
      </div>
    )
  },
}
