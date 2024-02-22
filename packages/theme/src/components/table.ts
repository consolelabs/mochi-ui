import clsx from 'clsx'

const tableWrapperClsx = ({
  className = '',
  border,
}: { className?: string; border?: boolean } = {}) =>
  clsx(
    'overflow-y-auto',
    border ? 'rounded-lg border border-divider shadow-input' : '',
    className,
  )

const tableClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('w-full border-collapse relative', className)

const tableRowClsx = ({
  clickable = false,
  className = '',
}: { className?: string; clickable?: boolean } = {}) =>
  clsx(
    'group',
    {
      'cursor-pointer transition duration-150 bg-transparent hover:bg-background-hover':
        clickable,
    },
    className,
  )

const tableHeaderClsx = ({
  className = '',
  stickyHeader,
  size,
}: { className?: string; stickyHeader?: boolean; size?: 'sm' | 'md' } = {}) =>
  clsx(
    'relative z-20 whitespace-nowrap py-3 text-xxs font-semibold tracking-tight uppercase min-w-[48px] text-text-tertiary',
    stickyHeader
      ? 'sticky top-0 bg-background-surface after:z-[-1] after:absolute after:inset-0 after:h-full after:w-full after:border-b after:border-divider'
      : 'border-b border-divider',
    {
      'px-2': size === 'sm',
      'px-4': size === 'md',
    },
    className,
  )

const tableHeaderContainerClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('relative', className)

const tableDataLoadingClsx = ({
  className = '',
  border,
  hideLastBorder,
  size,
}: {
  className?: string
  border?: boolean
  hideLastBorder?: boolean
  size?: 'sm' | 'md'
} = {}) =>
  clsx(
    'text-sm font-normal leading-tight border-0 border-b border-divider border-solid rounded text-text-primary',
    { 'group-last:border-b-0': hideLastBorder || border },
    {
      'px-2 py-2 h-14': size === 'sm',
      'px-4 py-3 h-[72px]': size === 'md',
    },
    className,
  )

const tableDataSkeletonClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('w-full h-[22px] rounded-md', className)

const tableDataClsx = ({
  className = '',
  border,
  hideLastBorder,
  size,
}: {
  className?: string
  border?: boolean
  hideLastBorder?: boolean
  size?: 'sm' | 'md'
} = {}) =>
  clsx(
    'px-2 overflow-hidden text-sm font-normal leading-tight border-0 border-b border-divider border-solid min-w-[48px] text-text-primary',
    { 'group-last:border-b-0': hideLastBorder || border },
    {
      'py-2 h-14': size === 'sm',
      'py-3 h-[72px]': size === 'md',
    },
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
  tableHeaderContainerClsx,
  tableDataLoadingClsx,
  tableDataSkeletonClsx,
  tableDataClsx,
  tablesExpandedDataClsx,
}

export { table }
