/* eslint-disable react-hooks/rules-of-hooks -- . */
import type { Meta, StoryObj } from '@storybook/react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { StarSolid, ChevronRightLine, ChevronDownLine } from '@mochi-ui/icons'
import { Badge, BadgeIcon } from '@mochi-ui/badge'
import { Pagination } from '@mochi-ui/pagination'
import { IconButton } from '@mochi-ui/icon-button'
import Table from '../src/table'

const meta: Meta<typeof Table> = {
  title: 'Data display/Table',
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
    size: {
      options: ['sm', 'md'],
      control: {
        type: 'select',
        defaultValue: 'md',
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
  render: (props) => {
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
          {...props}
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
                  <Badge appearance="primary">
                    <BadgeIcon>
                      <StarSolid />
                    </BadgeIcon>
                    {cell.getValue() as string}
                  </Badge>
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

export const RenderSubComponent: Story = {
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
              id: 'expander',
              header: () => null,
              width: '56px',
              cell: ({ row }) => {
                if (row.getCanExpand()) {
                  return (
                    <IconButton
                      label={row.getIsExpanded() ? 'Collapse' : 'Expand'}
                      onClick={row.getToggleExpandedHandler()}
                      variant="link"
                      color="white"
                      size="lg"
                    >
                      {row.getIsExpanded() ? (
                        <ChevronDownLine aria-hidden />
                      ) : (
                        <ChevronRightLine aria-hidden />
                      )}
                    </IconButton>
                  )
                }

                return null
              },
            },
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
                  <Badge appearance="primary">
                    <BadgeIcon>
                      <StarSolid />
                    </BadgeIcon>
                    {cell.getValue() as string}
                  </Badge>
                )
              },
            },
          ]}
          getRowCanExpand={() => true}
          data={dataList[page - 1]}
          isLoading={loading}
          renderSubComponent={(record) => (
            <div className="overflow-x-auto p-5 bg-background-level2 pl-[65px]">
              <pre className="max-w-[500px]">
                {JSON.stringify(record, null, 2)}
              </pre>
            </div>
          )}
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
