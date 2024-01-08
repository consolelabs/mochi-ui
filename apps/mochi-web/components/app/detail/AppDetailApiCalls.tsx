import {
  Badge,
  Button,
  ColumnProps,
  IconButton,
  Table,
  Typography,
} from '@mochi-ui/core'
import { ChevronRightLine } from '@mochi-ui/icons'
import clsx from 'clsx'
import { useFetchApplicationDetailWebhookLogs } from '~hooks/app/useFetchApplicationDetailWebhookLogs'
import { ViewApplicationWebhookLog } from '~types/mochi-pay-schema'
import { capitalizeFirstLetter } from '~utils/string'
import { formatDate } from '~utils/time'

interface Props {
  profileId?: string
  appId?: string
}

const Expander: ColumnProps<ViewApplicationWebhookLog>['cell'] = (props) =>
  props.row.getCanExpand() ? (
    <IconButton
      onClick={props.row.getToggleExpandedHandler()}
      variant="link"
      color="white"
      className="w-6 !h-6 flex justify-center items-center"
      label={props.row.getIsExpanded() ? 'Collapse' : 'Expand'}
    >
      <ChevronRightLine
        className={clsx('w-4 h-4 transition-all', {
          'rotate-90': props.row.getIsExpanded(),
        })}
      />
    </IconButton>
  ) : null

const Call: ColumnProps<ViewApplicationWebhookLog>['cell'] = (props) => (
  <Button variant="link" className="!font-normal !px-0" asChild>
    <a href={props.row.original.url} target="_blank">
      {props.row.original.url}
    </a>
  </Button>
)

const Status: ColumnProps<ViewApplicationWebhookLog>['cell'] = (props) => (
  <Badge
    className="w-fit"
    appearance={props.row.original.status === 'passed' ? 'success' : 'danger'}
  >
    {capitalizeFirstLetter(props.row.original.status || '')}
  </Badge>
)

export const AppDetailApiCalls = ({ profileId, appId }: Props) => {
  const { data: webhookLogs = [], isLoading } =
    useFetchApplicationDetailWebhookLogs(profileId, appId)

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between py-2 mb-4">
        <Typography level="p4" className="font-medium">
          API Calls
        </Typography>
      </div>
      <Table
        border
        className="min-w-[600px]"
        data={webhookLogs}
        isLoading={isLoading}
        columns={[
          {
            id: 'expander',
            header: () => null,
            width: 56,
            cell: Expander,
          },
          {
            header: 'Call',
            accessorKey: 'url',
            cell: Call,
          },
          {
            header: 'Timestamp',
            accessorKey: 'timestamp',
            accessorFn: (row) =>
              formatDate(row.timestamp || '', 'HH:mm:ss MM/dd/yyyy'),
            width: 200,
          },
          {
            header: 'Status',
            accessorKey: 'status',
            cell: Status,
            width: 130,
          },
        ]}
        getRowCanExpand={() => true}
        renderSubComponent={(record) => (
          <div className="p-4 overflow-x-auto bg-background-level2 pl-18">
            <Typography level="h9">Request</Typography>
            <pre className="text-sm">
              {JSON.stringify(JSON.parse(record.request || '{}'), null, 2)}
            </pre>
            <Typography level="h9" className="mt-4">
              Response
            </Typography>
            <pre className="text-sm">
              {JSON.stringify(JSON.parse(record.response || '{}'), null, 2)}
            </pre>
          </div>
        )}
      />
    </div>
  )
}
