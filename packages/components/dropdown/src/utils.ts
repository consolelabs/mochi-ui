import { cva } from 'class-variance-authority'

export const getDropdownContentStyle = cva(
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

export const getDropdownItemStyle = cva(
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

export const getIconStyle = cva(['shrink-0 flex text-inherit'], {
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
