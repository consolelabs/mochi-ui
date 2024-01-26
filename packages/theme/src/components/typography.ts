import { cva, VariantProps } from 'class-variance-authority'

const typographyVariants = cva(['overflow-hidden'], {
  variants: {
    level: {
      h1: 'text-7xl',
      h2: 'text-5xl',
      h3: 'text-4.5xl',
      h4: 'text-3.5xl',
      h5: 'text-2xl',
      h6: 'text-lg',
      h7: 'text-base',
      h8: 'text-sm',
      h9: 'text-sm',
      p1: 'text-3.5xl',
      p2: 'text-xl',
      p3: 'text-lg',
      p4: 'text-base',
      p5: 'text-sm',
      p6: 'text-xs',
      p7: 'text-xxxs tracking-normal',
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
      sm: 'font-normal',
      md: 'font-medium',
      lg: 'font-semibold',
      xl: 'font-bold',
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
