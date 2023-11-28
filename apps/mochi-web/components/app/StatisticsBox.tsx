import { Typography } from '@consolelabs/core'
import { ArrowUpLine } from '@consolelabs/icons'
import clsx from 'clsx'
import { formatNumber } from '~utils/number'

interface Props {
  label: string
  amount?: number
  formatAmount?: (amount: number) => string
  change?: number
  formatChange?: (change: number) => string
  milestone?: 'week' | 'month'
  size?: 'md' | 'lg'
  footer?: React.ReactNode
  className?: string
}

export const StatisticsBox = ({
  label,
  amount = 0,
  formatAmount = formatNumber,
  change = 0,
  formatChange = (change) => `${Math.abs(change) * 100}%`,
  milestone = 'month',
  size = 'md',
  footer,
  className,
}: Props) => {
  return (
    <div
      className={clsx(
        'bg-neutral-0 rounded-xl',
        size === 'md' ? 'p-4 space-y-4' : 'p-6 space-y-2',
        className,
      )}
    >
      <Typography level="p5" color="textPrimary" className="font-medium">
        {label}
      </Typography>
      <Typography level={size === 'md' ? 'h5' : 'h4'} color="textPrimary">
        {formatAmount ? formatAmount(amount) : amount}
      </Typography>
      <div
        className={clsx('flex items-center space-x-1 flex-wrap', {
          invisible: !change,
        })}
      >
        <ArrowUpLine
          className={clsx(
            'w-4 h-4',
            change > 0 ? 'text-success-500' : 'text-danger-500 rotate-180',
          )}
        />
        <Typography
          level="p5"
          color={change > 0 ? 'success' : 'danger'}
          className="font-medium"
        >
          {formatChange(change)}
        </Typography>
        <Typography level="p5" color="textSecondary">
          vs last {milestone}
        </Typography>
      </div>
      {!!footer && <div>{footer}</div>}
    </div>
  )
}
