import type { RowData, ColumnDef as ColDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'

export type ColumnProps<T> = ColDef<T>

interface TableProps<T> {
  columns: ColumnProps<T>[]
  data: T[]
  isLoading?: boolean
  loadingRows?: number
}

export function Table<T extends RowData>({
  data,
  columns,
  isLoading,
  loadingRows = 5,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="p-2">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="py-3 px-4 text-xs font-semibold tracking-tight text-left uppercase border-0 border-b border-gray-200 border-solid min-w-[48px] text-zinc-500"
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
                  <tr key={rowIdx}>
                    {headers.map((_: any, idx: number) => (
                      <td
                        className="px-4 py-3 text-sm font-normal leading-tight border-0 border-b border-gray-200 border-solid rounded text-zinc-800"
                        key={idx}
                      >
                        <div className="bg-gray-200 animate-pulse h-[22px]" />
                      </td>
                    ))}
                  </tr>
                ))
            : null}

          {!isLoading
            ? table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="py-3 px-4 text-sm font-normal leading-tight border-0 border-b border-gray-200 border-solid min-w-[48px] text-zinc-800"
                      key={cell.id}
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
