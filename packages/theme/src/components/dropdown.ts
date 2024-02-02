import clsx from 'clsx'
import { cva } from 'class-variance-authority'

const contentAnimations = [
  'data-[state=open]:animate-in',
  'data-[state=open]:fade-in-0',
  'data-[state=open]:zoom-in-90',
  'data-[state=open]:duration-300',

  'data-[state=open]:data-[side=bottom]:slide-in-from-top-10',
  'data-[state=open]:data-[side=left]:slide-in-from-right-10',
  'data-[state=open]:data-[side=right]:slide-in-from-left-10',
  'data-[state=open]:data-[side=top]:slide-in-from-bottom-10',

  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=closed]:zoom-out-90',
  'data-[state=closed]:duration-300',

  'data-[state=closed]:data-[side=bottom]:slide-out-to-top-10',
  'data-[state=closed]:data-[side=left]:slide-out-to-right-10',
  'data-[state=closed]:data-[side=right]:slide-out-to-left-10',
  'data-[state=closed]:data-[side=top]:slide-out-to-bottom-10',
]

const dropdownIconStyleCva = cva(
  ['shrink-0 flex text-text-primary group-data-[disabled]:text-text-tertiary'],
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
    'flex-1 py-0.5 flex flex-col text-text-primary group-data-[disabled]:text-text-tertiary',
    className,
  )

const dropdownChildItemSubtitleClsx = ({
  className = '',
}: {
  className?: string
} = {}) => clsx('text-text-tertiary', className)

export const dropdownItemStyleCva = cva(
  [
    'cursor-pointer',
    'group p-2 text-sm font-medium',
    'flex items-center justify-between gap-3',
    'cursor-default',
    'rounded-md',
    'focus-visible:outline-none data-[highlighted]:bg-background-hover',
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
} = {}) => clsx('-rotate-90 text-text-tertiary', className)

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
