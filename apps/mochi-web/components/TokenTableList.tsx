import { ColumnProps, Table, TableProps, Typography } from '@mochi-ui/core'
import { utils as mochiUtils } from '@consolelabs/mochi-ui'
import { TokenAvatar } from '~cpn/TokenAvatar'
import { Bag, WalletSolid } from '@mochi-ui/icons'
import { Balance } from '~store'

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

export const TokenTableList = (props: Props) => {
  return (
    <Table
      {...props}
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
          accessorFn: (row) => mochiUtils.formatUsdDigit(row.usd_balance || 0),
          width: '30%',
          meta: {
            align: 'right',
          },
        },
      ]}
    />
  )
}
