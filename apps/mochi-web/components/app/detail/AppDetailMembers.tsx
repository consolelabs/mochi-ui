import { Avatar, Button, ColumnProps, Table, Typography } from '@mochi-ui/core'
import { AddUserSolid } from '@mochi-ui/icons'
import { useFetchApplicationDetailMembers } from '~hooks/app/useFetchApplicationDetailMembers'
import { ViewApplicationMember } from '~types/mochi-pay-schema'
import { capitalizeFirstLetter } from '~utils/string'
import { formatDate } from '~utils/time'

interface Props {
  profileId?: string
  appId?: string
}

const Name: ColumnProps<ViewApplicationMember>['cell'] = (props) => {
  const { profile } = props.row.original
  const name = (profile?.associated_accounts || []).find(
    (a) => a.platform_metadata?.username,
  )?.platform_metadata?.username
  const avatarSrc = profile?.avatar

  return (
    <div className="flex items-center space-x-3.5">
      <Avatar src={avatarSrc || ''} />
      <Typography level="h8">{name}</Typography>
    </div>
  )
}

export const AppDetailMembers = ({ profileId, appId }: Props) => {
  const { data: members = [], isLoading } = useFetchApplicationDetailMembers(
    profileId,
    appId,
  )

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center py-2 mb-4">
        <Typography level="p2" fontWeight="lg">
          Members {members.length ? `(${members.length})` : ''}
        </Typography>
        <Button size="sm" color="neutral" variant="outline" disabled>
          <AddUserSolid className="w-4 h-4" />
          Invite
        </Button>
      </div>
      <Table
        border
        className="min-w-[600px]"
        data={members}
        isLoading={isLoading}
        cellClassName={() => 'px-4'}
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
