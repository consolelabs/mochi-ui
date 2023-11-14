import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const sidebarCva = cva(
  ['group bg-white relative h-full border-r border-neutral-200 transition-all'],
  {
    variants: {
      expanded: {
        true: 'w-fit min-w-64 max-w-xs',
        false: 'w-18',
      },
    },
  },
)

const sidebarContentClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx(
    'flex flex-col justify-between h-full overflow-x-hidden overflow-y-auto',
    className,
  )

const sidebarItemsWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('pt-2', className)

const sidebarFooterItemsWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('border-t border-neutral-200', className)

const sidebarFooterVersionWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('flex px-4 border-t border-neutral-200', className)

const sidebarFooterVersionTextClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('text-xs text-neutral-600 tracking-tight p-2', className)

const sidebarToggleButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'absolute top-4 -right-5 bg-white border border-neutral-200 rounded-r-lg w-5 h-11 justify-center items-center hidden group-hover:flex',
    className,
  )

const sidebarToggleArrowClsx = ({
  className = '',
  expanded,
}: {
  className?: string
  expanded?: boolean
}) => clsx('text-neutral-800', { 'rotate-180': expanded }, className)

const sidebarItemIconClsx = ({
  className = '',
  selected,
  disabled,
}: {
  className?: string
  selected?: boolean
  disabled?: boolean
}) =>
  clsx(
    'min-w-max',
    {
      'text-primary-700': selected,
      'text-neutral-800': !selected && !disabled,
      'text-neutral-600': disabled,
    },
    className,
  )

const sidebarItemTitleWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('flex gap-2 items-center', className)

const sidebarItemTitleClsx = ({
  className = '',
  disabled,
}: {
  className?: string
  disabled?: boolean
}) =>
  clsx(
    'text-left text-sm font-medium tracking-tight line-clamp-1',
    {
      'text-neutral-600': disabled,
      'text-neutral-800 ': !disabled,
    },
    className,
  )

const sidebarItemTitleBadgeClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('shrink-0', className)

const sidebarItemAccordionClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('shadow-none !p-0', className)

const sidebarItemAccordionTriggerClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('!hover:bg-inherit', className)

const sidebarItemAccordionWrapperClsx = ({
  className = '',
  expanded,
  customClassName,
  selected,
}: {
  className?: string
  expanded?: boolean
  customClassName?: string
  selected?: boolean
}) =>
  clsx(
    {
      'rounded hover:bg-neutral-150': Boolean(expanded),
      '!p-0': !expanded,
      'p-2.5': expanded,
      'bg-neutral-150': selected,
    },
    className,
    customClassName,
  )

const sidebarItemAccordionTriggerTitleClsx = ({
  className = '',
  expanded,
}: {
  className?: string
  expanded?: boolean
}) =>
  clsx(
    'flex-1 flex gap-2 items-center rounded',
    {
      'hover:bg-neutral-150 p-2.5': !expanded,
    },
    className,
  )

const sidebarItemAccordionContentWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('pb-0', className)

const sidebarItemAccordionContentClsx = ({
  className = '',
  customClassName,
}: {
  className?: string
  customClassName?: string
}) => clsx('pl-8', className, customClassName)

const classNamePropClsx = ({
  className = '',
  customClassName,
  disabled,
  selected,
}: {
  className?: string
  customClassName?: string
  disabled?: boolean
  selected?: boolean
}) =>
  clsx(
    'flex gap-2 items-center p-2.5 rounded w-full cursor-pointer hover:bg-neutral-150',
    {
      'pointer-events-none': disabled,
      'bg-neutral-150': selected,
    },
    className,
    customClassName,
  )

const sidebarItemListWrapperClsx = ({
  className = '',
  index,
}: {
  className?: string
  index: number
}) =>
  clsx(
    'px-4 py-2 border-neutral-200 flex flex-col gap-y-0.5',
    {
      'border-t': index > 0,
    },
    className,
  )

const sidebarItemListItemClsx = ({
  className = '',
}: { className?: string } = {}) => clsx('h-10', className)

const sidebarItemListTooltipClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('z-10', className)

const sidebar = {
  sidebarCva,
  sidebarContentClsx,
  sidebarItemsWrapperClsx,
  sidebarFooterItemsWrapperClsx,
  sidebarFooterVersionWrapperClsx,
  sidebarFooterVersionTextClsx,
  sidebarToggleButtonClsx,
  sidebarToggleArrowClsx,

  sidebarItemIconClsx,
  sidebarItemTitleWrapperClsx,
  sidebarItemTitleClsx,
  sidebarItemTitleBadgeClsx,
  sidebarItemAccordionClsx,
  sidebarItemAccordionTriggerClsx,
  sidebarItemAccordionWrapperClsx,
  sidebarItemAccordionTriggerTitleClsx,
  sidebarItemAccordionContentWrapperClsx,
  sidebarItemAccordionContentClsx,
  classNamePropClsx,

  sidebarItemListWrapperClsx,
  sidebarItemListItemClsx,
  sidebarItemListTooltipClsx,
}

export { sidebar }
