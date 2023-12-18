import { ColumnProps, Switch, Table, Typography, toast } from '@mochi-ui/core'
import { useFetchPayRequests } from '~hooks/profile/useFetchPayRequests'
import { useProfileStore } from '~store'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { formatDate } from '~utils/time'
import { API, GET_PATHS } from '~constants/api'
import { useState } from 'react'
import { Amount, PaymeUrl } from './TableColumns'

const Action: ColumnProps<ModelPayRequest>['cell'] = (props) => {
  const { profile_id, code, active } = props.row.original
  const [isLoading, setIsLoading] = useState(false)

  const onToggleRequest = (checked: boolean) => {
    if (!profile_id || !code) return
    setIsLoading(true)
    return API.MOCHI_PAY.put(
      undefined,
      checked
        ? GET_PATHS.ENABLE_PAYMENT_REQUEST(profile_id, code)
        : GET_PATHS.DISABLE_PAYMENT_REQUEST(profile_id, code),
    )
      .json()
      .catch((e) => {
        const err = JSON.parse(e.message)
        toast({
          description: err.msg,
          scheme: 'danger',
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Switch
      disabled={isLoading}
      defaultChecked={active}
      onCheckedChange={onToggleRequest}
    />
  )
}

export const PaymeLinksTable = () => {
  const { me } = useProfileStore()
  const { data: requests = [], isLoading } = useFetchPayRequests({
    profile_id: me?.id,
    entity: 'recipient',
    type: 'payme',
    statuses: 'submitted,claimed',
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
          accessorFn: (row) => row.code?.slice(0, 5),
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
          accessorFn: (row) =>
            row.created_at
              ? formatDate(row.created_at, 'dd/MM/yyyy hh:mma')
              : null,
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
  )
}
