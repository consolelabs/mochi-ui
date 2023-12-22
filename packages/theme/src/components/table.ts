import clsx from 'clsx'

const tableWrapperClsx = ({
  className = '',
  border,
}: { className?: string; border?: boolean } = {}) =>
  clsx(
    'overflow-y-auto',
    border ? 'rounded-lg border border-divider shadow-input' : 'p-2',
    className,
  )

const tableClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-full border-collapse', className)

const tableRowClsx = ({
  clickable = false,
  className = '',
}: { className?: string; clickable?: boolean } = {}) =>
  clsx(
    'group',
    {
      'cursor-pointer transition duration-150 bg-transparent hover:bg-background-level2':
        clickable,
    },
    className,
  )

const tableHeaderClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'py-3 px-4 text-xxs font-semibold tracking-tight uppercase border-0 border-b border-neutral-outline-active border-solid min-w-[48px] text-text-secondary',
    className,
  )

const tableDataLoadingClsx = ({
  className = '',
  border,
  hideLastBorder,
}: { className?: string; border?: boolean; hideLastBorder?: boolean } = {}) =>
  clsx(
    'px-4 py-3 text-sm font-normal leading-tight border-0 border-b border-neutral-outline-active border-solid rounded text-text-primary',
    { 'group-last:border-b-0': hideLastBorder || border },
    className,
  )

const tableDataSkeletonClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-full h-[22px] rounded-md', className)

const tableDataClsx = ({
  className = '',
  border,
  hideLastBorder,
}: { className?: string; border?: boolean; hideLastBorder?: boolean } = {}) =>
  clsx(
    'py-3 px-4 text-sm font-normal leading-tight border-0 border-b border-neutral-outline-active border-solid min-w-[48px] text-text-primary',
    { 'group-last:border-b-0': hideLastBorder || border },
    className,
  )

const tablesExpandedDataClsx = ({
  className = '',
  border,
  hideLastBorder,
}: { className?: string; border?: boolean; hideLastBorder?: boolean } = {}) =>
  clsx(
    'border-0 border-b border-b-neutral-outline-active',
    { 'group-last:border-b-0': hideLastBorder || border },
    className,
  )

const table = {
  tableWrapperClsx,
  tableClsx,
  tableRowClsx,
  tableHeaderClsx,
  tableDataLoadingClsx,
  tableDataSkeletonClsx,
  tableDataClsx,
  tablesExpandedDataClsx,
}

export { table }
