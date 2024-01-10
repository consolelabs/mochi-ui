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
        primary: ['bg-primary-soft', 'text-primary-soft-fg'],
        secondary: ['bg-secondary-soft', 'text-secondary-soft-fg'],
        success: ['bg-success-soft', 'text-success-soft-fg'],
        danger: ['bg-danger-soft', 'text-danger-soft-fg'],
        warning: ['bg-warning-soft', 'text-warning-soft-fg'],
        neutral: ['bg-neutral-soft', 'text-neutral-solid-hover'],
        // Migrate to neutral variant
        black: ['bg-neutral-soft', 'text-neutral-solid-hover'],
        // Migrate to neutral variant
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
      primary: 'text-primary-soft-fg',
      secondary: 'text-secondary-soft-fg',
      success: 'text-success-soft-fg',
      danger: 'text-danger-soft-fg',
      warning: 'text-warning-soft-fg',
      neutral: 'text-neutral-soft-fg',
      // Migrate to neutral variant
      black: 'text-neutral-500',
      // Migrate to neutral variant
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
