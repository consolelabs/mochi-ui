import { Avatar, Badge, ColumnProps, Pagination, Table } from '@mochi-ui/core'
import { ArrowRightLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import { useMemo } from 'react'
import { TransactionTableProps, Tx } from './types'

export const TransactionTable = (props: TransactionTableProps) => {
  const { className, componentsProps = {}, ...rest } = props

  const columns = useMemo(() => {
    const columns: ColumnProps<Tx>[] = []

    columns.push(
      {
        header: 'issued by',
        width: 270,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <div className="flex items-center gap-3">
              <Avatar
                smallSrc={tx.from.platformIcon}
                src={tx.from.avatar}
                fallback={tx.from.address}
              />
              <div className="flex flex-col gap-1">
                <div className="text-sm leading-5 break-words truncate">
                  {tx.from.address}
                </div>
                {tx.to.platform && (
                  <div className="text-xs text-neutral-600 capitalize">
                    {tx.to.platform}
                  </div>
                )}
              </div>
            </div>
          )
        },
      },
      {
        header: '',
        id: 'arrow',
        // eslint-disable-next-line
        cell: () => {
          return (
            <div className="p-1 w-5 h-5 rounded-full border border-blue-700 bg-primary-700/25 text-primary-700">
              <ArrowRightLine className="w-full h-full scale-125" />
            </div>
          )
        },
      },
      {
        header: 'recipients',
        width: 270,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <div className="flex items-center gap-3">
              <Avatar
                smallSrc={tx.to.platformIcon}
                src={tx.to.avatar}
                fallback={tx.to.address}
              />
              <div className="flex flex-col gap-1">
                <div className="text-sm leading-5 break-words truncate">
                  {tx.to.address}
                </div>
                <div className="text-xs text-neutral-600 capitalize">
                  {tx.to.platform}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        header: 'type',
        width: 200,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Badge
              className="inline-flex capitalize"
              appearance="white"
              label={tx.action}
            />
          )
        },
      },
      {
        header: 'amount',
        width: 200,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <div className="flex items-center gap-2">
              <Avatar src={tx.token.icon} size="sm" />
              <span className="text-sm font-normal leading-5">
                {tx.amount} {tx.token.symbol}
              </span>
            </div>
          )
        },
      },
      {
        header: 'where',
        width: 200,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Badge
              className="inline-flex !bg-neutral-150"
              icon={
                typeof tx.where.avatar === 'string' ? (
                  <Avatar src={tx.where.avatar} size="xs" />
                ) : (
                  <div className="flex justify-center items-center w-4 h-4 rounded-full">
                    <tx.where.avatar />
                  </div>
                )
              }
              iconClassName="-ml-0.5"
              label={<span className="w-full truncate">{tx.where.text}</span>}
              appearance="white"
            />
          )
        },
      },
      {
        header: 'tx id',
        width: 110,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <span className="text-sm font-normal leading-5">
              {tx.code.slice(0, 9)}
            </span>
          )
        },
      },
      {
        header: 'when',
        width: 170,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <span className="text-sm font-normal leading-5">{tx.date}</span>
          )
        },
      },
      {
        header: 'status',
        width: 100,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Badge
              className={clsx(
                'inline-flex',
                tx.isSuccess
                  ? 'bg-success-100 text-success-700'
                  : 'bg-danger-100 text-danger-700',
              )}
              label={tx.isSuccess ? 'Success' : 'Failed'}
              appearance="white"
            />
          )
        },
      },
    )

    return columns
  }, [])

  return (
    <div className={clsx('', className)}>
      <Table {...rest} columns={columns} className="p-0" />
      {componentsProps.pagination && (
        <div className="px-6 py-4 text-sm">
          <Pagination {...componentsProps.pagination} />
        </div>
      )}
    </div>
  )
}
