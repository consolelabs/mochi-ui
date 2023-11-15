/* eslint-disable react-hooks/rules-of-hooks -- . */
import type { Meta, StoryObj } from '@storybook/react'
import { useMemo, useState } from 'react'
import { IconStar } from '@consolelabs/icons'
import { Badge } from '../badge'
import { Table } from './table'

const meta: Meta<typeof Table> = {
  title: 'ui/Table',
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
    const [itemPerPage, _setItemPerPage] = useState(5)
    const [page, _setPage] = useState(1)
    const [loading, _setLoading] = useState(false)

    const dataList = useMemo(() => {
      const chunkedArray = []
      for (let i = 0; i < data.length; i += itemPerPage) {
        chunkedArray.push(data.slice(i, i + itemPerPage))
      }
      return chunkedArray
    }, [itemPerPage])

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
                    icon={<IconStar />}
                    label={cell.getValue() as string}
                  />
                )
              },
            },
          ]}
          data={dataList[page - 1]}
          isLoading={loading}
        />
      </div>
    )
  },
}
