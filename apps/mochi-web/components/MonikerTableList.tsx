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
} from '@mochi-ui/core'
import { useMemo } from 'react'
import { utils } from '@consolelabs/mochi-formatter'
import { Bag } from '@mochi-ui/icons'
import { Balance, useWalletStore } from '~store/wallets'
import clsx from 'clsx'
import useSWR from 'swr'
import { api } from '~constants/mochi'
import { Moniker } from './MochiWidget/TokenPicker/type'
import { MonikerIcons } from './MochiWidget/TokenPicker/utils'
import { BalanceWithSource } from './TokenTableList'

interface Props extends Omit<TableProps<Moniker>, 'columns' | 'data'> {
  searchTerm?: string
  data: BalanceWithSource[]
}

function getFilterMonikerNameFunc(searchTerm?: string) {
  return function filterMonikerName(monikerAsset: Moniker) {
    return searchTerm
      ? monikerAsset.name.toLowerCase().includes(searchTerm.toLowerCase())
      : monikerAsset
  }
}

const MonikerName: ColumnProps<Moniker>['cell'] = (props) => (
  <div className="flex gap-x-2 items-center">
    <div className="flex justify-center items-center w-6 h-6 rounded-full border border-[#E5E4E3]">
      <span className="text-sm">
        {MonikerIcons.get(props.row.original.name)}
      </span>
    </div>

    <div>
      <Typography level="h8">{props.row.original.name}</Typography>

      <Typography
        level="p7"
        fontWeight="md"
        color="textSecondary"
        className="flex items-center h-3.5"
      >
        {`${utils.formatTokenDigit(props.row.original.token_amount)} ${
          props.row.original.token.symbol
        }`}
      </Typography>
    </div>
  </div>
)

export const MonikerTableList = ({
  data: balances,
  wrapperClassName,
  className,
  size = 'sm',
  ...props
}: Props) => {
  const { searchTerm } = props
  const { wallets } = useWalletStore()

  const { data = [], isLoading } = useSWR<Moniker[], any, [string, Balance[]]>(
    ['moniker-list', balances],
    async ([_, balances]) => {
      const { ok, data } = await api.base.configDefi.getDefaultMonikers()
      if (!ok) return []

      const tokenIdsSet = new Set(balances.map((b) => b.token.id))

      return data.map((d) => {
        const wallet = wallets.find((w) =>
          w.balances.find(
            (b) =>
              b.token.id === d.moniker.token_id &&
              +b.token.chain_id === +d.moniker.token.chain_id,
          ),
        )

        const source = {
          id: wallet?.id,
          title: wallet?.title,
        }

        return {
          type: 'moniker',
          group: 'Default',
          id: d.moniker.id,
          name: d.moniker.moniker,
          asset_balance: d.moniker.amount,
          token_amount: d.value,
          disabled: !tokenIdsSet.has(d.moniker.token_id) && !wallet,
          source,
          token: {
            // @ts-ignore
            address: d.moniker.token.address,
            // @ts-ignore
            native: d.moniker.token.native,
            // @ts-ignore
            decimal: d.moniker.token.decimal,
            price: d.moniker.token.token_price,
            symbol: d.moniker.token.token_symbol,
            chain_id: d.moniker.token.chain_id,
          },
        }
      }) as Moniker[]
    },
  )

  const isUserHasUnusableMoniker = data.some((d) => d.disabled)

  const filteredMonikers = useMemo(() => {
    return data.filter(getFilterMonikerNameFunc(searchTerm)).sort((a, b) => {
      if (a.disabled) return 1
      if (b.disabled) return -1
      return 0
    })
  }, [searchTerm, data])

  return (
    <>
      <ScrollArea className="h-[430px]">
        <ScrollAreaViewport>
          <Table
            {...props}
            isLoading={isLoading}
            stickyHeader
            cellClassName={() => '!border-0 !h-10'}
            rowClassName={(row) =>
              clsx('rounded', {
                'opacity-50 hover:bg-transparent !cursor-not-allowed':
                  row.disabled,
              })
            }
            data={filteredMonikers}
            size={size}
            wrapperClassName={clsx(
              '!overflow-y-visible h-full',
              clsx(wrapperClassName),
            )}
            className={clsx(
              '!static',
              { 'h-[420px]': !data.length },
              className,
            )}
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
                header: 'Name',
                cell: MonikerName,
                width: '50%',
              },
              {
                header: 'USD Value',
                accessorFn: (row) =>
                  utils.formatUsdDigit(row.token_amount * row.token.price),
                width: '50%',
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

      {isUserHasUnusableMoniker ? (
        <span className="text-xs text-text-disabled">
          Unusable monikers (equivalent token has 0 amount) are disabled
        </span>
      ) : null}
    </>
  )
}
