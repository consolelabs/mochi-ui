import clsx from 'clsx'

const modalOverlayClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('fixed inset-0 z-50 bg-background-backdrop/40', className)

const modalContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 bg-background-surface p-6 shadow-lg duration-200 rounded-xl',
    className,
  )

const modalCloseButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    '!m-0 absolute translate-x-1/2 -translate-y-1/2 right-6 top-6 rounded-full border border-neutral-outline-border opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none w-6 h-6 flex items-center justify-center',
    className,
  )

const modalTitleClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-lg font-medium tracking-tight', className)

const modalDescriptionClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('text-sm', className)

const modal = {
  modalOverlayClsx,
  modalContentClsx,
  modalCloseButtonClsx,
  modalTitleClsx,
  modalDescriptionClsx,
}

export { modal }
