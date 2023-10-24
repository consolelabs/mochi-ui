import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variant = cva(
  [
    'text-sm px-3 py-2 rounded-lg caret-mochi transition duration-200 w-full text-left bg-white-pure leading-relaxed',
    'border hover:border-mochi focus:border-mochi !outline-none',
  ],
  {
    variants: {
      appearance: {
        default: ['border-black/10'],
        invalid: ['border-mochi-900'],
      },
    },
    defaultVariants: {
      appearance: 'default',
    },
  },
)

type Props = VariantProps<typeof variant> & { className?: string }

export const select = ({ className = '', ...rest }: Props = {}) =>
  variant({ className, ...rest })
