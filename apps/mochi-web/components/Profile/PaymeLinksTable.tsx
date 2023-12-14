import { ColumnProps, Switch, Table } from '@mochi-ui/core'
import { format } from 'date-fns'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { Amount, PaymeUrl } from './TableColumns'

const Action: ColumnProps<ModelPayRequest>['cell'] = () => <Switch />

export const PaymeLinksTable = () => {
  const { me } = useProfileStore()
  const { data: requests = [] } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'recipient',
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
          header: 'Wen',
          accessorKey: 'created_at',
          accessorFn: (row) => format(new Date(row.created_at ?? ''), 'Pp'),
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
