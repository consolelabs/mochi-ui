import { cva, VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const logoCva = cva(['flex-shrink-0 rounded-full overflow-hidden'], {
  variants: {
    size: {
      xs: 'w-8 h-8',
      base: 'w-[75px] h-[75px]',
      xl: 'w-[144px] h-[144px]',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

const logoWithTextWrapperCva = cva(['flex items-center gap-6'], {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

const logoTextClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('flex-shrink-0', className)

const logoSVGTextClsx = ({ className = '' }: { className?: string } = {}) =>
  clsx('text-text-primary', className)

export const logo = {
  logoCva,
  logoWithTextWrapperCva,
  logoTextClsx,
  logoSVGTextClsx,
}

export type LogoStylesProps = VariantProps<typeof logoCva>
