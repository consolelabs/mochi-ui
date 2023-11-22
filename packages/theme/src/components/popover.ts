import clsx from 'clsx'

const popoverContentClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'z-50 bg-white p-2 rounded-lg border border-neutral-200 shadow-md',
    className,
  )

const popoverTriggerClsx = ({ className = '' }: { className?: string }) =>
  clsx('focus-visible:outline-none', className)

const popover = { popoverContentClsx, popoverTriggerClsx }

export { popover }
