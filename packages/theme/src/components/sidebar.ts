import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const sidebarCva = cva(
  [
    'group bg-background-surface relative h-full border-r border-neutral-outline-active transition-all',
  ],
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
} = {}) => clsx('border-t border-neutral-outline-active', className)

const sidebarFooterVersionWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('flex px-4 border-t border-neutral-outline-active', className)

const sidebarFooterVersionTextClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('text-xs text-text-secondary tracking-tight p-2', className)

const sidebarToggleButtonWrapperClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'absolute top-0 hidden w-10 h-full -right-10 group-hover:block',
    className,
  )

const sidebarToggleButtonClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'items-center justify-center w-5 mt-4 bg-background-surface border rounded-r-lg border-neutral-outline-active h-11',
    className,
  )

const sidebarToggleArrowClsx = ({
  className = '',
  expanded,
}: {
  className?: string
  expanded?: boolean
}) => clsx('text-text-primary', { 'rotate-180': expanded }, className)

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
    'shrink-0',
    {
      'text-primary-plain-fg': selected,
      'text-text-primary': !selected && !disabled,
      'text-text-secondary': disabled,
    },
    className,
  )

const sidebarItemInfoWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('flex gap-2 items-center flex-1', className)

const sidebarItemTitleWrapperClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('flex flex-col', className)

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
      'text-text-secondary': disabled,
      'text-text-primary ': !disabled,
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
}: {
  className?: string
  expanded?: boolean
  customClassName?: string
}) =>
  clsx(
    {
      'rounded hover:bg-neutral-outline-hover': Boolean(expanded),
      '!p-0': !expanded,
      'p-2.5': expanded,
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
    'flex-1 flex gap-3.5 items-center rounded',
    {
      'hover:bg-neutral-outline-hover p-2.5': !expanded,
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
}: {
  className?: string
  customClassName?: string
  disabled?: boolean
}) =>
  clsx(
    'flex gap-3.5 justify-between items-center p-2.5 rounded w-full cursor-pointer hover:bg-neutral-outline-hover',
    {
      'pointer-events-none': disabled,
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
    'px-4 py-2 border-neutral-outline-active flex flex-col gap-y-0.5',
    {
      'border-t': index > 0,
    },
    className,
  )

const sidebarItemListItemClsx = ({
  className = '',
  hasDescription = false,
}: { className?: string; hasDescription?: boolean } = {}) =>
  clsx(
    'h-10',
    {
      'h-[52px]': hasDescription,
    },
    className,
  )

const sidebarItemListTooltipClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('z-20', className)

const sidebar = {
  sidebarCva,
  sidebarContentClsx,
  sidebarItemsWrapperClsx,
  sidebarFooterItemsWrapperClsx,
  sidebarFooterVersionWrapperClsx,
  sidebarFooterVersionTextClsx,
  sidebarToggleButtonWrapperClsx,
  sidebarToggleButtonClsx,
  sidebarToggleArrowClsx,

  sidebarItemIconClsx,
  sidebarItemInfoWrapperClsx,
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
