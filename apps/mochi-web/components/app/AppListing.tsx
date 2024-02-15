import {
  Avatar,
  Button,
  ColumnProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Table,
  Tooltip,
  Typography,
} from '@mochi-ui/core'
import { ThreeDotLine, ArrowUpLine } from '@mochi-ui/icons'
import { useClipboard } from '@dwarvesf/react-hooks'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { SOCIAL_LINKS } from '~constants'
import { platforms } from '~constants/app'
import { ROUTES } from '~constants/routes'
import { ViewApplication } from '~types/mochi-pay-schema'
import { formatDate } from '~utils/time'
import { useState } from 'react'
import { DeleteAppModal } from './DeleteAppModal'

interface SelectedApp {
  app: ViewApplication
  action: 'delete' | 'invite'
}

interface ActionsColumnMeta {
  setSelectedApp: (props: SelectedApp) => void
}

interface Props {
  apps?: ViewApplication[]
  onOpenCreateAppModal: () => void
  isLoading?: boolean
  className?: string
  refresh: () => void
}

const Name: ColumnProps<ViewApplication>['cell'] = (props) => (
  <div className="flex items-center space-x-3.5">
    <Avatar src={props.row.original.avatar || ''} />
    <Typography level="p5" fontWeight="lg">
      {props.row.original.name}
    </Typography>
  </div>
)

const Actions: ColumnProps<ViewApplication>['cell'] = (props) => {
  const app = props.row.original
  const { hasCopied, onCopy } = useClipboard(app.public_key || '')
  const { setSelectedApp } =
    (props.column.columnDef.meta as ActionsColumnMeta) || {}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="flex justify-center items-center w-6 h-6 rounded-full border border-neutral-300"
      >
        <ThreeDotLine width={15} height={15} />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          align="end"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
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
          <DropdownMenuItem
            onClick={() => setSelectedApp({ app, action: 'delete' })}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export const AppListing = ({
  apps = [],
  onOpenCreateAppModal,
  isLoading,
  className,
  refresh,
}: Props) => {
  const { push } = useRouter()
  const [selectedApp, setSelectedApp] = useState<SelectedApp | null>(null)

  const actionsColumnMeta: ActionsColumnMeta = {
    setSelectedApp,
  }

  return (
    <div className={clsx('mt-8', className)}>
      <Typography level="p2" fontWeight="lg" color="textPrimary">
        My Applications
      </Typography>
      {apps?.length || isLoading ? (
        <div className="overflow-auto max-w-full">
          <Table
            onRow={(record) => ({
              onClick: () => {
                push(ROUTES.APPLICATION_DETAIL.getPath(record.id))
              },
            })}
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
                meta: actionsColumnMeta,
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
      <DeleteAppModal
        app={selectedApp?.app}
        open={!!selectedApp?.app && selectedApp.action === 'delete'}
        onOpenChange={() => setSelectedApp(null)}
        onSucess={refresh}
      />
    </div>
  )
}
