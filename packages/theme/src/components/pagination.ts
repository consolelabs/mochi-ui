import clsx from 'clsx'

const paginationButtonClsx = ({
  className = '',
  active,
}: { className?: string; active?: boolean } = {}) =>
  clsx(
    'min-w-[24px] h-6 py-1 px-2 rounded-full flex-col justify-center items-center inline-flex border-none cursor-pointer',
    {
      'hover:bg-neutral-plain-hover text-text-primary': !active,
      'bg-neutral-solid text-neutral-solid-fg': active,
    },
    className,
  )

const paginationButtonLabelClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('text-sm font-medium leading-tight select-none', className)

const paginationEllipsisButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('w-6 h-6 bg-transparent border-none', className)

const paginationWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex items-center justify-between w-full sm:space-x-6', className)

const paginationAmountPerPageWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('hidden sm:inline-flex justify-start items-center space-x-2', className)

const paginationPageNavigateButtonGroupClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('hidden sm:flex justify-center items-center space-x-2', className)

const paginationNavigationClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex-1 flex justify-center sm:justify-end items-center space-x-2',
    className,
  )

const paginationNavigationButtonClsx = ({
  className = '',
  disabled = false,
}: { className?: string; disabled?: boolean } = {}) =>
  clsx(
    'inline-flex gap-2 justify-center items-center py-1 px-1.5 w-8 h-8 rounded border-none',
    {
      'cursor-not-allowed': disabled,
      'cursor-pointer hover:bg-neutral-plain-hover': !disabled,
    },
    className,
  )

const paginationNavigationIconClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('w-4 h-4 text-text-secondary', className)

const paginationMobilePageNumerClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('flex-1 sm:hidden flex items-center justify-center', className)

const pagination = {
  paginationButtonClsx,
  paginationButtonLabelClsx,
  paginationEllipsisButtonClsx,
  paginationWrapperClsx,
  paginationAmountPerPageWrapperClsx,
  paginationNavigationClsx,
  paginationNavigationButtonClsx,
  paginationNavigationIconClsx,
  paginationPageNavigateButtonGroupClsx,
  paginationMobilePageNumerClsx,
}

export { pagination }
