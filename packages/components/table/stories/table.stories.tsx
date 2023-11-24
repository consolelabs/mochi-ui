/* eslint-disable react-hooks/rules-of-hooks -- . */
import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { StarSolid } from '@consolelabs/icons'
import { Badge } from '@consolelabs/badge'
import { Pagination } from '@consolelabs/pagination'
import Table from '../src/table'

const meta: Meta<typeof Table> = {
  title: 'components/Table',
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      type: 'boolean',
    },
    data: {
      type: {
        name: 'array',
        value: {
          name: 'other',
          value: 'any',
        },
        required: true,
      },
    },
    columns: {
      type: {
        name: 'array',
        value: {
          name: 'other',
          value: 'any',
        },
        required: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Table>

const data = new Array(50)
  .fill({
    id: 0,
    name: 'John Doe',
    email: 'hello world',
    role: 'get-role',
  })
  .map((item, index) => ({
    ...item,
    id: index + 1,
    name: `John Doe #${index + 1}`,
  }))

export const Default: Story = {
  render: () => {
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef<number | NodeJS.Timeout>()

    const dataList = useMemo(() => {
      const chunkedArray = []
      for (let i = 0; i < data.length; i += itemPerPage) {
        chunkedArray.push(data.slice(i, i + itemPerPage))
      }
      return chunkedArray
    }, [itemPerPage])

    const onPageChange = useCallback((pg: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setLoading(true)
      timeoutRef.current = setTimeout(() => {
        setPage(pg)
        setLoading(false)
      }, 500)
    }, [])

    return (
      <div className="p-4 min-w-[48rem]">
        <Table<(typeof data)[0]>
          columns={[
            {
              header: 'ID',
              accessorKey: 'id',
              cell(props) {
                return (
                  <span className="w-32">{props.getValue() as string}</span>
                )
              },
            },
            {
              header: 'Name',
              accessorKey: 'name',
            },
            {
              header: 'Email',
              accessorKey: 'email',
            },
            {
              header: 'Role',
              accessorKey: 'role',
              cell: (cell) => {
                return (
                  <Badge
                    appearance="primary"
                    icon={<StarSolid />}
                    label={cell.getValue() as string}
                  />
                )
              },
            },
          ]}
          data={dataList[page - 1]}
          isLoading={loading}
        />
        <Pagination
          initItemsPerPage={itemPerPage}
          initalPage={page}
          onItemPerPageChange={setItemPerPage}
          onPageChange={onPageChange}
          totalItems={data.length}
          totalPages={Math.ceil(data.length / itemPerPage)}
        />
      </div>
    )
  },
}
