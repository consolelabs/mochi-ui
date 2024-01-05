import { utils } from '@consolelabs/mochi-formatter'
import {
  Avatar,
  Badge,
  BadgeIcon,
  ColumnProps,
  Pagination,
  PaginationProps,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Table,
  Typography,
} from '@mochi-ui/core'
import clsx from 'clsx'
import { useMemo } from 'react'
import { transactionActionString } from '~constants/transactions'
import Amount from '~cpn/Amount'
import { TransactionAction } from './TransactionAction'
import { TransactionRecipients } from './TransactionRecipients'
import { TransactionStatusIcon } from './TransactionStatusIcon'
import { TransactionTxGroup } from './TransactionTxGroup'
import { TransactionTableProps, Tx } from './types'
import { openTx } from './utils'

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
        header: 'tx id',
        id: 'txId',
        width: 130,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <div className="flex items-center gap-1.5">
              <TransactionStatusIcon tx={tx} />
              <TransactionTxGroup tx={tx} />
            </div>
          )
        },
      },
      {
        header: 'issued by',
        id: 'from',
        width: 210,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <div className="flex gap-3 items-center">
              <Avatar
                smallSrc={tx.from.platformIcon}
                src={tx.from.avatar}
                fallback={tx.from.address}
              />
              <div className="flex flex-col gap-1">
                <Typography level="p5" className="break-words truncate">
                  {utils.string.formatAddressUsername(tx.from.address)}
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
        header: 'type',
        id: 'type',
        width: 140,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Badge
              className="inline-flex capitalize border border-primary-solid"
              appearance="primary"
            >
              {transactionActionString[tx.action] ?? 'tip'}
            </Badge>
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

          return <TransactionRecipients tx={tx} />
        },
      },
      {
        header: 'total value',
        id: 'amount',
        width: 210,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Amount
              size="sm"
              value={tx.amount}
              valueUsd={tx.amountUsd}
              unit={tx.token.symbol}
              tokenIcon={tx.token.icon}
              className="!items-center"
            />
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
        header: '',
        id: 'action',
        width: 100,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionAction tx={tx} />
        },
      },
    )

    return columns.filter(
      (c) => columnFlags[c.id as keyof typeof columnFlags] !== false,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(columnFlags)])

  const isEmpty = !rest.isLoading && rest.data?.length === 0

  return (
    <>
      <ScrollArea>
        <ScrollAreaViewport>
          <div style={{ minWidth: 1400 }} className={className}>
            <Table
              {...rest}
              columns={columns}
              className="p-0"
              loadingRows={
                (componentsProps.pagination as PaginationProps)
                  ?.initItemsPerPage
              }
              rowClassName={(row) => {
                if (row.isNew) {
                  return 'animate-new-tx-fade-out'
                }

                return ''
              }}
              onRow={(tx) => ({
                onClick: () => {
                  openTx(tx)
                },
              })}
            />
          </div>
        </ScrollAreaViewport>
        {!isEmpty && (
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        )}
      </ScrollArea>
      {isEmpty && (
        <div
          className={clsx(
            'w-full h-[80vh] flex flex-col gap-1 items-center justify-center',
            componentsProps.empty?.className,
          )}
        >
          <Typography level="h7">No result found</Typography>
          <Typography level="p5" color="textSecondary">
            Try searching for something else.
          </Typography>
        </div>
      )}
      {componentsProps.pagination &&
        (componentsProps.pagination.totalItems || 0) > 0 && (
          <div className="p-4 text-sm">
            <Pagination
              recordName="transactions"
              {...componentsProps.pagination}
            />
          </div>
        )}
    </>
  )
}
