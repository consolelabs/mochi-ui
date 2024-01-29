import { cva } from 'class-variance-authority'

const valueChangeCva = cva(['flex items-center font-medium text-sm gap-1'], {
  variants: {
    trend: {
      up: 'text-success-plain-fg',
      down: 'text-danger-plain-fg',
    },
  },
  defaultVariants: {
    trend: 'up',
  },
})

const valueChangeIndicatorCva = cva(['h-4 w-4 stroke-[3]'], {
  variants: {
    trend: {
      up: 'text-success-solid',
      down: 'text-danger-solid',
    },
  },
  defaultVariants: {
    trend: 'up',
  },
})

export const valueChange = {
  valueChangeCva,
  valueChangeIndicatorCva,
}
