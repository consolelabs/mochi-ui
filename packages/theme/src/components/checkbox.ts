import { VariantProps, cva } from 'class-variance-authority'

const wrapperCva = cva(['border bg-background-body'], {
  variants: {
    size: {
      md: 'w-4 h-4 rounded',
      lg: 'w-5 h-5 rounded-[6px]',
    },
    appearance: {
      primary: '',
      secondary: '',
      neutral: '',
      danger: '',
      warning: '',
    },
    disabled: {
      true: [
        'cursor-not-allowed',
        'text-neutral-outline-hover',
        'bg-neutral-outline',
        'border-neutral-outline-hover',
      ],
      false: [
        'focus-visible:outline-none',
        'focus-visible:ring-4',
        'transition-shadow duration-100 ease-in',
        'focus:ring-4 ',
      ],
    },
  },
  compoundVariants: [
    {
      disabled: false,
      appearance: 'primary',
      className: [
        'hover:border-primary-solid',
        'focus:ring-primary-solid/10',
        'data-[state=checked]:bg-primary-solid',
        'data-[state=checked]:text-primary-solid-fg',
        'data-[state=checked]:border-primary-solid',
        'data-[state=indeterminate]:bg-primary-solid',
        'data-[state=indeterminate]:text-primary-solid-fg',
        'data-[state=indeterminate]:border-primary-solid',
      ],
    },
    {
      disabled: false,
      appearance: 'secondary',
      className: [
        'hover:border-secondary-solid',
        'focus:ring-secondary-solid/10',
        'data-[state=checked]:bg-secondary-solid',
        'data-[state=checked]:text-secondary-solid-fg',
        'data-[state=checked]:border-secondary-solid',
        'data-[state=indeterminate]:bg-secondary-solid',
        'data-[state=indeterminate]:text-secondary-solid-fg',
        'data-[state=indeterminate]:border-secondary-solid',
      ],
    },
    {
      disabled: false,
      appearance: 'danger',
      className: [
        'hover:border-danger-solid',
        'focus:ring-danger-solid/10',
        'data-[state=checked]:bg-danger-solid',
        'data-[state=checked]:text-danger-solid-fg',
        'data-[state=checked]:border-danger-solid',
        'data-[state=indeterminate]:bg-danger-solid',
        'data-[state=indeterminate]:text-danger-solid-fg',
        'data-[state=indeterminate]:border-danger-solid',
      ],
    },
    {
      disabled: false,
      appearance: 'warning',
      className: [
        'hover:border-warning-solid',
        'focus:ring-warning-solid/10',
        'data-[state=checked]:bg-warning-solid',
        'data-[state=checked]:text-warning-solid-fg',
        'data-[state=checked]:border-warning-solid',
        'data-[state=indeterminate]:bg-warning-solid',
        'data-[state=indeterminate]:text-warning-solid-fg',
        'data-[state=indeterminate]:border-warning-solid',
      ],
    },
    {
      disabled: false,
      appearance: 'neutral',
      className: [
        'hover:border-neutral-solid',
        'focus:ring-neutral-solid/10',
        'data-[state=checked]:bg-neutral-solid',
        'data-[state=checked]:text-neutral-solid-fg',
        'data-[state=checked]:border-neutral-solid',
        'data-[state=indeterminate]:bg-neutral-solid',
        'data-[state=indeterminate]:text-neutral-solid-fg',
        'data-[state=indeterminate]:border-neutral-solid',
      ],
    },
  ],
  defaultVariants: {
    appearance: 'primary',
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
