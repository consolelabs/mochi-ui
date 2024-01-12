/* eslint-disable react/no-unstable-nested-components */
import { useClipboard } from '@dwarvesf/react-hooks'
import { truncate } from '@dwarvesf/react-utils'
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
  Tooltip,
  Typography,
} from '@mochi-ui/core'
import { ArrowRightLine, CheckLine, CopyLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import { useMemo } from 'react'
import Amount from '~cpn/Amount'
import { TransactionAction } from './TransactionAction'
import { TransactionIssuedBy } from './TransactionIssuedBy'
import { TransactionRecipients } from './TransactionRecipients'
import { TransactionStatusIcon } from './TransactionStatusIcon'
import { TransactionTxGroup } from './TransactionTxGroup'
import { TransactionTableProps, Tx } from './types'
import { openTx } from './utils'
import { TransactionBadge } from './TransactionBadge'
import { TransactionHeaderAction } from './TransactionHeaderAction'
import { TransactionHeaderWen } from './TransactionHeaderWen'
import { TransactionHeaderTotalValue } from './TransactionHeaderTotalValue'

export const TransactionTable = (props: TransactionTableProps) => {
  const {
    className,
    componentsProps = {},
    columns: columnFlags = {},
    enableColFilter = true,
    enableColSort = true,
    ...rest
  } = props

  const columns = useMemo(() => {
    const columns: ColumnProps<Tx>[] = []

    columns.push(
      {
        header: '#',
        id: 'txId',
        width: 50,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { onCopy, hasCopied } = useClipboard(tx.code)

          return (
            <div className="flex gap-1.5 items-center">
              <TransactionStatusIcon tx={tx} />
              <TransactionTxGroup tx={tx} />
              {hasCopied ? (
                <CheckLine />
              ) : (
                <CopyLine
                  onClick={(e) => {
                    e.stopPropagation()
                    onCopy()
                  }}
                />
              )}
            </div>
          )
        },
      },
      {
        header: () => <TransactionHeaderWen disabled={!enableColSort} />,
        id: 'wen',
        width: 170,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <Tooltip content={tx.full_date}>
              <Typography level="p5" className="tabular-nums text-left">
                {tx.date}
              </Typography>
            </Tooltip>
          )
        },
      },
      {
        header: () => <TransactionHeaderAction disabled={!enableColFilter} />,
        id: 'type',
        width: 50,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionBadge action={tx.action} />
        },
      },
      {
        header: 'issued by',
        id: 'from',
        width: 220,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionIssuedBy tx={tx} />
        },
      },
      {
        header: '',
        id: 'decoration arrow',
        width: 50,
        // eslint-disable-next-line
        cell: () => {
          return (
            <div className="flex justify-center items-center p-1 w-5 h-5 rounded-full border border-neutral-300">
              <ArrowRightLine />
            </div>
          )
        },
      },
      {
        header: 'recipients',
        id: 'to',
        width: 220,
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionRecipients tx={tx} />
        },
      },
      {
        header: () => <TransactionHeaderTotalValue disabled={!enableColSort} />,
        id: 'amount',
        width: 140,
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
              alignment="left"
            />
          )
        },
      },
      {
        header: 'where',
        id: 'where',
        width: 50,
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
              <Tooltip content={tx.where.text}>
                <span className="w-full truncate">
                  {truncate(tx.where.text, 20)}
                </span>
              </Tooltip>
            </Badge>
          )
        },
      },
      {
        header: '',
        id: 'action',
        width: 50,
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
              size="sm"
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
