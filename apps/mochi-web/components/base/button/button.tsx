import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const button = cva(
  [
    'flex gap-x-1 items-center justify-center flex-shrink-0 font-semibold transition-all duration-100 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      appearance: {
        primary: [
          'bg-white-pure',
          'text-foreground',
          'border-[1.5px] border-black/15%',
          'shadow-md',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        secondary: [
          'bg-foreground',
          'text-white',
          'shadow-md',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        tertiary: [
          'bg-dashboard-gray-6',
          'text-foreground',
          'border-[1.5px] border-black/15%',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        gray: ['bg-[#D1D2D4]', 'text-black', 'shadow-md', 'rounded-lg'],
        mochi: [
          'bg-mochi',
          'text-white',
          'border-[1.5px] border-mochi',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        text: [
          'bg-transparent',
          'text-foreground',
          'border',
          'border-gray-300',
          'rounded-lg',
        ],
        pill: ['bg-black', 'text-white', 'rounded-full'],
      },
      size: {
        xs: ['text-xs', 'px-3', 'py-1'],
        sm: ['text-sm', 'px-5', 'py-1.5'],
        base: ['text-base', 'px-6', 'py-2'],
      },
    },
    defaultVariants: {
      appearance: 'primary',
      size: 'base',
    },
  },
)

type Props = VariantProps<typeof button> & {
  className?: string
} & Omit<React.HTMLProps<HTMLButtonElement>, 'size'>

export default function Button({
  size,
  className,
  appearance,
  children,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      className={button({ appearance, className, size })}
      type={type as any}
      {...rest}
    >
      {children}
    </button>
  )
}
