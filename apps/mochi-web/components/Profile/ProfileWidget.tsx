import {
  Avatar,
  Badge,
  Button,
  Card,
  ColumnProps,
  IconButton,
  Table,
  TokenAvatar,
  Typography,
} from '@mochi-ui/core'
import { Bag, SettingsLine, UnionSolid } from '@mochi-ui/icons'
import { useFetchBalances } from '~hooks/profile/useFetchBalances'
import { useProfileStore } from '~store'
import { ModelBalance } from '~types/mochi-pay-schema'
import { utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'
import { useFetchProfileGlobalInfo } from '~hooks/profile/useFetchProfileGlobalInfo'

const Token: ColumnProps<ModelBalance>['cell'] = (props) => (
  <div className="flex items-center space-x-2">
    <TokenAvatar
      src={props.row.original.token?.icon || ''}
      name={props.row.original.token?.symbol || ''}
    />
    <Typography level="p5">{props.row.original.token?.symbol}</Typography>
  </div>
)

export const ProfileWidget = () => {
  const { me } = useProfileStore()
  const { data: globalInfo } = useFetchProfileGlobalInfo(me?.id)
  const { data: balances = [], isLoading: fetchingBalances } = useFetchBalances(
    me?.id,
  )
  const isLoading = !me?.id || fetchingBalances

  return (
    <Card className="pb-5 space-y-4 shadow-input">
      <div className="flex space-x-4">
        <Avatar src={me?.avatar || ''} size="xl" />
        <div className="flex-1 mt-2 space-y-2 overflow-hidden">
          <Typography level="p2" fontWeight="md" noWrap>
            {me?.profile_name}
          </Typography>
          <div className="flex flex-wrap gap-1">
            {globalInfo?.roles?.map((role) => (
              <Badge
                key={role}
                label={
                  <Typography level="h8" color="primary">
                    {role}
                  </Typography>
                }
              />
            ))}
            <Badge
              appearance="white"
              label={
                <Typography level="h8">
                  Lvl. {globalInfo?.level || 0}
                </Typography>
              }
            />
            <Badge
              appearance="white"
              label={
                <Typography level="h8">
                  Rank #{globalInfo?.rank || 0}
                </Typography>
              }
            />
          </div>
        </div>
        <div className="flex mt-2 space-x-2">
          <IconButton
            variant="link"
            color="white"
            className="p-1.5"
            label="QR Code"
          >
            <UnionSolid className="w-5 h-5" />
          </IconButton>
          <IconButton
            variant="link"
            color="white"
            className="p-1.5"
            label="Setting"
          >
            <SettingsLine className="w-5 h-5" />
          </IconButton>
        </div>
      </div>
      <div>
        <Typography level="p5" color="textSecondary">
          Total Value
        </Typography>
        <Typography level="h5" fontWeight="lg">
          $24,562,456
        </Typography>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button>Buy</Button>
        <Button variant="outline">Deposit</Button>
        <Button variant="outline">Withdraw</Button>
      </div>
      <div className="overflow-y-auto h-96">
        {!isLoading && !balances.length ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Bag className="w-14 h-14 text-neutral-500" />
            <Typography level="h7" color="textSecondary">
              No assets
            </Typography>
          </div>
        ) : (
          <Table
            isLoading={isLoading}
            data={balances}
            columns={[
              {
                header: 'Token',
                accessorKey: 'token',
                cell: Token,
                width: '40%',
              },
              {
                header: 'Price',
                accessorKey: 'token.price',
                accessorFn: (row) =>
                  mochiUtils.formatUsdDigit({
                    value: row.token?.price || 0,
                  }),
                width: '25%',
              },
              {
                header: 'Balance',
                accessorKey: 'amount',
                accessorFn: (row) =>
                  mochiUtils.formatTokenDigit(
                    utils.formatUnits(row.amount || 0, row.token?.decimal),
                  ),
                width: '35%',
                meta: {
                  align: 'right',
                },
              },
            ]}
          />
        )}
      </div>
      <div className="text-center">
        <Typography level="p6" color="textSecondary">
          Powered by Console Labs
        </Typography>
      </div>
    </Card>
  )
}
