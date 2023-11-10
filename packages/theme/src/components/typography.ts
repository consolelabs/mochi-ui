import { cva, VariantProps } from 'class-variance-authority'

const typographyVariants = cva(['overflow-hidden'], {
  variants: {
    level: {
      h1: 'text-4xl font-bold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
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
      primary: 'text-primary-700 border-primary-700',
      success: 'text-green-700 border-green-700',
      warning: 'text-yellow-700 border-yellow-700',
      danger: 'text-red-700 border-red-700',
      neutral: 'text-neutral-800 border-neutral-800',
    },
    variant: {
      plain: '-mx-2 px-2 text-opacity-80',
      outlined: '-mx-2 px-2 border text-opacity-70',
      soft: '-mx-2 px-2 bg-opacity-20',
      solid: '-mx-2 px-2',
    },
    noWrap: {
      true: 'text-ellipsis whitespace-nowrap',
    },
  },
  compoundVariants: [
    {
      color: null,
      className: 'border-0',
    },
    {
      color: ['primary', 'success', 'warning', 'danger', 'neutral'],
      variant: 'solid',
      className: '!text-white',
    },
    {
      color: 'primary',
      variant: ['soft', 'solid'],
      className: 'bg-primary-600',
    },
    {
      color: 'success',
      variant: ['soft', 'solid'],
      className: 'bg-green-600',
    },
    {
      color: 'warning',
      variant: ['soft', 'solid'],
      className: 'bg-yellow-600',
    },
    {
      color: 'danger',
      variant: ['soft', 'solid'],
      className: 'bg-red-600',
    },
    {
      color: 'neutral',
      variant: ['soft', 'solid'],
      className: 'bg-neutral-600',
    },
  ],
  defaultVariants: {
    level: 'body-md',
    variant: null,
    color: null,
    noWrap: false,
  },
})

const typography = {
  typographyVariants,
}

export type TypographyProps = VariantProps<typeof typographyVariants>

export { typography }
