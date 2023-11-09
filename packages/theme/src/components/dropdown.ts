import clsx from 'clsx'
import { cva } from 'class-variance-authority'

const dropdownIconStyleCva = cva(['shrink-0 flex text-inherit'], {
  variants: {
    isLeftIconAvatar: {
      true: 'w-9 h-9',
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
})

const dropdownChildItemClsx = ({ className = '' }: { className?: string }) =>
  clsx('flex-1 py-0.5 flex flex-col text-neutral-800', className)

const dropdownChildItemSubtitleClsx = ({
  className = '',
}: {
  className?: string
}) => clsx('text-neutral-600 text-xs', className)

export const dropdownItemStyleCva = cva(
  [
    'p-2 text-sm font-medium',
    'flex items-center justify-between gap-3',
    'cursor-default',
    'rounded-md',
  ],
  {
    variants: {
      hasPaddingLeft: {
        true: 'pl-11',
      },
      disabled: {
        true: ['text-neutral-600'],
        false: ['hover:bg-neutral-150 transition duration-100'],
      },
    },
    defaultVariants: {
      hasPaddingLeft: false,
      disabled: false,
    },
  },
)

const dropdownMenuSubTriggerClsx = ({
  className = '',
}: {
  className?: string
}) => clsx('-rotate-90 text-neutral-500', className)

export const dropdownContentStyleCva = cva(
  [
    'border border-neutral-200 z-50',
    'p-2',
    'bg-white',
    'space-y-1',
    'min-w-[240px]',
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
}) => clsx('text-primary-700', className)

const dropdownMenuSeparatorClsx = ({
  className = '',
}: {
  className?: string
}) => clsx('h-px !my-2 bg-neutral-200 -mx-2', className)

export const dropdown = {
  dropdownIconStyleCva,
  dropdownChildItemClsx,
  dropdownChildItemSubtitleClsx,
  dropdownItemStyleCva,
  dropdownMenuSubTriggerClsx,
  dropdownContentStyleCva,
  dropdownMenuRadioIconClsx,
  dropdownMenuSeparatorClsx,
}
