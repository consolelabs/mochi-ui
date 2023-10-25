import { cva } from 'class-variance-authority'

export const getDropdownContentStyle = cva(
  [
    'ui-border ui-border-neutral-200 ui-z-50',
    'ui-p-2',
    'ui-bg-white',
    'ui-space-y-1',
    'ui-min-w-[240px]',
  ],
  {
    variants: {
      isRounded: {
        true: 'ui-rounded-lg',
      },
      hasShadow: {
        true: 'ui-shadow-md',
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
    'ui-p-2 ui-text-sm ui-font-medium',
    'ui-flex ui-items-center ui-justify-between ui-gap-3',
    'ui-cursor-default',
    'ui-rounded-md',
  ],
  {
    variants: {
      hasPaddingLeft: {
        true: 'ui-pl-11',
      },
      disabled: {
        true: ['ui-text-neutral-600'],
        false: ['hover:ui-bg-neutral-150 ui-transition ui-duration-100'],
      },
    },
    defaultVariants: {
      hasPaddingLeft: false,
      disabled: false,
    },
  },
)

export const getIconStyle = cva(['ui-shrink-0 ui-flex ui-text-inherit'], {
  variants: {
    isLeftIconAvatar: {
      true: 'ui-w-9 ui-h-9',
    },
    isRightIcon: {
      true: 'ui-p-0 ui-text-lg',
      false: 'ui-p-0.5 ui-text-xl',
    },
  },
  defaultVariants: {
    isLeftIconAvatar: false,
    isRightIcon: false,
  },
})
