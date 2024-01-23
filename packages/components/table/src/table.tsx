import { table } from '@mochi-ui/theme'
import { Skeleton } from '@mochi-ui/skeleton'
import type { ColumnDef as ColDef, RowData } from '@tanstack/react-table'
import {
  Row,
  flexRender,
  getCoreRowModel,
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
  rowClassName?: (record: T, index: number) => string
  cellClassName?: (
    record: T | null,
    rowIndex: number,
    colIndex: number,
  ) => string
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
  hideLastBorder?: boolean
  emptyContent?: React.ReactNode
  size?: 'sm' | 'md'
  stickyHeader?: boolean
}

const {
  tableWrapperClsx,
  tableClsx,
  tableHeaderClsx,
  tableHeaderContainerClsx,
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
  hideLastBorder,
  emptyContent,
  size = 'md',
  rowClassName,
  cellClassName,
  stickyHeader,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand,
  })

  const hasCustomWidth = columns.some((col) => col.width)

  return (
    <div className={tableWrapperClsx({ className: wrapperClassName, border })}>
      <table className={tableClsx({ className })}>
        {hasCustomWidth ? (
          <colgroup>
            {columns.map((col, index) => (
              <col
                key={index}
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
        <thead className={tableHeaderContainerClsx({})}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={tableHeaderClsx({
                    stickyHeader,
                  })}
                  colSpan={header.colSpan}
                  key={header.id}
                  align={(header.column.columnDef.meta as any)?.align || 'left'}
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
                        className={tableDataLoadingClsx({
                          hideLastBorder,
                          border,
                          size,
                          className: cellClassName?.(null, rowIdx, idx),
                        })}
                        key={idx}
                      >
                        <Skeleton className={tableDataSkeletonClsx()} />
                      </td>
                    ))}
                  </tr>
                ))
            : null}

          {!isLoading
            ? table.getRowModel().rows.map((row, rowIndex) => (
                <Fragment key={row.id}>
                  <tr
                    className={tableRowClsx({
                      clickable: !!onRow,
                      className: rowClassName?.(row.original, rowIndex),
                    })}
                    {...(onRow ? onRow(row.original, rowIndex) : {})}
                  >
                    {row.getVisibleCells().map((cell, colIndex) => (
                      <td
                        className={tableDataClsx({
                          hideLastBorder,
                          border,
                          size,
                          className: cellClassName?.(
                            row.original,
                            rowIndex,
                            colIndex,
                          ),
                        })}
                        key={cell.id}
                        align={
                          (cell.column.columnDef.meta as any)?.align || 'left'
                        }
                      >
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
                        className={tablesExpandedDataClsx({
                          hideLastBorder,
                          border,
                        })}
                      >
                        {renderSubComponent(row.original, rowIndex)}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))
            : null}

          {!isLoading && !data.length && !!emptyContent && (
            <tr className="group">
              <td colSpan={table.getHeaderGroups()[0].headers.length}>
                {emptyContent}
              </td>
            </tr>
          )}
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
