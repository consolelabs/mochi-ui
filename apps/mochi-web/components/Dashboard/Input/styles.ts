import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variant = cva(
  [
    'text-sm px-3 py-2 rounded-lg caret-mochi transition-all duration-200 w-full leading-relaxed',
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

export const input = ({ className = '', ...rest }: Props = {}) =>
  variant({ className, ...rest })

const affixVariant = cva(
  [
    'text-sm absolute h-[calc(100%-2px)] px-3 py-2 text-dashboard-gray-2 top-[1px] leading-relaxed',
  ],
  {
    variants: {
      type: {
        prefix: ['left-0 rounded-l-lg'],
        suffix: ['right-0 rounded-r-lg'],
      },
      appearance: {
        default: ['bg-black/5'],
        bgless: ['bg'],
      },
    },
    defaultVariants: {
      appearance: 'default',
    },
  },
)

type AffixProps = VariantProps<typeof affixVariant> & { className?: string }

export const affix = ({ className = '', ...rest }: AffixProps = {}) =>
  affixVariant({ className, ...rest })
