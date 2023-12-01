import {
  Avatar,
  Button,
  ColumnProps,
  Table,
  Typography,
} from '@consolelabs/core'
import { AddUserSolid } from '@consolelabs/icons'
import { useFetchApplicationDetailMembers } from '~hooks/app/useFetchApplicationDetailMembers'
import { ViewApplicationMember } from '~types/mochi-pay-schema'
import { capitalizeFirstLetter } from '~utils/string'
import { formatDate } from '~utils/time'

interface Props {
  profileId?: string
  appId?: string
}

const Name: ColumnProps<ViewApplicationMember>['cell'] = (props) => (
  <div className="flex items-center space-x-3.5">
    <Avatar src={props.row.original.profile_metadata?.avatar || ''} />
    <Typography level="h8">
      {props.row.original.profile_metadata?.username}
    </Typography>
  </div>
)

export const AppDetailMembers = ({ profileId, appId }: Props) => {
  const { data: members = [], isLoading } = useFetchApplicationDetailMembers(
    profileId,
    appId,
  )

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between py-2">
        <Typography level="p4" className="font-medium">
          Members {members.length ? `(${members.length})` : ''}
        </Typography>
        <Button size="sm" color="white">
          <AddUserSolid className="w-4 h-4" />
          Invite
        </Button>
      </div>
      <Table
        wrapperClassName="!p-0 border rounded-lg border-divider shadow-input mt-4"
        className="-mb-1 min-w-[600px]"
        data={members}
        isLoading={isLoading}
        columns={[
          {
            header: 'Name',
            accessorKey: 'profile_metadata',
            cell: Name,
          },
          {
            header: 'Member since',
            accessorKey: 'created_at',
            accessorFn: (row) => formatDate(row.updated_at || ''),
            width: 240,
          },
          {
            header: 'Role',
            accessorKey: 'role',
            accessorFn: (row) => capitalizeFirstLetter(row.role || ''),
            width: 130,
          },
        ]}
      />
    </div>
  )
}
