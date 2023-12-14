import { Badge, Button, ColumnProps, Table, Typography } from '@mochi-ui/core'
import { format } from 'date-fns'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { Amount, PaylinkUrl } from './TableColumns'

const Action: ColumnProps<ModelPayRequest>['cell'] = (props) =>
  props.row.original.claim_tx ? (
    <Badge appearance="black" label="Claimed" />
  ) : (
    <Button color="success" size="sm">
      Claim
    </Button>
  )

export const PaylinkSection = () => {
  const { me } = useProfileStore()
  const { data: requests = [], isLoading } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'sender',
    type: 'paylink',
  })

  return (
    <div className="space-y-2">
      <div className="py-2">
        <Typography level="h7">Pay Link</Typography>
      </div>
      <Table
        border
        isLoading={isLoading || !me?.id}
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
        emptyContent={
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Typography level="h7">No requests</Typography>
            <Typography level="p4" color="textSecondary">
              You do not have any requests yet
            </Typography>
          </div>
        }
      />
    </div>
  )
}
