import { useDisclosure } from '@dwarvesf/react-hooks'
import {
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  Skeleton,
  Typography,
} from '@mochi-ui/core'
import { ThreeDotLine } from '@mochi-ui/icons'
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
}

export const ROW_HEIGHT = 67

const Row = ({
  id,
  time,
  isSkeleton = false,
  isNew,
  action,
  children,
  refresh,
}: RowProps) => {
  const { profile } = useLoginWidget()
  const { isOpen, onClose, onToggle } = useDisclosure()
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
      <Popover open={isOpen} onOpenChange={onToggle}>
        <PopoverTrigger asChild>
          <IconButton
            disabled={isSkeleton}
            label=""
            variant="link"
            className={clsx('relative z-50 my-auto', {
              invisible: isSkeleton,
            })}
          >
            <ThreeDotLine className="w-4 h-4 rotate-90 text-text-icon-secondary" />
          </IconButton>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent className="flex flex-col items-stretch !p-3">
            <Button
              type="button"
              color="neutral"
              variant="ghost"
              className="!justify-start"
              onClick={() => {
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
              Mark as read
            </Button>
            <Button
              type="button"
              color="neutral"
              variant="ghost"
              className="!justify-start"
              onClick={onClose}
            >
              Hide this notification
            </Button>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </button>
  )
}

export default Row
