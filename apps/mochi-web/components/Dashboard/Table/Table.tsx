import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { ReactNode, useEffect, useRef } from 'react'
import {
  useTable,
  Column as RTColumn,
  TableState as RTTableState,
  useSortBy,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByState,
} from 'react-table'

const noop = () => {}

type CustomColumn = {
  tdClassName?: string
  thClassName?: string
}

type Column<T extends object = {}> = RTColumn<T> &
  UseSortByColumnOptions<T> &
  CustomColumn

type Props<T extends object = {}> = {
  data: T[]
  columns: Column<T>[]
  tableClassName?: string
  theadClassName?: string
  tbodyClassName?: string
  trHeadClassName?: string
  trBodyClassName?: string
  thClassName?: string
  tdClassName?: string
  manualSortBy?: boolean
  onChange?: (state: RTTableState<T> & UseSortByState<T>) => void
}

export const Table: <T extends object = {}>(props: Props<T>) => JSX.Element = (
  props,
) => {
  const {
    data,
    columns,
    tableClassName,
    theadClassName,
    tbodyClassName,
    trHeadClassName,
    trBodyClassName,
    thClassName,
    tdClassName,
    manualSortBy = false,
    onChange = noop,
  } = props

  const { rows, headers, state, prepareRow, getTableProps, getTableBodyProps } =
    useTable(
      {
        columns,
        data,
        // @ts-ignore -- to use with useSortBy hook
        manualSortBy,
      },
      useSortBy,
    )

  useEffect(() => {
    if (state) {
      onChange(state as any)
    }
  }, [JSON.stringify(state)]) // eslint-disable-line

  return (
    <div
      {...getTableProps({
        className: clsx('table !block overflow-auto w-full', tableClassName),
      })}
    >
      {/* Render header */}
      <div className={clsx('thead inline-block min-w-full', theadClassName)}>
        <div className={clsx('trHead flex', trHeadClassName)}>
          {headers.map((column) => {
            const {
              defaultCanSort,
              isSorted,
              isSortedDesc,
              getSortByToggleProps,
            } = column as any as UseSortByColumnProps<any> &
              UseSortByColumnOptions<any>

            return (
              // eslint-disable-next-line -- key will be supplied by react-table
              <div
                {...column.getHeaderProps({
                  ...getSortByToggleProps(),
                  className: clsx(
                    'th',
                    { 'flex gap-2 cursor-pointer': defaultCanSort },
                    thClassName,
                    // @ts-ignore -- thClassName should exist in CustomColumn
                    column.thClassName,
                  ),
                  style: {
                    flex: `1 1 ${column.width || 150}px`,
                    minWidth: column.minWidth || 150,
                  },
                })}
              >
                <div>{column.render('Header')}</div>
                {defaultCanSort && (
                  <Icon
                    className="w-4 h-4"
                    icon={
                      isSorted
                        ? isSortedDesc
                          ? 'fluent:arrow-sort-down-16-filled'
                          : 'fluent:arrow-sort-up-16-filled'
                        : 'fluent:arrow-sort-16-filled'
                    }
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div
        {...getTableBodyProps({
          className: clsx('tbody inline-block min-w-full', tbodyClassName),
        })}
      >
        {rows.map((row) => {
          prepareRow(row)

          return (
            // eslint-disable-next-line -- key will be supplied by react-table
            <div
              {...row.getRowProps({
                className: clsx('trBody flex', trBodyClassName),
              })}
            >
              {row.cells.map((cell) => {
                return (
                  // eslint-disable-next-line -- key will be supplied by react-table
                  <div
                    {...cell.getCellProps({
                      className: clsx(
                        'td',
                        tdClassName,
                        // @ts-ignore -- tdClassName should exist in CustomColumn
                        cell.column.tdClassName,
                      ),
                      style: {
                        flex: `1 1 ${cell.column.width || 150}px`,
                        minWidth: cell.column.minWidth || 150,
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
