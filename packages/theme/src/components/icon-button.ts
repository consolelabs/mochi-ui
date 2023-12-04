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
    'transition',
    'disabled:cursor-not-allowed',
    'outline-none',
  ],
  {
    variants: {
      variant: buttonCvaProps.variants.variant,
      color: {
        ...buttonCvaProps.variants.color,
        info: '',
      },
      size: {
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    compoundVariants: [
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'sm',
        className: 'p-2',
      },
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'md',
        className: 'p-2.5',
      },
      {
        variant: ['solid', 'outline', 'ghost'],
        size: 'lg',
        className: 'p-3',
      },
      ...buttonCvaProps.compounds,
      {
        // NOTE: This variant is not semantic, will be remove later.
        variant: 'ghost',
        color: ['primary', 'secondary'],
        className:
          'bg-white text-primary-700 hover:bg-primary-100 hover:shadow-button disabled:text-neutral-400 disabled:bg-white disabled:shadow-none',
      },
      {
        variant: 'ghost',
        color: 'danger',
        className:
          'bg-white text-red-700 hover:bg-red-100 hover:shadow-button disabled:text-red-400 disabled:bg-white disabled:shadow-none',
      },
      {
        variant: 'ghost',
        color: 'info',
        className:
          'bg-white text-neutral-800 hover:bg-neutral-100 hover:shadow-button disabled:text-neutral-400 disabled:bg-white disabled:shadow-none',
      },
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
