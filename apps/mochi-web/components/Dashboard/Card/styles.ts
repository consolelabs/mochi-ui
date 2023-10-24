import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variant = cva(['bg-white border border-black/10'], {
  variants: {
    padding: {
      none: ['p-0'],
      sm: ['p-3'],
      md: ['p-5'],
      lg: ['p-8'],
    },
    rounded: {
      none: ['rounded-none'],
      sm: ['rounded'],
      md: ['rounded-md'],
      lg: ['rounded-lg'],
    },
  },
  defaultVariants: {
    padding: 'sm',
    rounded: 'lg',
  },
})

type Props = VariantProps<typeof variant> & { className?: string }

export const card = ({ className = '', ...rest }: Props = {}) =>
  variant({ className, ...rest })
