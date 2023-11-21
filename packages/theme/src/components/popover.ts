import clsx from 'clsx'

const popoverContentClsx = ({ className = '' }: { className?: string }) =>
  clsx(
    'z-50 bg-white p-2 rounded-lg border border-neutral-outline-hover shadow-md',
    className,
  )

const popover = { popoverContentClsx }

export { popover }
