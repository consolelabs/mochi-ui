import { VariantProps, cva } from 'class-variance-authority'

const wrapperCva = cva(['border bg-background-body'], {
  variants: {
    size: {
      md: 'w-4 h-4 rounded',
      lg: 'w-5 h-5 rounded-[6px]',
    },
    disabled: {
      true: [
        'cursor-not-allowed',
        'text-neutral-outline-hover',
        'bg-neutral-outline',
        'border-neutral-outline-hover',
      ],
      false: [
        'hover:border-primary-solid',
        'focus:ring-4 focus:ring-primary-solid/10',
        'focus-visible:outline-none',
        'focus-visible:ring-4',
        'transition-shadow duration-100 ease-in',
        'data-[state=checked]:bg-primary-solid',
        'data-[state=checked]:text-primary-solid-fg',
        'data-[state=checked]:border-primary-solid',
        'data-[state=indeterminate]:bg-primary-solid',
        'data-[state=indeterminate]:text-primary-solid-fg',
        'data-[state=indeterminate]:border-primary-solid',
      ],
    },
  },
  defaultVariants: {
    disabled: false,
    size: 'md',
  },
})

const indicator = [
  'flex w-full h-full',
  'items-center',
  'justify-center',
  '[&[data-state=indeterminate]>#minus]:block',
  '[&>#minus]:hidden',
  '[&[data-state=checked]>#check]:block',
  '[&>#check]:hidden',
  'text-inherit',
  'text-xs',
].join(' ')

type CheckBoxStyleProps = VariantProps<typeof wrapperCva>

const checkbox = {
  wrapperCva,
  indicator,
}

export { checkbox, type CheckBoxStyleProps }
