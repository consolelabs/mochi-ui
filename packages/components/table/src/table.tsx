import { table } from '@mochi-ui/theme'
import type { ColumnDef as ColDef, RowData } from '@tanstack/react-table'
import {
  Row,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Fragment, ReactNode } from 'react'

export type ColumnProps<T> = ColDef<T> & { width?: number | string }

export interface TableProps<T> {
  columns: ColumnProps<T>[]
  data: T[]
  isLoading?: boolean
  loadingRows?: number
  className?: string
  wrapperClassName?: string
  onRow?: (
    record: T,
    rowIndex: number,
  ) => {
    onClick?: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void
    onDoubleClick?: (
      event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    ) => void
    onMouseEnter?: (
      event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    ) => void
    onMouseLeave?: (
      event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    ) => void
  }
  renderSubComponent?: (record: T, rowIndex: number) => React.ReactNode
  getRowCanExpand?: (row: Row<T>) => boolean
  border?: boolean
}

const {
  tableWrapperClsx,
  tableClsx,
  tableHeaderClsx,
  tableDataLoadingClsx,
  tableDataSkeletonClsx,
  tableDataClsx,
  tableRowClsx,
  tablesExpandedDataClsx,
} = table

export default function Table<T extends RowData>({
  data,
  columns,
  isLoading,
  loadingRows = 5,
  className,
  wrapperClassName,
  onRow,
  renderSubComponent,
  getRowCanExpand,
  border,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowCanExpand,
  })

  const hasCustomWidth = columns.some((col) => col.width)

  return (
    <div className={tableWrapperClsx({ className: wrapperClassName, border })}>
      <table className={tableClsx({ className })}>
        {hasCustomWidth ? (
          <colgroup>
            {columns.map((col) => (
              <col
                style={{
                  width:
                    typeof col.width === 'string'
                      ? col.width
                      : `${col.width}px`,
                }}
              />
            ))}
          </colgroup>
        ) : null}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={tableHeaderClsx()}
                  colSpan={header.colSpan}
                  key={header.id}
                >
                  {!header.isPlaceholder &&
                    (flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    ) as ReactNode)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading
            ? new Array(loadingRows)
                .fill(
                  new Array(table.getHeaderGroups()[0].headers.length).fill(0),
                )
                .map((headers, rowIdx) => (
                  <tr key={rowIdx} className="group">
                    {headers.map((_: any, idx: number) => (
                      <td
                        className={tableDataLoadingClsx({ border })}
                        key={idx}
                      >
                        <div className={tableDataSkeletonClsx()} />
                      </td>
                    ))}
                  </tr>
                ))
            : null}

          {!isLoading
            ? table.getRowModel().rows.map((row, rowIndex) => (
                <Fragment key={row.id}>
                  <tr
                    className={tableRowClsx({ clickable: !!onRow })}
                    {...(onRow ? onRow(row.original, rowIndex) : {})}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className={tableDataClsx({ border })} key={cell.id}>
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          ) as ReactNode
                        }
                      </td>
                    ))}
                  </tr>

                  {row.getIsExpanded() && renderSubComponent ? (
                    <tr className="group">
                      {/* 2nd row is a custom 1 cell row */}
                      <td
                        colSpan={row.getVisibleCells().length}
                        className={tablesExpandedDataClsx({ border })}
                      >
                        {renderSubComponent(row.original, rowIndex)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))
            : null}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th colSpan={header.colSpan} key={header.id}>
                  {!header.isPlaceholder &&
                    (flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    ) as ReactNode)}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  )
}
