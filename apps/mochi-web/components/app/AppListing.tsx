import {
  Avatar,
  Button,
  ColumnProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  Tooltip,
  Typography,
} from '@consolelabs/core'
import { ThreeDotLine, ArrowUpLine } from '@consolelabs/icons'
import { useClipboard } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import Link from 'next/link'
import { SOCIAL_LINKS } from '~constants'
import { platforms } from '~constants/app'
import { ROUTES } from '~constants/routes'
import { ViewApplication } from '~types/mochi-pay-schema'
import { formatDate } from '~utils/time'

interface Props {
  apps?: ViewApplication[]
  onOpenCreateAppModal: () => void
  isLoading?: boolean
  className?: string
}

const Name: ColumnProps<ViewApplication>['cell'] = (props) => (
  <div className="flex items-center space-x-3.5">
    <Avatar src={props.row.original.avatar || ''} />
    <Link href={ROUTES.APPLICATION_DETAIL(props.row.original.id)}>
      <Typography level="p5" className="font-bold">
        {props.row.original.name}
      </Typography>
    </Link>
  </div>
)

const Actions: ColumnProps<ViewApplication>['cell'] = (props) => {
  const { hasCopied, onCopy } = useClipboard(
    props.row.original.public_key || '',
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-center w-6 h-6 border rounded-full border-neutral-300">
        <ThreeDotLine width={15} height={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Tooltip
          arrow="top-center"
          content={
            <Typography level="p6" className="font-semibold">
              Copied to clipboard
            </Typography>
          }
          componentProps={{
            trigger: { className: 'w-full text-left' },
            root: { open: hasCopied },
          }}
        >
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault()
              onCopy()
            }}
          >
            Copy API key
          </DropdownMenuItem>
        </Tooltip>
        <DropdownMenuItem>Invite</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const AppListing = ({
  apps = [],
  onOpenCreateAppModal,
  isLoading,
  className,
}: Props) => {
  return (
    <div className={clsx('mt-8', className)}>
      <Typography level="h7" color="textPrimary">
        My Applications
      </Typography>
      {apps?.length || isLoading ? (
        <div className="max-w-full overflow-auto">
          <Table
            isLoading={isLoading}
            className="min-w-[650px]"
            columns={[
              {
                header: 'Name',
                accessorKey: 'name',
                cell: Name,
              },
              {
                header: 'Platforms',
                accessorKey: 'platforms',
                accessorFn: (row) =>
                  row.platforms
                    ?.map((p) => platforms.find(({ key }) => key === p)?.label)
                    .filter(Boolean)
                    .join(', '),
                width: '230px',
              },
              {
                header: 'Last Modified',
                accessorKey: 'updated_at',
                accessorFn: (row) => formatDate(row.updated_at || ''),
                width: '140px',
              },
              {
                header: '',
                accessorKey: 'action',
                cell: Actions,
                width: '50px',
              },
            ]}
            data={apps}
          />
        </div>
      ) : (
        <div>
          <Typography level="p5" color="textSecondary" className="flex gap-1">
            <Typography level="h8" color="textSecondary">
              You don’t have any applications yet.
            </Typography>
            Please{' '}
            <Button
              variant="link"
              className="!p-0 !h-auto"
              onClick={onOpenCreateAppModal}
            >
              Create an app
            </Button>{' '}
            to get started.
          </Typography>
          <Button
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={() => window.open(SOCIAL_LINKS.DOCS, '_blank')}
          >
            Read the docs
            <ArrowUpLine className="rotate-45" />
          </Button>
        </div>
      )}
    </div>
  )
}
