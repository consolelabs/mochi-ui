import clsx from 'clsx'
import { Badge } from '@mochi-ui/core'
import {
  transactionActionString,
  transactionActionIcon,
  transactionActionColor,
  TransactionActionType,
  transactionActionAppearance,
} from '~constants/transactions'

interface Props {
  action: TransactionActionType
}

export const TransactionBadge = ({ action }: Props) => {
  const Icon = transactionActionIcon[action] ?? (() => null)

  return (
    <Badge
      appearance={transactionActionAppearance[action] as any}
      className={clsx('inline-flex border', transactionActionColor[action])}
    >
      <Icon className="w-3 h-3" />
      {transactionActionString[action] ?? 'tip'}
    </Badge>
  )
}