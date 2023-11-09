import { cva, VariantProps } from 'class-variance-authority'

const badgeWrapperCva = cva(
  [
    'rounded-2xl py-0.5 text-xs font-medium',
    'flex items-center justify-center leading-[18px]',
    'px-2 gap-1',
  ],
  {
    variants: {
      appearance: {
        primary: ['bg-primary-100', 'text-primary-700'],
        secondary: ['bg-secondary-100', 'text-secondary-700'],
        success: ['bg-green-100', 'text-green-700'],
        danger: ['bg-red-100', 'text-red-700'],
        warning: ['bg-yellow-100', 'text-yellow-700'],
        black: ['bg-neutral-150', 'text-neutral-800'],
        white: ['bg-white', 'border', 'text-neutral-800', 'border-neutral-200'],
      },
      iconPosition: {
        left: 'pl-[6px]',
        right: 'pr-[6px]',
      },
      isAvatarIcon: {
        true: '',
      },
      hasIcon: {
        false: '!px-2',
      },
      hasLabel: {
        false: '!p-1',
      },
    },
    compoundVariants: [
      {
        iconPosition: 'left',
        isAvatarIcon: true,
        hasLabel: true,
        className: '!pl-[3px] gap-[6px]',
      },
      {
        iconPosition: 'right',
        isAvatarIcon: true,
        hasLabel: true,
        className: '!pr-[3px] gap-[6px]',
      },
    ],
    defaultVariants: {
      appearance: 'primary',
      iconPosition: 'left',
      isAvatarIcon: false,
      hasIcon: false,
      hasLabel: true,
    },
  },
)

const badgeIconCva = cva(['flex'], {
  variants: {
    appearance: {
      primary: 'text-primary-500',
      secondary: 'text-secondary-500',
      success: 'text-green-500',
      danger: 'text-red-500',
      warning: 'text-yellow-500',
      black: 'text-neutral-500',
      white: 'text-neutral-500',
    },
    hasIconOnly: { true: '' },
    isAvatarIcon: { true: 'w-4 h-4' },
  },
  compoundVariants: [
    {
      appearance: 'primary',
      hasIconOnly: true,
      className: 'text-primary-700',
    },
    {
      appearance: 'secondary',
      hasIconOnly: true,
      className: 'text-secondary-700',
    },
  ],
  defaultVariants: {
    appearance: 'primary',
    hasIconOnly: false,
    isAvatarIcon: false,
  },
})

export const badge = {
  badgeWrapperCva,
  badgeIconCva,
}

export type BadgeStyleProps = VariantProps<typeof badgeWrapperCva>
