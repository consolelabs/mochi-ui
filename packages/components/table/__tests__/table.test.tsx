/* eslint-disable react/no-unstable-nested-components */
import { Badge } from '@mochi-ui/badge'
import { StarSolid } from '@mochi-ui/icons'
import { render, screen } from '@testing-library/react'
import Table, { ColumnProps } from '../src/table'

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

type DataType = (typeof data)[number]

describe('Table', () => {
  it('renders the table with the correct headers', () => {
    const columns: ColumnProps<DataType>[] = [
      {
        header: 'ID',
        accessorKey: 'id',
        cell(props) {
          return <span className="w-32">{props.getValue() as string}</span>
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
    ]

    render(<Table<DataType> columns={columns} data={data} />)

    const idHeader = screen.getByText('ID')
    const nameHeader = screen.getByText('Name')
    const emailHeader = screen.getByText('Email')
    const roleHeader = screen.getByText('Role')

    expect(idHeader).toBeInTheDocument()
    expect(nameHeader).toBeInTheDocument()
    expect(emailHeader).toBeInTheDocument()
    expect(roleHeader).toBeInTheDocument()
  })

  it('renders the table with the correct data', () => {
    const columns: ColumnProps<DataType>[] = [
      {
        header: 'ID',
        accessorKey: 'id',
        cell(props) {
          return <span className="w-32">{props.getValue() as string}</span>
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
    ]

    const { getByText } = render(<Table columns={columns} data={data} />)
    const firstRow = getByText('John Doe #1')
    const lastRow = getByText('John Doe #10')

    expect(firstRow).toBeInTheDocument()
    expect(lastRow).toBeInTheDocument()
  })
})
