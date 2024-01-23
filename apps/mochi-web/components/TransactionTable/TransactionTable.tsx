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
import { useEffect, useMemo, useRef } from 'react'
import Amount from '~cpn/Amount'
import { useTransactionStore } from '~cpn/explore/index/stores/useTransactionStore'
import { TransactionPeekingCard } from '~cpn/TransactionPeekingCard'
import { TransactionAction } from './TransactionAction'
import { TransactionBadge } from './TransactionBadge'
import { TransactionHeaderAction } from './TransactionHeaderAction'
import { TransactionHeaderTotalValue } from './TransactionHeaderTotalValue'
import { TransactionHeaderWen } from './TransactionHeaderWen'
import { TransactionIssuedBy } from './TransactionIssuedBy'
import { TransactionRecipients } from './TransactionRecipients'
import { TransactionStatusIcon } from './TransactionStatusIcon'
import { TransactionTxGroup } from './TransactionTxGroup'
import { TransactionTableProps, Tx } from './types'
import { openTx } from './utils'
import { TransactionTime } from './TransactionTime'

export const TransactionTable = (props: TransactionTableProps) => {
  const {
    className,
    componentsProps = {},
    columns: columnFlags = {},
    enableColFilter = true,
    enableColSort = true,
    upper,
    ...rest
  } = props

  const columns = useMemo(() => {
    const columns: ColumnProps<Tx>[] = []

    columns.push(
      {
        header: () => <span className="px-1 pl-2">#</span>,
        id: 'txId',
        width: '5%',
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { onCopy, hasCopied } = useClipboard(tx.code)

          return (
            <div className="flex gap-1.5 items-center pl-2">
              <TransactionStatusIcon tx={tx} />
              <Tooltip
                content={<TransactionPeekingCard tx={tx} />}
                className="!shadow-none bg-transparent"
                arrow="right-center"
                componentProps={{
                  trigger: { className: 'flex' },
                }}
              >
                <TransactionTxGroup tx={tx} />
              </Tooltip>
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
        width: '10%',
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionTime date={tx.date} raw={tx.rawDate} />
        },
      },
      {
        header: () => <TransactionHeaderAction disabled={!enableColFilter} />,
        id: 'type',
        width: '8%',
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionBadge action={tx.action} />
        },
      },
      {
        header: 'issued by',
        id: 'from',
        width: '7%',
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionIssuedBy tx={tx} />
        },
      },
      {
        header: '',
        id: 'decoration arrow',
        width: '2%',
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
        width: '7%',
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return <TransactionRecipients tx={tx} />
        },
      },
      {
        header: () => <TransactionHeaderTotalValue disabled={!enableColSort} />,
        id: 'amount',
        width: '8%',
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original

          return (
            <div className="w-max">
              <Amount
                size="sm"
                value={tx.amount}
                valueUsd={tx.amountUsd}
                unit={tx.token.symbol}
                tokenIcon={tx.token.icon}
                alignment="left"
              />
            </div>
          )
        },
      },
      {
        header: 'where',
        id: 'where',
        width: '8%',
        // eslint-disable-next-line
        cell: (props) => {
          const tx = props.row.original
          const truncatedVal = truncate(tx.where.text, 20)
          const isTruncated = truncatedVal !== tx.where.text

          return (
            <Badge
              className="inline-flex !bg-neutral-soft-hover border border-neutral--border"
              appearance="neutral"
            >
              <BadgeIcon className="-ml-0.5">
                {typeof tx.where.avatar === 'string' ? (
                  <Avatar src={tx.where.avatar} size="xxs" />
                ) : (
                  <div className="flex justify-center items-center w-4 h-4 rounded-full">
                    <tx.where.avatar />
                  </div>
                )}
              </BadgeIcon>
              {isTruncated ? (
                <Tooltip content={tx.where.text}>
                  <span className="w-full truncate">{truncatedVal}</span>
                </Tooltip>
              ) : (
                <span className="w-full truncate">{truncatedVal}</span>
              )}
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

          return (
            <div className="flex justify-end">
              <TransactionAction tx={tx} />
            </div>
          )
        },
      },
    )

    return columns.filter(
      (c) => columnFlags[c.id as keyof typeof columnFlags] !== false,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(columnFlags)])

  const isEmpty = !rest.isLoading && rest.data?.length === 0

  const { filters } = useTransactionStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, top: 0 })
  }, [filters])

  return (
    <div
      style={{ maxWidth: '100vw' }}
      className={clsx('mx-auto w-max', className)}
    >
      {upper}
      <ScrollArea>
        <ScrollAreaViewport ref={scrollRef}>
          <Table
            {...rest}
            size="sm"
            columns={columns}
            className="p-0"
            loadingRows={
              (componentsProps.pagination as PaginationProps)?.initItemsPerPage
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
      {componentsProps.pagination && (
        <div className="p-4 w-full text-sm">
          <Pagination
            recordName="transactions"
            {...componentsProps.pagination}
          />
        </div>
      )}
    </div>
  )
}
