import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variant = cva(['w-full flex flex-col gap-y-2'], {
  variants: {
    appearance: {
      default: ['border-black/10'],
      invalid: ['border-mochi-900'],
    },
  },
  defaultVariants: {
    appearance: 'default',
  },
})

type Props = VariantProps<typeof variant> & { className?: string }

export const tab = ({ className = '', ...rest }: Props = {}) =>
  variant({ className, ...rest })
