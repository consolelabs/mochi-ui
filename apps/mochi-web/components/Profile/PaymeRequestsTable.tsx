import { Avatar, Button, ColumnProps, Table, Typography } from '@mochi-ui/core'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { truncate } from '@dwarvesf/react-utils'
import { Amount, PaymeUrl } from './TableColumns'

// FIXME: get data from API
const Sender: ColumnProps<ModelPayRequest>['cell'] = () => (
  <div className="flex items-center space-x-3.5">
    <Avatar size="base" smallSrc="/logo.png" src="" />
    <div>
      <Typography level="h8">
        {truncate('0xd23464565465464dx', 8, true)}
      </Typography>
      <Typography level="p6" color="textSecondary">
        Telegram
      </Typography>
    </div>
  </div>
)

const Action: ColumnProps<ModelPayRequest>['cell'] = (props) => (
  <Button
    size="sm"
    as="a"
    href={`https://mochi.gg/receive/${props.row.original.code}`}
    target="_blank"
  >
    Pay
  </Button>
)

export const PaymeRequestsTable = () => {
  const { me } = useProfileStore()
  const { data: requests = [], isLoading } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'sender',
    type: 'payme',
  })

  return (
    <Table
      border
      wrapperClassName="rounded-t-none border-t-0 max-w-full overflow-auto"
      className="min-w-max"
      isLoading={isLoading || !me?.id}
      data={requests}
      columns={[
        {
          header: 'Request ID',
          accessorKey: 'code',
          accessorFn: (row) => truncate(row.code || '', 6),
        },
        {
          header: 'Sender',
          accessorKey: 'sender',
          cell: Sender,
        },
        {
          header: 'Amount',
          accessorKey: 'amount',
          cell: Amount,
        },
        {
          header: 'Url',
          accessorKey: 'url',
          cell: PaymeUrl,
        },
        {
          header: 'Message',
          accessorKey: 'note',
        },
        {
          header: '',
          accessorKey: 'action',
          cell: Action,
        },
      ]}
      emptyContent={
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Typography level="h7">No requests</Typography>
          <Typography level="p4" color="textSecondary">
            You do not have any requests yet
          </Typography>
        </div>
      }
    />
  )
}
