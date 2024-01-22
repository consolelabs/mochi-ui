import clsx from 'clsx'

const tooltipClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'rounded-lg',
    'px-3',
    'py-2',
    'text-xs',
    'font-semibold',
    'bg-background-tooltip',
    'text-text-contrast',
    'tooltip',

    'data-[state=delayed-open]:animate-in',
    'data-[state=delayed-open]:fade-in-50',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:animate-out',

    'data-[side=left]:slide-in-from-right-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=bottom]:slide-in-from-top-2',
    className,
  )

const tooltipArrowClxs = 'fill-current text-background-tooltip'

const tooltipTriggerClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-fit', className)

const tooltip = { tooltipClsx, tooltipArrowClxs, tooltipTriggerClsx }

export { tooltip }
