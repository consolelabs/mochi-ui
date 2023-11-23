import clsx from 'clsx'

const tooltipClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'rounded-lg',
    'px-3',
    'py-2',
    'text-xs',
    'font-semibold',
    'bg-background-tooltip',
    'text-text-primary',
    className,
  )

const tooltipArrowClxs = 'fill-neutral-0'

const tooltipTriggerClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-fit', className)

const tooltip = { tooltipClsx, tooltipArrowClxs, tooltipTriggerClsx }

export { tooltip }
