import { ColumnProps, Table, TableProps, Typography } from '@mochi-ui/core'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { TokenAvatar } from '~cpn/TokenAvatar'
import { Bag, WalletSolid } from '@mochi-ui/icons'
import { Balance } from '~store/wallets'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import clsx from 'clsx'

const sortOrder = ['SOL']

export interface BalanceWithSource extends Balance {
  source: {
    id?: string
    title?: string
  }
}

interface Props extends Omit<TableProps<BalanceWithSource>, 'columns'> {}

const Token: ColumnProps<BalanceWithSource>['cell'] = (props) => (
  <div className="flex items-center space-x-2">
    <TokenAvatar
      src={props.row.original.token?.icon || ''}
      name={props.row.original.token?.symbol || ''}
      smallSrc={props.row.original.token?.chain?.icon || ''}
      chainName={
        props.row.original.token?.chain?.symbol ||
        props.row.original.token?.chain?.short_name ||
        ''
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
        level="p6"
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
    <ScrollArea.Root className="overflow-hidden h-[420px]">
      <ScrollArea.Viewport className="relative w-full h-full [&>div]:h-full">
        <Table
          {...props}
          stickyHeader
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
          className={clsx('!static', { 'h-full': !data.length }, className)}
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
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex p-0.5 w-2 transition-colors select-none touch-none bg-neutral-outline hover:bg-neutral-outline-hover"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-neutral-solid before:content-[''] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="bg-neutral-outline-hover" />
    </ScrollArea.Root>
  )
}
