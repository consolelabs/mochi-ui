import { Button, ColumnProps, Table, Typography } from '@mochi-ui/core'
import { format } from 'date-fns'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { Amount, PaylinkUrl } from './TableColumns'

const Action: ColumnProps<ModelPayRequest>['cell'] = () => (
  <Button color="success" size="sm">
    Claim
  </Button>
)

export const PaylinkSection = () => {
  const { me } = useProfileStore()
  const { data: requests = [] } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'sender',
    type: 'payme',
  })

  return (
    <div className="space-y-2">
      <div className="py-2">
        <Typography level="h7">Pay Link</Typography>
      </div>
      <Table
        border
        data={requests}
        columns={[
          {
            header: 'Wen',
            accessorKey: 'created_at',
            accessorFn: (row) => format(new Date(row.created_at ?? ''), 'Pp'),
          },
          {
            header: 'Url',
            accessorKey: 'url',
            cell: PaylinkUrl,
          },
          {
            header: 'Amount',
            accessorKey: 'amount',
            cell: Amount,
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
    </div>
  )
}
