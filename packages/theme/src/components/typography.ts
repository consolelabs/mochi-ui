import { cva, VariantProps } from 'class-variance-authority'

const typographyVariants = cva(['overflow-hidden'], {
  variants: {
    level: {
      h1: 'text-7xl font-bold',
      h2: 'text-5xl font-bold',
      h3: 'text-[40px] font-semibold',
      h4: 'text-[32px] font-semibold',
      h5: 'text-2xl font-semibold',
      h6: 'text-lg font-semibold',
      'title-lg': 'text-lg font-semibold',
      'title-md': 'text-base font-medium',
      'title-sm': 'text-sm font-medium',
      'body-lg': 'text-lg',
      'body-md': 'text-base',
      'body-sm': 'text-sm',
      'body-xs': 'text-xs',
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
    level: 'body-md',
    color: 'textPrimary',
    noWrap: false,
  },
})

const typography = {
  typographyVariants,
}

export type TypographyStyleProps = VariantProps<typeof typographyVariants>

export { typography }
