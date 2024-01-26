import { cva, VariantProps } from 'class-variance-authority'

const typographyVariants = cva(['overflow-hidden'], {
  variants: {
    level: {
      h1: 'text-7xl font-semibold tracking-[-0.5px]',
      h2: 'text-5xl font-semibold tracking-[-0.5px]',
      h3: 'text-4.5xl font-semibold tracking-[-0.5px]',
      h4: 'text-3.5xl font-semibold tracking-[-0.5px]',
      h5: 'text-2xl font-semibold tracking-[-0.5px]',

      h6: 'text-lg font-semibold tracking-[-0.2px]',
      h7: 'text-base font-semibold tracking-[-0.2px]',
      h8: 'text-sm font-semibold tracking-[-0.2px]',
      h9: 'text-sm font-semibold tracking-[-0.2px]',
      p1: 'text-3.5xl tracking-[-0.2px]',
      p2: 'text-xl tracking-[-0.2px]',
      p3: 'text-lg tracking-[-0.2px]',
      p4: 'text-base tracking-[-0.2px]',
      p5: 'text-sm tracking-[-0.2px]',
      p6: 'text-xs tracking-[-0.2px]',
      p7: 'text-xxxs tracking-normal tracking-[-0.2px]',
      inherit: 'text-inherit',
    },
    color: {
      primary: 'text-primary-plain-fg',
      secondary: 'text-secondary-plain-fg',
      success: 'text-success-plain-fg',
      warning: 'text-warning-plain-fg',
      danger: 'text-danger-plain-fg',
      neutral: 'text-neutral-plain-fg',
      textPrimary: 'text-text-primary',
      textSecondary: 'text-text-secondary',
      textTertiary: 'text-text-tertiary',
      textDisabled: 'text-text-disabled',
      textContrast: 'text-text-contrast',
    },
    noWrap: {
      true: 'text-ellipsis whitespace-nowrap',
    },
    fontWeight: {
      sm: '!font-normal',
      md: '!font-medium',
      lg: '!font-semibold',
      xl: '!font-bold',
      unset: '',
    },
  },
  compoundVariants: [
    {
      level: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'p1'],
      fontWeight: ['unset'],
      className: 'font-medium',
    },
    {
      level: ['h9'],
      fontWeight: ['unset'],
      className: 'font-semibold',
    },
    {
      level: ['p7'],
      fontWeight: ['unset'],
      className: 'font-bold',
    },
  ],
  defaultVariants: {
    level: 'p4',
    color: 'textPrimary',
    noWrap: false,
    fontWeight: 'unset',
  },
})

const typography = {
  typographyVariants,
}

export type TypographyStyleProps = VariantProps<typeof typographyVariants>

export { typography }
