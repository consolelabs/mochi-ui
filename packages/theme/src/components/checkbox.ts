import { VariantProps, cva } from 'class-variance-authority'

const wrapperCva = cva(['border bg-white'], {
  variants: {
    size: {
      md: 'w-4 h-4 rounded',
      lg: 'w-5 h-5 rounded-[6px]',
    },
    disabled: {
      true: [
        'cursor-not-allowed',
        'text-neutral-200',
        'bg-neutral-100',
        'border-neutral-200',
      ],
      false: [
        'hover:border-primary-700',
        'focus:ring-4 focus:ring-primary-700/10',
        'focus-visible:outline-none',
        'focus-visible:ring-4',
        'transition-shadow duration-100 ease-in',
        'data-[state=checked]:bg-primary-700',
        'data-[state=checked]:text-white',
        'data-[state=checked]:border-primary-700',
        'data-[state=indeterminate]:bg-primary-700',
        'data-[state=indeterminate]:text-white',
        'data-[state=indeterminate]:border-primary-700',
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
