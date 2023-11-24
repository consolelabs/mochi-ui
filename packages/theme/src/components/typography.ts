import { cva, VariantProps } from 'class-variance-authority'

const typographyVariants = cva(['overflow-hidden'], {
  variants: {
    level: {
      h1: 'text-7xl font-bold',
      h2: 'text-5xl font-bold',
      h3: 'text-4.5xl font-semibold',
      h4: 'text-3.5xl font-semibold',
      h5: 'text-2xl font-semibold',
      h6: 'text-lg font-semibold',
      h7: 'text-base font-semibold',
      h8: 'text-sm font-semibold',
      h9: 'text-sm font-semibold',
      p1: 'text-3.5xl',
      p2: 'text-xl',
      p3: 'text-lg',
      p4: 'text-base',
      p5: 'text-sm',
      p6: 'text-xs',
      p7: 'text-xss',
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
    },
    noWrap: {
      true: 'text-ellipsis whitespace-nowrap',
    },
  },

  defaultVariants: {
    level: 'p4',
    color: 'textPrimary',
    noWrap: false,
  },
})

const typography = {
  typographyVariants,
}

export type TypographyStyleProps = VariantProps<typeof typographyVariants>

export { typography }
