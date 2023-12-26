import {
  Avatar,
  Badge,
  BadgeIcon,
  ColumnProps,
  Pagination,
  Table,
  Typography,
} from '@mochi-ui/core'
import { ArrowRightLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import { useMemo } from 'react'
import { TransactionTableProps, Tx } from './types'

export const TransactionTable = (props: TransactionTableProps) => {
  const {
    className,
    componentsProps = {},
    columns: columnFlags = {},
    ...rest
  } = props

  const columns = useMemo(() => {
    const columns: ColumnProps<Tx>[] = []

    columns.push(
      {
        header: 'issued by',
        id: 'from',
        width: 210,
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
                <Typography level="p5" className="break-words truncate">
                  {tx.from.address}
                </Typography>
                {tx.from.platform && (
                  <Typography
                    level="p6"
                    className="!text-text-secondary capitalize"
                  >
                    {tx.from.platform}
                  </Typography>
                )}
              </div>
            </div>
          )
        },
      },
      {
        header: '',
        id: 'arrow',
        width: 60,
        // eslint-disable-next-line
        cell: () => {
          return (
            <div className="p-1 w-5 h-5 rounded-full border border-primary-solid bg-primary-solid/25 text-primary-solid">
              <ArrowRightLine className="w-full h-full scale-125" />
            </div>
          )
        },
      },
      {
        header: 'recipients',
        id: 'to',
        width: 200,
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
                <Typography level="p5" className="break-words truncate">
                  {tx.to.address}
                </Typography>
                {tx.to.platform && (
                  <Typography
                    level="p6"
                    className="!text-text-secondary capitalize"
                  >
                    {tx.to.platform}
                  </Typography>
                )}
              </div>
            </div>
          )
        },
      },
      {
        header: 'type',
        id: 'type',
        width: 140,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Badge className="inline-flex capitalize" appearance="white">
              {tx.action}
            </Badge>
          )
        },
      },
      {
        header: 'amount',
        id: 'amount',
        width: 210,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <div className="flex items-center gap-2">
              <Avatar src={tx.token.icon} size="sm" />
              <Typography level="p5">
                {tx.amount} {tx.token.symbol}
              </Typography>
            </div>
          )
        },
      },
      {
        header: 'where',
        id: 'where',
        width: 210,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Badge className="inline-flex !bg-neutral-150" appearance="white">
              <BadgeIcon className="-ml-0.5">
                {typeof tx.where.avatar === 'string' ? (
                  <Avatar src={tx.where.avatar} size="xs" />
                ) : (
                  <div className="flex justify-center items-center w-4 h-4 rounded-full">
                    <tx.where.avatar />
                  </div>
                )}
              </BadgeIcon>
              <span className="w-full truncate">{tx.where.text}</span>
            </Badge>
          )
        },
      },
      {
        header: 'tx id',
        id: 'txId',
        width: 130,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <Typography level="p5">{tx.code.slice(0, 9)}</Typography>
        },
      },
      {
        header: 'wen',
        id: 'wen',
        width: 180,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <Typography level="p5">{tx.date}</Typography>
        },
      },
      {
        header: 'status',
        id: 'status',
        width: 100,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Badge
              className={clsx(
                'inline-flex',
                tx.isSuccess
                  ? 'bg-success-outline text-success-solid'
                  : 'bg-danger-outline text-danger-solid',
              )}
              appearance="white"
            >
              {tx.isSuccess ? 'Success' : 'Failed'}
            </Badge>
          )
        },
      },
    )

    return columns.filter(
      (c) => columnFlags[c.id as keyof typeof columnFlags] !== false,
    )
  }, [columnFlags])

  return (
    <>
      <Table {...rest} columns={columns} className={clsx('p-0', className)} />
      {componentsProps.pagination && (
        <div className="p-4 text-sm">
          <Pagination {...componentsProps.pagination} />
        </div>
      )}
    </>
  )
}
