import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { commonCvaProps as buttonCvaProps } from './button'

const iconButtonCva = cva(
  [
    'flex',
    'items-center',
    'gap-x-2',
    'rounded-full',
    'font-semibold',
    'h-fit',
    'enabled:transition',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'outline-none',
  ],
  {
    variants: {
      variant: buttonCvaProps.variants.variant,
      color: {
        ...buttonCvaProps.variants.color,
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    compoundVariants: [
      {
        variant: ['solid', 'outline', 'ghost', 'soft'],
        size: 'sm',
        className: 'p-2',
      },
      {
        variant: ['solid', 'outline', 'ghost', 'soft'],
        size: 'md',
        className: 'p-2.5',
      },
      {
        variant: ['solid', 'outline', 'ghost', 'soft'],
        size: 'lg',
        className: 'p-3',
      },
      ...buttonCvaProps.compounds,
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
    },
  },
)

export type IconButtonStylesProps = VariantProps<typeof iconButtonCva>

const iconButton = { iconButtonCva }

export { iconButton }
