import clsx from 'clsx'

const popoverContentClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'z-50 bg-background-popup p-5 rounded-lg border border-divider shadow-md',

    'data-[state=open]:animate-in',
    'data-[state=open]:fade-in-50',
    'data-[state=open]:zoom-in-95',

    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',

    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=closed]:zoom-out-95',

    className,
  )

const popoverTriggerClsx = ({ className = '' }: { className?: string }) =>
  clsx('focus-visible:outline-none', className)

const popover = { popoverContentClsx, popoverTriggerClsx }

export { popover }
