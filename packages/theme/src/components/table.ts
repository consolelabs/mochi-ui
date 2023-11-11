import clsx from 'clsx'

const tableWrapperClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('p-2', className)

const tableClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-full border-collapse', className)

const tableHeaderClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'py-3 px-4 text-xs font-semibold tracking-tight text-left uppercase border-0 border-b border-gray-200 border-solid min-w-[48px] text-zinc-500',
    className,
  )

const tableDataLoadingClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'px-4 py-3 text-sm font-normal leading-tight border-0 border-b border-gray-200 border-solid rounded text-zinc-800',
    className,
  )

const tableDataSkeletonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx('bg-gray-200 animate-pulse h-[22px]', className)

const tableDataClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'py-3 px-4 text-sm font-normal leading-tight border-0 border-b border-gray-200 border-solid min-w-[48px] text-zinc-800',
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
