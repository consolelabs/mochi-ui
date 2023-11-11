import clsx from 'clsx'

const paginationButtonClsx = ({
  className = '',
  active,
}: { className?: string; active?: boolean } = {}) =>
  clsx(
    'w-6 h-6 py-1 px-2.5 rounded-full flex-col justify-center items-center inline-flex border-none cursor-pointer text-neutral-800',
    {
      'hover:bg-stone-100': !active,
      'bg-neutral-800 text-white': active,
    },
    className,
  )

const paginationButtonLabelClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('text-sm font-medium leading-tight', className)

const paginationEllipsisButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('w-6 h-6 bg-transparent border-none', className)

const paginationWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex items-center justify-between w-full space-x-6', className)

const paginationAmountPerPageWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('inline-flex justify-start items-center space-x-2', className)

const paginationAmountPerPageSelectClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'py-2 px-3 text-sm font-medium leading-tight rounded text-neutral-800 bg-stone-50',
    className,
  )

const paginationNavigationClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('inline-flex justify-center items-center space-x-2', className)

const paginationNavigationButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'inline-flex gap-2 justify-center items-center py-1 px-1.5 w-8 h-8 rounded border-none cursor-pointer hover:bg-stone-100',
    className,
  )

const paginationNavigationIconClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-4 h-4 text-stone-500', className)

const pagination = {
  paginationButtonClsx,
  paginationButtonLabelClsx,
  paginationEllipsisButtonClsx,
  paginationWrapperClsx,
  paginationAmountPerPageWrapperClsx,
  paginationAmountPerPageSelectClsx,
  paginationNavigationClsx,
  paginationNavigationButtonClsx,
  paginationNavigationIconClsx,
}

export { pagination }
