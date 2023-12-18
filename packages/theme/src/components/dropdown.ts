import clsx from 'clsx'
import { cva } from 'class-variance-authority'

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
    'flex-1 py-0.5 flex flex-col text-text-primary group-data-[disabled]:text-neutral-plain-disable-fg',
    className,
  )

const dropdownChildItemSubtitleClsx = ({
  className = '',
}: {
  className?: string
} = {}) =>
  clsx(
    'text-text-secondary group-data-[disabled]:text-neutral-plain-disable-fg',
    className,
  )

export const dropdownItemStyleCva = cva(
  [
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

export const dropdownContentStyleCva = cva(
  [
    'border border-neutral-outline-border z-50',
    'p-2',
    'bg-background-popup',
    'space-y-1',
    'min-w-[240px]',
  ],
  {
    variants: {
      isRounded: {
        true: 'rounded-lg',
      },
      hasShadow: {
        true: 'shadow-md [&:focus:not(.focus-visible)]:!shadow-md',
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
}
