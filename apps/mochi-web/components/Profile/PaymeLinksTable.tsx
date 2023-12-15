import { ColumnProps, Switch, Table, Typography } from '@mochi-ui/core'
import { format } from 'date-fns'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { truncate } from '@dwarvesf/react-utils'
import { Amount, PaymeUrl } from './TableColumns'

const Action: ColumnProps<ModelPayRequest>['cell'] = () => <Switch />

export const PaymeLinksTable = () => {
  const { me } = useProfileStore()
  const { data: requests = [], isLoading } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'recipient',
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
