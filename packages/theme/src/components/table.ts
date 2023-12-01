import clsx from 'clsx'

const tableWrapperClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('p-2 overflow-x-auto', className)

const tableClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-full border-collapse', className)

const tableHeaderClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'py-3 px-4 text-xs font-semibold tracking-tight text-left uppercase border-0 border-b border-neutral-outline-active border-solid min-w-[48px] text-text-secondary',
    className,
  )

const tableDataLoadingClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'px-4 py-3 text-sm font-normal leading-tight border-0 border-b border-neutral-outline-active border-solid rounded text-text-primary',
    className,
  )

const tableDataSkeletonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('bg-neutral-outline-active animate-pulse h-[22px]', className)

const tableDataClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'py-3 px-4 text-sm font-normal leading-tight border-0 border-b border-neutral-outline-active border-solid min-w-[48px] text-text-primary',
    className,
  )

const table = {
  tableWrapperClsx,
  tableClsx,
  tableHeaderClsx,
  tableDataLoadingClsx,
  tableDataSkeletonClsx,
  tableDataClsx,
}

export { table }
