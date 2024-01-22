import clsx from 'clsx'

const modalOverlayClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'fixed inset-0 z-50 bg-background-backdrop/40',
    'data-[state=open]:animate-in',
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    className,
  )

const modalContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 bg-background-surface p-6 shadow-lg rounded-xl',
    'data-[state=open]:animate-in',
    'data-[state=open]:slide-in-from-left-1/2',
    'data-[state=open]:slide-in-from-top-1/2',
    'data-[state=open]:fade-in-0',
    'data-[state=open]:zoom-in-95',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:slide-out-to-left-1/2',
    'data-[state=closed]:slide-out-to-top-1/2',
    'data-[state=closed]:zoom-out-95',
    'data-[state=closed]:fade-out-0',
    className,
  )

const modalCloseButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    '!m-0 absolute translate-x-1/2 -translate-y-1/2 right-6 top-6 rounded-full border  focus:outline-none disabled:pointer-events-none w-6 h-6 flex items-center justify-center',
    'text-neutral-outline-fg',
    'border-neutral-outline-border',
    'hover:bg-neutral-outline-hover',
    'active:bg-neutral-outline-active',
    'disabled:text-neutral-outline-disable-fg disabled:border-neutral-outline-disable-border',
    'focus-visible:shadow-small',
    className,
  )

const modalTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-lg font-medium tracking-tight', className)

const modalDescriptionClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-sm', className)

const modalTriggerClsx = ({ className = '' }: { className?: string }) =>
  clsx('focus-visible:outline-none', className)

const modal = {
  modalOverlayClsx,
  modalContentClsx,
  modalCloseButtonClsx,
  modalTitleClsx,
  modalDescriptionClsx,
  modalTriggerClsx,
}

export { modal }
