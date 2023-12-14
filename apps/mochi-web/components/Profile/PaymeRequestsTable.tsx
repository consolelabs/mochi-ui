import { Button, ColumnProps, Table } from '@mochi-ui/core'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { Amount, PaymeUrl } from './TableColumns'

const Action: ColumnProps<ModelPayRequest>['cell'] = () => (
  <Button size="sm">Pay</Button>
)

export const PaymeRequestsTable = () => {
  const { me } = useProfileStore()
  const { data: requests = [] } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'sender',
    type: 'payme',
  })

  return (
    <Table
      border
      wrapperClassName="rounded-t-none border-t-0"
      data={requests}
      columns={[
        {
          header: 'Request ID',
          accessorKey: 'code',
        },
        {
          header: 'Sender',
          accessorKey: 'sender',
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
    />
  )
}
