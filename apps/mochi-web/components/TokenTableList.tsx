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
  Avatar,
} from '@mochi-ui/core'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { Bag, WalletSolid } from '@mochi-ui/icons'
import { Balance } from '~store/wallets'
import clsx from 'clsx'
import { coinIcon } from '~utils/image'

const sortOrder = ['SOL']

export interface BalanceWithSource extends Balance {
  source: {
    id: string
    title: string
  }
}

interface Props extends Omit<TableProps<BalanceWithSource>, 'columns'> {}

const Token: ColumnProps<BalanceWithSource>['cell'] = (props) => (
  <div className="flex items-center space-x-2">
    <Avatar
      src={props.row.original.token.icon}
      smallSrc={props.row.original.token.chain?.icon ?? coinIcon.src}
      fallback={coinIcon.src}
      size="xs"
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
        color="textSecondary"
        className="flex items-center"
      >
        <WalletSolid className="mr-1 w-3.5 h-3.5" />
        {props.row.original.source.title}
      </Typography>
    </div>
  </div>
)

export const TokenTableList = ({
  data,
  wrapperClassName,
  className,
  size = 'sm',
  ...props
}: Props) => {
  return (
    <ScrollArea className="h-[430px]">
      <ScrollAreaViewport>
        <Table
          {...props}
          stickyHeader
          cellClassName={() => '!border-0 !h-10'}
          rowClassName={() => 'rounded'}
          data={data.sort((a, b) => {
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
              <Bag className="w-14 h-14 text-neutral-500" />
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
              header: 'Price',
              accessorKey: 'token.price',
              accessorFn: (row) =>
                mochiUtils.formatUsdPriceDigit({
                  value: row.token?.price || 0,
                }),
              width: '25%',
            },
            {
              header: 'USD Value',
              accessorKey: 'usd_amount',
              accessorFn: (row) =>
                mochiUtils.formatUsdDigit(row.usd_balance || 0),
              width: '30%',
              meta: {
                align: 'right',
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
