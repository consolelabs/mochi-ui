import { useDisclosure } from '@dwarvesf/react-hooks'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
  IconButton,
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  Skeleton,
  Typography,
} from '@mochi-ui/core'
import { CheckCircleOutlined, GearLine, ThreeDotLine } from '@mochi-ui/icons'
import { useLoginWidget } from '@mochi-web3/login-widget'
import clsx from 'clsx'
import { api } from '~constants/mochi'
import {
  TransactionActionType,
  transactionActionIcon,
  transactionActionString,
  transactionActionTextColor,
} from '~constants/transactions'
import { NotificationRow } from './util'

export interface CommonProps extends NotificationRow {
  refresh: any
}

interface RowProps extends Pick<CommonProps, 'refresh'> {
  id: number
  action: TransactionActionType
  time: string
  children?: React.ReactNode
  isSkeleton?: boolean
  isNew?: boolean
  url?: string
}

export const ROW_HEIGHT = 67

const RowMenu = ({
  id,
  refresh,
  onClose,
}: {
  id: number
  refresh: () => void
  onClose: () => void
}) => {
  const { profile } = useLoginWidget()

  return (
    <>
      <Button
        type="button"
        color="neutral"
        variant="ghost"
        className="!justify-start h-[52px] lg:h-11 !font-medium !text-base lg:!text-sm"
        onClick={(e) => {
          e.preventDefault()
          if (!profile?.id) return
          api.profile.activities
            .markRead({
              profileId: profile.id,
              ids: [id],
            })
            .finally(() => {
              refresh()
              onClose()
            })
        }}
      >
        <CheckCircleOutlined className="w-6 h-6 lg:hidden" />
        Mark as read
      </Button>
      <Button
        type="button"
        color="neutral"
        variant="ghost"
        className="!justify-start h-[52px] lg:h-11 !font-medium !text-base lg:!text-sm"
        onClick={(e) => {
          e.preventDefault()
          onClose()
        }}
      >
        <GearLine className="w-6 h-6 lg:hidden" />
        Hide this notification
      </Button>
    </>
  )
}

const Row = ({
  id,
  time,
  isSkeleton = false,
  isNew,
  action,
  children,
  refresh,
  url,
}: RowProps) => {
  const { profile } = useLoginWidget()
  const {
    isOpen: isOpenPopover,
    onClose: onClosePopover,
    onToggle: onTogglePopover,
  } = useDisclosure()
  const {
    isOpen: isOpenDrawer,
    onClose: onCloseDrawer,
    onToggle: onToggleDrawer,
  } = useDisclosure()
  const Icon = transactionActionIcon[action] ?? (() => null)
  const random = Math.random()

  return (
    <button
      className={clsx(
        'flex gap-x-2 justify-between py-3 px-4 w-full transition outline-none',
        {
          'bg-primary-50': isNew,
        },
      )}
      type="button"
      style={{ maxHeight: ROW_HEIGHT }}
      disabled={isSkeleton}
      onClick={(e) => {
        if (e.defaultPrevented) return
        if (!url || !profile?.id) return
        api.profile.activities
          .markRead({
            profileId: profile.id,
            ids: [id],
          })
          .finally(refresh)
        window.open(url)
      }}
    >
      <div className="flex overflow-hidden relative flex-col flex-1 gap-y-1 min-w-0">
        {isSkeleton ? (
          <Skeleton
            className={clsx('h-4 rounded', {
              'w-10': random > 0,
              'w-16': random >= 0.3,
              'w-24': random >= 0.5,
            })}
          />
        ) : (
          <div className="flex gap-x-2 items-center">
            <div
              className={clsx(
                'flex gap-x-1 items-center',
                transactionActionTextColor[action],
              )}
            >
              <Icon className="w-3.5 h-3.5 opacity-70" />
              <Typography
                className={clsx(transactionActionTextColor[action])}
                level="h9"
                fontWeight="lg"
              >
                {transactionActionString[action]}
              </Typography>
            </div>
            <Typography
              className="!text-neutral-600"
              level="h9"
              fontWeight="sm"
            >
              {time}
            </Typography>
          </div>
        )}
        {isSkeleton ? (
          <Skeleton
            className={clsx('h-6 rounded', {
              'w-1/3': random > 0,
              'w-2/3': random >= 0.3,
              'w-10/12': random >= 0.5,
            })}
          />
        ) : (
          children
        )}
        <div
          className={clsx(
            'opacity-100 transition bottom-0 right-0 absolute w-[10%] h-6 bg-gradient-to-l pointer-events-none z-10',
            {
              'from-primary-50': isNew,
              'from-white-pure': !isNew,
            },
          )}
        />
      </div>
      <Popover open={isOpenPopover} onOpenChange={onTogglePopover}>
        <PopoverTrigger asChild>
          <IconButton
            disabled={isSkeleton}
            label=""
            variant="link"
            className={clsx('relative z-50 my-auto hidden lg:block', {
              invisible: isSkeleton,
            })}
            onClick={(e) => {
              e.preventDefault()
              onTogglePopover()
            }}
          >
            <ThreeDotLine className="w-4 h-4 rotate-90 text-text-icon-secondary" />
          </IconButton>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent className="flex flex-col items-stretch !p-3">
            <RowMenu {...{ id, refresh }} onClose={onClosePopover} />
          </PopoverContent>
        </PopoverPortal>
      </Popover>
      <Drawer open={isOpenDrawer} onOpenChange={onToggleDrawer} anchor="bottom">
        <DrawerTrigger asChild>
          <IconButton
            disabled={isSkeleton}
            label=""
            variant="link"
            className={clsx('relative z-50 my-auto lg:hidden', {
              invisible: isSkeleton,
            })}
            onClick={(e) => {
              e.preventDefault()
              onToggleDrawer()
            }}
          >
            <ThreeDotLine className="w-4 h-4 rotate-90 text-text-icon-secondary" />
          </IconButton>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay onClick={(e) => e.preventDefault()} />
          <DrawerContent className="flex flex-col p-4 space-y-4 rounded-t-lg">
            <RowMenu {...{ id, refresh }} onClose={onCloseDrawer} />
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </button>
  )
}

export default Row
