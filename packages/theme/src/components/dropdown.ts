import clsx from 'clsx'
import { cva } from 'class-variance-authority'

const contentAnimations = [
  'data-[state=open]:animate-in',
  'data-[state=open]:fade-in-0',
  'data-[state=open]:zoom-in-95',

  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',

  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=closed]:zoom-out-95',
]

const dropdownIconStyleCva = cva(
  ['shrink-0 flex text-text-primary group-data-[disabled]:text-text-secondary'],
  {
    variants: {
      isLeftIconAvatar: {
        true: 'w-9 h-9 group-data-[disabled]:opacity-50',
      },
      isRightIcon: {
        true: 'p-0 text-lg',
        false: 'p-0.5 text-xl',
      },
    },
    defaultVariants: {
      isLeftIconAvatar: false,
      isRightIcon: false,
    },
  },
)

const dropdownTriggerClsx = ({ className = '' }: { className?: string }) =>
  clsx('focus-visible:outline-none', className)

const dropdownChildItemClsx = ({
  className = '',
}: { className?: string } = {}) =>
  clsx(
    'flex-1 py-0.5 flex flex-col text-text-primary group-data-[disabled]:text-text-secondary',
    className,
  )

const dropdownChildItemSubtitleClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('text-text-secondary', className)

export const dropdownItemStyleCva = cva(
  [
    'cursor-pointer',
    'group p-2 text-sm font-medium',
    'flex items-center justify-between gap-3',
    'cursor-default',
    'rounded-md',
    'focus-visible:outline-none data-[highlighted]:bg-neutral-plain-hover',
  ],
  {
    variants: {
      hasPaddingLeft: {
        true: 'pl-11',
      },
    },
    defaultVariants: {
      hasPaddingLeft: false,
    },
  },
)

const dropdownMenuSubTriggerClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('-rotate-90 text-text-secondary', className)

const dropdownContentStyleCva = cva(
  [
    'border border-divider z-50',
    'p-2',
    'bg-background-popup',
    'space-y-1',
    'min-w-[240px]',
    ...contentAnimations,
  ],
  {
    variants: {
      isRounded: {
        true: 'rounded-lg',
      },
      hasShadow: {
        true: 'shadow-md',
      },
    },
    defaultVariants: {
      isRounded: true,
      hasShadow: true,
    },
  },
)

const dropdownMenuRadioIconClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('text-text-icon', className)

const dropdownContentWrapperClsx = ({
  className = '',
}: { className?: string } = {}) => clsx(...contentAnimations, className)

const dropdownMenuSeparatorClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('h-px !my-2 bg-divider -mx-2', className)

export const dropdown = {
  dropdownIconStyleCva,
  dropdownChildItemClsx,
  dropdownChildItemSubtitleClsx,
  dropdownItemStyleCva,
  dropdownMenuSubTriggerClsx,
  dropdownContentStyleCva,
  dropdownMenuRadioIconClsx,
  dropdownMenuSeparatorClsx,
  dropdownTriggerClsx,
  dropdownContentWrapperClsx,
}
