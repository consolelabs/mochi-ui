import {
  ColumnProps,
  Table,
  TableProps,
  Typography,
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  ScrollAreaCorner,
  Tooltip,
  ValueChange,
  ValueChangeIndicator,
} from '@mochi-ui/core'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'
import {
  ArrowDownDownColored,
  ArrowDownLine,
  ArrowUpDownLine,
  ArrowUpLine,
  ArrowUpUpColored,
  Bag,
  BagDark,
  WalletSolid,
} from '@mochi-ui/icons'
import { Balance } from '~store/wallets'
import clsx from 'clsx'
import { useTheme } from '~context/theme'
import { useCallback, useMemo, useState } from 'react'
import { TokenAvatar } from './TokenAvatar'

const sortOrder = ['SOL']

export interface BalanceWithSource extends Balance {
  pnl?: string
  source: {
    id: string
    title: string
  }
}

interface Props extends Omit<TableProps<BalanceWithSource>, 'columns'> {}

interface HeaderProps {
  sort: string
  setSort: (sort: string) => void
}

const PriceHeader = (props: {
  column: { columnDef: ColumnProps<BalanceWithSource> }
}) => {
  const { sort, setSort: _setSort } = props.column.columnDef.meta as HeaderProps
  const icon = useMemo(() => {
    if (sort === 'price+') return <ArrowUpLine className="w-3 h-3" />
    if (sort === 'price-') return <ArrowDownLine className="w-3 h-3" />
    return <ArrowUpDownLine className="w-4 h-4" />
  }, [sort])
  const setSort = useCallback(() => {
    if (sort === 'price+') return _setSort('')
    if (sort === 'price-') return _setSort('price+')
    _setSort('price-')
  }, [_setSort, sort])

  return (
    <button
      type="button"
      className="flex gap-x-1 justify-between items-center focus:outline-none"
      onClick={setSort}
    >
      <span className="uppercase">Price</span>
      {icon}
    </button>
  )
}

const UsdValueHeader = (props: {
  column: { columnDef: ColumnProps<BalanceWithSource> }
}) => {
  const { sort, setSort: _setSort } = props.column.columnDef.meta as HeaderProps
  const icon = useMemo(() => {
    if (sort === 'usd_balance+') return <ArrowUpLine className="w-3 h-3" />
    if (sort === 'usd_balance-') return <ArrowDownLine className="w-3 h-3" />
    return <ArrowUpDownLine className="w-4 h-4" />
  }, [sort])
  const setSort = useCallback(() => {
    if (sort === 'usd_balance+') return _setSort('')
    if (sort === 'usd_balance-') return _setSort('usd_balance+')
    _setSort('usd_balance-')
  }, [_setSort, sort])

  return (
    <button
      type="button"
      className="flex gap-x-1 justify-between items-center focus:outline-none"
      onClick={setSort}
    >
      <span className="uppercase">USD Value</span>
      <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
    </button>
  )
}

const Token: ColumnProps<BalanceWithSource>['cell'] = (props) => (
  <div className="flex items-center space-x-2">
    <TokenAvatar
      src={props.row.original.token.icon}
      name={props.row.original.token.symbol}
      smallSrc={props.row.original.token.chain?.icon}
      chainName={
        props.row.original.token.chain?.symbol ||
        props.row.original.token.chain?.short_name ||
        props.row.original.token.chain?.name
      }
    />
    <div>
      <div className="flex space-x-1">
        <Typography level="h8">
          {mochiUtils.formatTokenDigit(props.row.original.asset_balance || 0)}
        </Typography>
        <Typography level="h8" color="textSecondary">
          {props.row.original.token?.symbol}
        </Typography>
      </div>
      <Typography
        level="p7"
        fontWeight="md"
        color="textTertiary"
        className="flex items-center"
      >
        <WalletSolid className="mr-1 w-3.5 h-3.5" />
        {props.row.original.source.title}
      </Typography>
    </div>
  </div>
)

const Price: ColumnProps<BalanceWithSource>['cell'] = (props) => {
  const trend = Number(props.row.original.pnl) < 0 ? 'down' : 'up'
  const Icon = trend === 'up' ? ArrowUpUpColored : ArrowDownDownColored
  const {
    pnl = '0.00',
    token: { price = 0 },
  } = props.row.original || {}

  return (
    <Tooltip
      content={
        <ValueChange trend={trend}>
          <ValueChangeIndicator className="text-text-contrast" />
          <Typography level="h9" color="textContrast">
            {Number.isNaN(Number(pnl)) || pnl === '' ? '0.00' : pnl}%
          </Typography>
        </ValueChange>
      }
      arrow="bottom-center"
      componentProps={{
        trigger: { className: 'flex items-center' },
      }}
    >
      <div className="flex justify-center items-center w-6 h-6">
        <Icon className="w-2 h-2" />
      </div>
      {mochiUtils.formatUsdPriceDigit({ value: price })}
    </Tooltip>
  )
}

export const TokenTableList = ({
  data,
  wrapperClassName,
  className,
  size = 'sm',
  ...props
}: Props) => {
  const { theme } = useTheme()
  const [sort, setSort] = useState('')

  return (
    <ScrollArea className="h-[430px]">
      <ScrollAreaViewport>
        <Table
          {...props}
          stickyHeader
          cellClassName={() => '!border-0 !h-10'}
          rowClassName={(record) =>
            clsx('rounded hover:bg-transparent', {
              'opacity-30 !cursor-not-allowed hover:bg-transparent':
                record.disabled,
            })
          }
          data={[...data].sort((a, b) => {
            const sortKey = sort.slice(0, -1)
            const sortDirection = sort.slice(-1) === '+' ? 1 : -1

            if (sortKey === 'price') {
              return sortDirection * (a.token.price - b.token.price)
            }
            if (sortKey === 'usd_balance') {
              return sortDirection * (a.usd_balance - b.usd_balance)
            }

            const indexA = sortOrder.findIndex(
              (symbol) => symbol === a.token.symbol,
            )
            const indexB = sortOrder.findIndex(
              (symbol) => symbol === b.token.symbol,
            )

            if (indexA === -1) return 1
            if (indexB === -1) return -1

            if (indexA > indexB) return 1
            if (indexA < indexB) return -1
            return 0
          })}
          size={size}
          wrapperClassName={clsx(
            '!overflow-y-visible h-full',
            clsx(wrapperClassName),
          )}
          className={clsx('!static', { 'h-[420px]': !data.length }, className)}
          emptyContent={
            <div className="flex flex-col justify-center items-center h-full">
              {theme === 'dark' ? (
                <BagDark className="w-14 h-14 text-text-tertiary" />
              ) : (
                <Bag className="w-14 h-14 text-text-tertiary" />
              )}
              <Typography level="h7" color="textSecondary">
                No assets
              </Typography>
            </div>
          }
          columns={[
            {
              header: 'Token',
              accessorKey: 'token',
              cell: Token,
              width: '45%',
            },
            {
              header: PriceHeader,
              accessorKey: 'token.price',
              cell: Price,
              width: '25%',
              meta: { sort, setSort },
            },
            {
              header: UsdValueHeader,
              accessorKey: 'usd_balance',
              accessorFn: (row) =>
                mochiUtils.formatUsdDigit(row.usd_balance || 0),
              width: '30%',
              meta: {
                align: 'right',
                sort,
                setSort,
              },
            },
          ]}
        />
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical" className="mt-10">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner className="bg-neutral-outline-hover" />
    </ScrollArea>
  )
}
