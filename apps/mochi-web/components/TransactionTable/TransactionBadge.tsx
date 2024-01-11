import clsx from 'clsx'
import { Badge } from '@mochi-ui/core'
import {
  transactionActionString,
  transactionActionIcon,
  transactionActionColor,
  TransactionActionType,
} from '~constants/transactions'

interface Props {
  action: TransactionActionType
}

export const TransactionBadge = ({ action }: Props) => {
  const Icon = transactionActionIcon[action] ?? (() => null)

  return (
    <Badge className={clsx('inline-flex', transactionActionColor[action])}>
      <Icon className="w-3 h-3" />
      {transactionActionString[action] ?? 'tip'}
    </Badge>
  )
}
