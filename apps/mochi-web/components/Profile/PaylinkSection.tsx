import { Badge, Button, ColumnProps, Table, Typography } from '@mochi-ui/core'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { formatDate } from '~utils/time'
import { Amount, PaylinkUrl } from './TableColumns'

const Action: ColumnProps<ModelPayRequest>['cell'] = (props) =>
  props.row.original.claim_tx ? (
    <Badge appearance="black">Claimed</Badge>
  ) : (
    <Button color="success" size="sm" asChild>
      <a
        href={`https://mochi.gg/pay/${props.row.original.code}`}
        target="_blank"
      >
        Claim
      </a>
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
      <Typography level="h7" className="py-2">
        Pay Link
      </Typography>
      <Table
        border
        wrapperClassName="max-w-full overflow-auto"
        className="min-w-max"
        isLoading={isLoading || !me?.id}
        data={requests}
        columns={[
          {
            header: 'Wen',
            accessorKey: 'created_at',
            accessorFn: (row) =>
              row.created_at
                ? formatDate(row.created_at, 'dd/MM/yyyy hh:mma')
                : null,
            width: 180,
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
            meta: { align: 'right' },
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
