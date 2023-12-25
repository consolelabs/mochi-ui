import { cva, VariantProps } from 'class-variance-authority'

const badgeWrapperCva = cva(
  [
    'rounded-2xl py-0.5 text-xs font-medium whitespace-nowrap',
    'flex items-center justify-center leading-[18px]',
    'px-2 gap-1',
  ],
  {
    variants: {
      appearance: {
        primary: ['bg-primary-outline', 'text-primary-solid'],
        secondary: ['bg-secondary-outline', 'text-secondary-solid'],
        success: ['bg-success-outline', 'text-success-solid'],
        danger: ['bg-danger-outline', 'text-danger-solid'],
        warning: ['bg-warning-outline', 'text-warning-solid'],
        black: ['bg-neutral-outline', 'text-neutral-solid-hover'],
        white: [
          'bg-neutral-solid-fg',
          'border',
          'text-neutral-solid-active',
          'border-neutral-outline-hover',
        ],
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
      primary: 'text-primary-solid-focus',
      secondary: 'text-secondary-solid-focus',
      success: 'text-success-solid-focus',
      danger: 'text-danger-solid-focus',
      warning: 'text-warning-solid-focus',
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
      className: 'text-primary-solid',
    },
    {
      appearance: 'secondary',
      hasIconOnly: true,
      className: 'text-secondary-solid',
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
